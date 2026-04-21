#!/usr/bin/env python3
# -*- coding: utf-8 -*-
r"""
md2docx_mermaid.py  (v2.5 — Fix crítico: Eliminado escape forzado en render)

Uso:
  # 1 fichero .md
  python md2docx.py input.md salida.docx

  # carpeta con varios .md numerados 01_xxx.md, 02_xxx.md, ...
  python md2docx.py carpeta_md salida.docx
"""
import argparse
import os
import re
import shutil
import subprocess
import sys
import tempfile
import unicodedata
from pathlib import Path

import pypandoc
from docx import Document
from docx.shared import Cm, Pt
from docx.enum.text import WD_ALIGN_PARAGRAPH

# ----------------------------------------------------------------------
# regex básicos
# ----------------------------------------------------------------------
MERMAID_BLOCK_RE = re.compile(r"```mermaid\s*(.*?)\s*```", re.DOTALL)
MD_ORDER_RE = re.compile(r"^(\d+)_.*\.md$", re.IGNORECASE)


def collect_md_files_from_dir(dir_path: Path):
    if not dir_path.is_dir():
        raise ValueError(f"{dir_path} no es una carpeta válida")

    candidates = []
    for p in dir_path.iterdir():
        if not p.is_file():
            continue
        m = MD_ORDER_RE.match(p.name)
        if m:
            num = int(m.group(1))
            candidates.append((num, p.name, p))

    candidates.sort(key=lambda t: (t[0], t[1]))
    return [c[2] for c in candidates]


def build_combined_markdown_from_dir(dir_path: Path) -> str:
    files = collect_md_files_from_dir(dir_path)
    if not files:
        raise RuntimeError(
            f"No se han encontrado ficheros .md válidos en {dir_path} "
            "(se buscan nombres tipo '01_xxx.md', '02_algo.md', ...)."
        )

    parts = []
    for f in files:
        text = f.read_text(encoding="utf-8")
        text = clean_markdown_text(text)
        text = fix_acceptance_criteria_formatting(text)
        parts.append(text.strip() + "\n")

    return "\n\n".join(parts).rstrip() + "\n"


# ----------------------------------------------------------------------
# helpers mmdc
# ----------------------------------------------------------------------
def which_any(cands):
    for c in cands:
        p = shutil.which(c)
        if p:
            return p
    return None


def all_mmdc_candidates():
    """Genera candidatos de comando para mermaid-cli."""
    # 1) mmdc directo
    for base in ["mmdc", "mmdc.cmd", "mmdc.exe"]:
        p = which_any([base])
        if p:
            yield [p]

    # 2) node_modules locales
    local_paths = [
        Path("node_modules") / ".bin" / "mmdc",
        Path("node_modules") / ".bin" / "mmdc.cmd",
        Path("node_modules") / ".bin" / "mmdc.exe",
    ]
    for lp in local_paths:
        if lp.exists() and os.access(lp, os.X_OK):
            yield [str(lp)]

    # 3) npx (diferentes variantes)
    npx_bin = which_any(["npx", "npx.cmd", "npx.exe"])
    if npx_bin:
        yield [npx_bin, "-y", "-p", "@mermaid-js/mermaid-cli", "mmdc"]
        yield [npx_bin, "-y", "@mermaid-js/mermaid-cli", "mmdc"]
        yield [npx_bin, "-y", "@mermaid-js/mermaid-cli"]


def try_run(cmd, args):
    env = os.environ.copy()
    return subprocess.run(
        cmd + args,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        shell=False,
        env=env,
    )


# ---------- Normalizadores base ----------
_SUBGRAPH_LINE = re.compile(
    r"^(?P<indent>\s*)subgraph\s+(?P<body>.+?)\s*$", re.MULTILINE
)


def _strip_accents(s: str) -> str:
    return "".join(
        c for c in unicodedata.normalize("NFKD", s) if not unicodedata.combining(c)
    )


def _sanitize_id(text: str) -> str:
    text = _strip_accents(text)
    text = re.sub(r"\s+", "_", text.strip())
    text = re.sub(r"[^A-Za-z0-9_]", "", text)
    if not text:
        text = "sg"
    if text[0].isdigit():
        text = "sg_" + text
    return text


def fix_mermaid_subgraphs(mmd: str) -> str:
    def repl(match):
        indent = match.group("indent")
        body = match.group("body").strip()
        if re.match(r"^\w+\s*\[.*\]\s*$", body):
            return match.group(0)
        raw = body
        body = re.sub(r'^\s*["\'](.+?)["\']\s*$', r"\1", body)
        sg_id = _sanitize_id(body)
        label = raw.strip()
        return f'{indent}subgraph {sg_id}["{label}"]'

    return _SUBGRAPH_LINE.sub(repl, mmd)


# ---------- Normalización UNICODE y limpieza de caracteres raros ----------
_CONTROL_CHARS = (
    "".join(chr(c) for c in range(0, 32) if c not in (9, 10, 13)) + chr(127)
)
_CONTROL_RE = re.compile(f"[{re.escape(_CONTROL_CHARS)}]")


def normalize_unicode(text: str) -> str:
    text = unicodedata.normalize("NFKC", text)
    text = _CONTROL_RE.sub("", text)
    return text


def clean_markdown_text(text: str) -> str:
    # Eliminar BOM en cualquier posición
    text = text.replace("\ufeff", "")
    return text


def fix_acceptance_criteria_formatting(text: str) -> str:
    # --- FASE 1: Limpieza General ---
    text = re.sub(r'^The following table:.*$', '', text, flags=re.MULTILINE)
    text = re.sub(r'([^\n])\s*(#{1,6}\s)', r'\1\n\n\2', text)
    text = re.sub(r'([^\n])\s+-\s+\[([ xX]?)\]', r'\1\n- [\2]', text)

    lines = text.split('\n')
    fixed_lines = []
    
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('|') and '#' in stripped:
            line = line.replace('|', '')
            stripped = line.strip()

        if stripped.startswith('"- [') or stripped.startswith("'- ["):
            line = line.replace('"- [', '- [').replace("'- [", '- [')
        if stripped.endswith('"') and '- [' in line:
            line = line.rstrip('"')

        if ('Criterios de aceptación:' in line or 'Criterios de aceptación:**' in line):
            if ' - [' in line:
                parts = line.split(' - [', 1)
                header = parts[0].strip()
                content = '- [' + parts[1]
                fixed_lines.append(header)
                fixed_lines.append('') 
                fixed_lines.append(content)
            else:
                fixed_lines.append(line)
                fixed_lines.append('')
        else:
            fixed_lines.append(line)
    
    return '\n'.join(fixed_lines)

# ---------- Fix escapes y paréntesis ----------
_NODE_LABEL_RE = re.compile(
    r"(\w+\s*(?:\([^\)]*\))?\s*(?:\[[^\]]*\]|\([^\)]*\)|\{[^\}]*\}|\"[^\"]*\"|'[^']*'))"
)
_PARENS_LABEL_RE = re.compile(r"(\[[^\]]*\]|\([^\)]*\))")
_LINE_CONT_RE = re.compile(r"\\\n")


def fix_double_lines(mmd: str) -> str:
    return _LINE_CONT_RE.sub(" ", mmd)


def escape_parens_in_labels(mmd: str) -> str:
    def repl(m):
        text = m.group(0)
        text = text.replace("(", r"\(").replace(")", r"\)")
        return text
    return _PARENS_LABEL_RE.sub(repl, mmd)


# ---------- Mermaid rendering ----------
def render_mermaid_to_png(
    code: str, out_png: Path, width: int, background: str, theme: str
) -> bool:
    """
    Renderiza el código Mermaid a PNG.
    IMPORTANTE: Aquí NO aplicamos escape_parens_in_labels, ya que eso
    se controla desde replace_mermaid_with_images según los flags.
    """
    # Limpieza básica redundante pero segura para el archivo temporal
    code = normalize_unicode(code)
    code = fix_double_lines(code)
    
    # NOTA: fix_mermaid_subgraphs ya se aplicó antes si el flag estaba activo,
    # pero aplicarlo de nuevo no hace daño si la estructura ya es correcta.
    # code = fix_mermaid_subgraphs(code) 

    with tempfile.NamedTemporaryFile(
        delete=False, suffix=".mmd", mode="w", encoding="utf-8"
    ) as tmp:
        tmp.write(code)
        tmp_path = tmp.name

    last_err = None
    ok = False

    for base_cmd in all_mmdc_candidates():
        cmd = base_cmd + [
            "-i", tmp_path,
            "-o", str(out_png),
            "-w", str(width),
            "-s", "2",
            "-b", background,
            "-t", theme,
        ]
        try:
            res = try_run(base_cmd, cmd[len(base_cmd) :])
            if res.returncode == 0:
                ok = True
                break
            else:
                last_err = res.stderr.decode("utf-8", errors="ignore")
        except Exception as e:
            last_err = str(e)

    try:
        os.remove(tmp_path)
    except OSError:
        pass

    if not ok:
        sys.stderr.write(
            f"[WARNING] mmdc error: {last_err or 'Unknown'}\n"
        )
    return ok


# ----------------------------------------------------------------------
# Sustituir bloques mermaid por imágenes
# ----------------------------------------------------------------------
def replace_mermaid_with_images(
    md_text: str,
    work_dir: Path,
    width: int,
    background: str,
    theme: str,
    fix_subgraphs_flag: bool,
    fix_edges_flag: bool,
    fix_lines_flag: bool,
    escape_parens_flag: bool,
) -> str:
    work_dir.mkdir(parents=True, exist_ok=True)
    counter = 1

    def _apply_fixes(code: str) -> str:
        code = normalize_unicode(code)
        if fix_subgraphs_flag:
            code = fix_mermaid_subgraphs(code)
        if fix_lines_flag:
            code = fix_double_lines(code)
        if escape_parens_flag:
            code = escape_parens_in_labels(code)
        return code

    def _repl(match: re.Match) -> str:
        nonlocal counter
        original_code = match.group(1).strip()
        
        # Aplicamos las correcciones AQUÍ según los flags
        code = _apply_fixes(original_code)

        img_name = f"mermaid_{counter:03d}.png"
        img_path = work_dir / img_name
        idx = counter
        counter += 1

        ok = render_mermaid_to_png(
            code, img_path, width=width, background=background, theme=theme
        )
        if not ok:
            sys.stderr.write(
                f"[WARNING] Mermaid #{idx} falló al renderizar. Se mantiene el código.\n"
            )
            return f"```mermaid\n{original_code}\n```"

        abs_path = img_path.resolve()
        return f"![mermaid diagram {idx}]({abs_path})"

    return MERMAID_BLOCK_RE.sub(_repl, md_text)


def safe_replace_mermaid_with_images(
    md_text: str,
    work_dir: Path,
    width: int,
    background: str,
    theme: str,
    fix_subgraphs_flag: bool,
    fix_edges_flag: bool,
    fix_lines_flag: bool,
    escape_parens_flag: bool,
) -> str:
    try:
        return replace_mermaid_with_images(
            md_text, work_dir, width, background, theme,
            fix_subgraphs_flag, fix_edges_flag, fix_lines_flag, escape_parens_flag,
        )
    except Exception as e:
        sys.stderr.write(
            f"[WARNING] Error inesperado procesando Mermaid: {e}\n"
        )
        return md_text


# ----------------------------------------------------------------------
# Estilado y Conversión
# ----------------------------------------------------------------------
def style_document(doc: Document) -> None:
    styles = doc.styles
    if "Normal" in styles:
        st = styles["Normal"]
        st.font.name = "Calibri"
        st.font.size = Pt(11)

    for i in range(1, 4):
        name = f"Heading {i}"
        if name in styles:
            h = styles[name]
            h.font.name = "Calibri"
            h.font.size = Pt(14 if i == 1 else 13 if i == 2 else 12)
            h.font.bold = True

    MAX_W, MAX_H = Cm(15), Cm(23)
    for shape in doc.inline_shapes:
        try:
            w, h = shape.width, shape.height
            if w > 0 and h > 0:
                scale = min(MAX_W / w, MAX_H / h)
                if scale < 1:
                    shape.width = int(w * scale)
                    shape.height = int(h * scale)
        except Exception:
            pass

    for table in doc.tables:
        try:
            num_cols = len(table.columns)
            h0 = table.rows[0].cells[0].text.strip().lower()
        except IndexError:
            continue

        if num_cols == 3 and h0 == "id":
            table.autofit = False
            table.allow_autofit = False
            for row in table.rows:
                row.cells[0].width = Cm(1.75)
                row.cells[1].width = Cm(5.25)
                row.cells[2].width = Cm(9.5)
        
        elif num_cols == 3 and h0.startswith("requisito"):
            table.autofit = False
            table.allow_autofit = False
            for row in table.rows:
                row.cells[0].width = Cm(8.0)
                row.cells[1].width = Cm(4.0)
                row.cells[2].width = Cm(4.5)

        elif num_cols == 5 or (num_cols > 3 and h0.startswith("pantalla")):
            table.autofit = False
            table.allow_autofit = False
            for row in table.rows:
                if len(row.cells) >= 5:
                    row.cells[0].width = Cm(2.8)
                    row.cells[1].width = Cm(1.7)
                    row.cells[2].width = Cm(7.0)
                    row.cells[3].width = Cm(2.5)
                    row.cells[4].width = Cm(2.5)


def convert_md_to_docx(
    md_path: Path, out_path: Path, width: int, background: str, theme: str,
    fix_subgraphs_flag: bool, fix_edges_flag: bool, fix_lines_flag: bool, escape_parens_flag: bool,
) -> None:
    original = md_path.read_text(encoding="utf-8")
    original = clean_markdown_text(original)
    original = fix_acceptance_criteria_formatting(original)
    
    with tempfile.TemporaryDirectory() as td:
        tdir = Path(td)
        md_with_imgs = safe_replace_mermaid_with_images(
            original, tdir, width, background, theme,
            fix_subgraphs_flag, fix_edges_flag, fix_lines_flag, escape_parens_flag,
        )

        tmp_docx = tdir / "tmp.docx"
        pypandoc.convert_text(
            md_with_imgs, "docx", format="markdown-yaml_metadata_block",
            outputfile=str(tmp_docx), extra_args=["--standalone"],
        )
        doc = Document(str(tmp_docx))
        style_document(doc)
        out_path.parent.mkdir(parents=True, exist_ok=True)
        doc.save(str(out_path))


# ----------------------------------------------------------------------
# CLI
# ----------------------------------------------------------------------
def parse_args(argv=None):
    ap = argparse.ArgumentParser(description="MD to DOCX (v2.5)")
    ap.add_argument("input_md", help="Fichero .md o carpeta")
    ap.add_argument("output_docx", help="Fichero DOCX salida")
    ap.add_argument("--width", type=int, default=1600)
    ap.add_argument("--background", default="white")
    ap.add_argument("--theme", default="default")
    
    ap.add_argument("--no-fix-subgraphs", dest="fix_subgraphs", action="store_false")
    ap.add_argument("--no-fix-edges", dest="fix_edges", action="store_false")
    ap.add_argument("--no-fix-lines", dest="fix_lines", action="store_false")
    
    # IMPORTANTE: Default False para evitar romper nodos ([...])
    ap.add_argument("--escape-parens", dest="escape_parens", action="store_true")
    
    ap.set_defaults(
        fix_subgraphs=True,
        fix_edges=True,
        fix_lines=True,
        escape_parens=False,
    )
    return ap.parse_args(argv)


def main(argv=None):
    args = parse_args(argv)
    in_path = Path(args.input_md)
    out = Path(args.output_docx)
    
    if not in_path.exists():
        sys.exit(f"[ERROR] No existe: {in_path}")

    if in_path.is_dir():
        combined_md = build_combined_markdown_from_dir(in_path)
        with tempfile.TemporaryDirectory() as td:
            tmp_md = Path(td) / "combined.md"
            tmp_md.write_text(combined_md, encoding="utf-8")
            convert_md_to_docx(
                tmp_md, out, args.width, args.background, args.theme,
                args.fix_subgraphs, args.fix_edges, args.fix_lines, args.escape_parens,
            )
    else:
        convert_md_to_docx(
            in_path, out, args.width, args.background, args.theme,
            args.fix_subgraphs, args.fix_edges, args.fix_lines, args.escape_parens,
        )

    print(f"[OK] DOCX generado en: {out}")


if __name__ == "__main__":
    main()
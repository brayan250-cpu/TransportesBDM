#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Validador de trazabilidad (matriz y backlog)

Comprueba que:
1) Todos los requerimientos funcionales definidos en 03_requerimientos_funcionales.md
   están referenciados en:
   - la matriz de trazabilidad (14_matriz_trazabilidad.md), y/o
   - el backlog (02_backlog.md), según lo que se indique al ejecutar.

2) Todas las historias de usuario de 05_historias_usuario.md están referenciadas
   en la matriz / backlog.

3) Todas las interfaces de usuario de 11_interfaces_usuario.md (o 10_*.md si usas ese)
   están referenciadas en la matriz / backlog.

Uso típico:
    python valida_trazabilidad.py \
        --req  03_requerimientos_funcionales.md \
        --hu   05_historias_usuario.md \
        --ui   11_interfaces_usuario.md \
        --mat  14_matriz_trazabilidad.md \
        --backlog 02_backlog.md

Parámetros:
- --mat      Fichero de matriz de trazabilidad (opcional).
- --backlog  Fichero de backlog de tareas (opcional).
- Puedes usar uno, el otro, o ambos a la vez.

Salidas:
- Imprime un informe legible en consola para cada destino (matriz / backlog).
- Devuelve código de salida 0 si TODO OK en todos los destinos,
  1 si hay ausencias en alguno.
- Con --json escribe un JSON en stdout con el detalle (por destino).
"""

import argparse
import re
import sys
from pathlib import Path
from typing import Set, Dict, List, Any


# Regex semi-estrictas para IDs
RF_RE = re.compile(r'\bRF-(?:[A-Z0-9]+-)*\d+\b')
HU_RE = re.compile(r'\bHU-(?:[A-Z0-9]+-)*\d+\b')
UI_RE = re.compile(r'\bP-(?:[A-Z0-9]+-)*\d+\b')


def leer_texto(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return path.read_text(encoding="latin-1")


def extraer_ids(texto: str, patron: re.Pattern) -> Set[str]:
    return set(patron.findall(texto))


def validar_contra(req_path: Path, hu_path: Path, ui_path: Path, target_path: Path) -> Dict[str, Any]:
    """
    Valida la trazabilidad de RF / HU / UI definidos en req/hu/ui_path
    contra un fichero de destino (matriz, backlog, …).
    """
    req_txt = leer_texto(req_path)
    hu_txt = leer_texto(hu_path)
    ui_txt = leer_texto(ui_path)
    tgt_txt = leer_texto(target_path)

    # IDs en documentos fuente
    rf_fuente = extraer_ids(req_txt, RF_RE)
    hu_fuente = extraer_ids(hu_txt, HU_RE)
    ui_fuente = extraer_ids(ui_txt, UI_RE)

    # IDs referenciados en el destino (matriz o backlog)
    rf_tgt = extraer_ids(tgt_txt, RF_RE)
    hu_tgt = extraer_ids(tgt_txt, HU_RE)
    ui_tgt = extraer_ids(tgt_txt, UI_RE)

    faltan_rf = sorted(rf_fuente - rf_tgt)
    faltan_hu = sorted(hu_fuente - hu_tgt)
    faltan_ui = sorted(ui_fuente - ui_tgt)

    sobrantes_rf = sorted(rf_tgt - rf_fuente)
    sobrantes_hu = sorted(hu_tgt - hu_fuente)
    sobrantes_ui = sorted(ui_tgt - ui_fuente)

    return {
        "faltan_rf": faltan_rf,
        "faltan_hu": faltan_hu,
        "faltan_ui": faltan_ui,
        "sobrantes_rf": sobrantes_rf,
        "sobrantes_hu": sobrantes_hu,
        "sobrantes_ui": sobrantes_ui,
        "num_rf_fuente": len(rf_fuente),
        "num_hu_fuente": len(hu_fuente),
        "num_ui_fuente": len(ui_fuente),
        "num_rf_destino": len(rf_tgt),
        "num_hu_destino": len(hu_tgt),
        "num_ui_destino": len(ui_tgt),
        "destino": str(target_path),
    }


def imprimir_reporte(res: Dict[str, Any], nombre: str) -> int:
    ok_rf = len(res["faltan_rf"]) == 0
    ok_hu = len(res["faltan_hu"]) == 0
    ok_ui = len(res["faltan_ui"]) == 0

    print(f"== RESUMEN ({nombre}) ==")
    print(f"- Requerimientos funcionales referenciados: {'OK' if ok_rf else 'FALTAN'}")
    print(
        f"  • Fuente: {res['num_rf_fuente']} | En {nombre}: {res['num_rf_destino']} | Faltan: {len(res['faltan_rf'])}"
    )
    print(f"- Historias de usuario referenciadas: {'OK' if ok_hu else 'FALTAN'}")
    print(
        f"  • Fuente: {res['num_hu_fuente']} | En {nombre}: {res['num_hu_destino']} | Faltan: {len(res['faltan_hu'])}"
    )
    print(f"- Interfaces de usuario referenciadas: {'OK' if ok_ui else 'FALTAN'}")
    print(
        f"  • Fuente: {res['num_ui_fuente']} | En {nombre}: {res['num_ui_destino']} | Faltan: {len(res['faltan_ui'])}"
    )
    print()

    if res["faltan_rf"]:
        print(f"FALTAN en {nombre} - Requerimientos funcionales (RF):")
        for i in res["faltan_rf"]:
            print(f"  - {i}")
        print()
    if res["faltan_hu"]:
        print(f"FALTAN en {nombre} - Historias de usuario (HU):")
        for i in res["faltan_hu"]:
            print(f"  - {i}")
        print()
    if res["faltan_ui"]:
        print(f"FALTAN en {nombre} - Interfaces (P-*):")
        for i in res["faltan_ui"]:
            print(f"  - {i}")
        print()

    if res["sobrantes_rf"] or res["sobrantes_hu"] or res["sobrantes_ui"]:
        print(f"AVISO: IDs presentes en {nombre} que no aparecen en los documentos fuente:")
        if res["sobrantes_rf"]:
            print("  Sobrantes RF:")
            for i in res["sobrantes_rf"]:
                print(f"    - {i}")
        if res["sobrantes_hu"]:
            print("  Sobrantes HU:")
            for i in res["sobrantes_hu"]:
                print(f"    - {i}")
        if res["sobrantes_ui"]:
            print("  Sobrantes P-*:")
            for i in res["sobrantes_ui"]:
                print(f"    - {i}")
        print()

    return 0 if ok_rf and ok_hu and ok_ui else 1


def main():
    parser = argparse.ArgumentParser(description="Validador de trazabilidad (matriz y backlog)")
    parser.add_argument("--req", default="03_requerimientos_funcionales.md", type=Path)
    parser.add_argument("--hu",  default="05_historias_usuario.md", type=Path)
    parser.add_argument("--ui",  default="11_interfaces_usuario.md", type=Path)
    parser.add_argument("--mat", type=Path, default=None,
                        help="Fichero de matriz de trazabilidad (p.ej. 14_matriz_trazabilidad.md)")
    parser.add_argument("--backlog", type=Path, default=None,
                        help="Fichero de backlog (p.ej. 02_backlog.md)")
    parser.add_argument("--json", action="store_true",
                        help="Imprime salida en JSON además del/los reporte(s)")
    args = parser.parse_args()

    if not args.mat and not args.backlog:
        print("ERROR: Debes indicar al menos uno de: --mat o --backlog", file=sys.stderr)
        sys.exit(2)

    resultados: Dict[str, Dict[str, Any]] = {}
    exit_code_global = 0

    if args.mat:
        res_mat = validar_contra(args.req, args.hu, args.ui, args.mat)
        resultados["matriz"] = res_mat
        code_mat = imprimir_reporte(res_mat, "matriz")
        exit_code_global = max(exit_code_global, code_mat)

    if args.backlog:
        res_bl = validar_contra(args.req, args.hu, args.ui, args.backlog)
        resultados["backlog"] = res_bl
        code_bl = imprimir_reporte(res_bl, "backlog")
        exit_code_global = max(exit_code_global, code_bl)

    if args.json:
        import json
        print(json.dumps(resultados, ensure_ascii=False, indent=2))

    sys.exit(exit_code_global)


if __name__ == "__main__":
    main()

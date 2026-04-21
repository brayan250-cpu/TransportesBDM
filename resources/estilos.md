# 🎨 Guía de Estilo — Honda Perú

> Colores y tipografía extraídos de https://honda.com.pe/

## 🖌️ Colores

### **Colores de Fondo (Background Colours)**

| Color          | HEX       | RGB                | Uso                                    |
| :------------- | :-------- | :----------------- | :------------------------------------- |
| Blanco         | `#FFFFFF` | `rgb(255,255,255)` | Fondo principal del sitio              |
| Rojo Honda     | `#FF0004` | `rgb(255,0,4)`     | **Barra de navegación principal, botones destacados, elementos corporativos** |
| Negro          | `#000000` | `rgb(0,0,0)`       | Fondos especiales, footer              |
| Gris oscuro    | `#242527` | `rgba(36,37,39,0.95)` | Fondos de overlay, modales          |

---

### **Colores de Texto (Text Colours)**

| Color          | HEX       | RGB                | Uso                                    |
| :------------- | :-------- | :----------------- | :------------------------------------- |
| Gris oscuro    | `#333333` | `rgb(51,51,51)`    | Texto principal body, navegación       |
| Blanco         | `#FFFFFF` | `rgb(255,255,255)` | Texto sobre fondos rojos/oscuros, menú navegación |
| Rojo Honda     | `#FF0000` | `rgb(255,0,0)`     | Textos destacados, llamadas a la acción |
| Azul enlace    | `#337AB7` | `rgb(51,122,183)`  | Enlaces especiales (ej: teléfono)      |
| Negro          | `#000000` | `rgb(0,0,0)`       | Textos de alto contraste               |
| Negro suave    | `rgba(0,0,0,0.8)` | `rgba(0,0,0,0.8)` | Texto secundario con transparencia |

---

## ✍️ Tipografía (Typography)

**Fuente principal:** `AvenirNext-Medium, Helvetica, Arial, sans-serif`

**Fuentes complementarias:**
- `AvenirNext-Bold` (para títulos y elementos destacados)
- `AvenirNext-DemiBold` (para subtítulos)

### Jerarquía tipográfica

| Elemento                       | Tamaño | Peso           | Color       | Uso                                   |
| :----------------------------- | :----- | :------------- | :---------- | :------------------------------------ |
| **Encabezado secundario (H2)** | 20px   | 400 (Normal)   | `#333333`   | Títulos de sección                    |
| **Encabezado terciario (H3)**  | 21px   | 500 (Medium)   | `#FFFFFF`   | Títulos sobre fondo rojo, cards       |
| **Texto principal (Body)**     | 14px   | 400 (Normal)   | `#333333`   | Contenido general                     |
| **Texto destacado**            | 14px   | 700 (Bold)     | `#333333`   | Información importante                |
| **Enlaces navegación**         | 15px   | 400 (Normal)   | `#FFFFFF`   | Enlaces del menú principal sobre fondo rojo |
| **Teléfono/Enlaces especiales**| 14px   | 700 (Bold)     | `#337AB7`   | Número de teléfono, enlaces de contacto |

### Notas de implementación

- La fuente **Avenir Next** es la tipografía corporativa de Honda. Si no está disponible, usar **Helvetica** o **Arial** como fallback.
- El **color rojo corporativo (#FF0004)** es el elemento visual más distintivo de Honda y debe usarse para:
  - Barra de navegación principal
  - Botones de acción primarios
  - Elementos de énfasis corporativo
  - Headers y secciones destacadas
- Los textos sobre fondo rojo deben ser siempre **blancos (#FFFFFF)** para máximo contraste.
- El texto del body utiliza un gris oscuro (#333333) en lugar de negro puro para mejor legibilidad.
- La tipografía mantiene un tamaño base de **14px** para mejor adaptación a contenidos densos.
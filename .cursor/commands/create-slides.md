# 🎨 Prompt para crear presentaciones tipo slides

> 💡 **Nota importante**: Las guidelines del sistema están en las rules del proyecto.

## 🎯 Template para crear nuevas presentaciones

### 📁 Ubicación destino

Si el usuario no te indica en qué carpeta debe ir, invéntate una

### 📚 Título de la presentación

Título descriptivo de la presentación

### 🎓 Actualizar índices

- **Si es carpeta nueva**:
  - Añadir enlace al `/index.html` raíz del proyecto
  - Crear `/{nueva-carpeta}/index.html` con lista de sesiones
  - **IMPORTANTE**: El índice de la carpeta debe tener un style similar al `index.html` del root
- **Si es carpeta existente**:
  - Añadir la nueva session al `/{carpeta-existente}/index.html`

### 🎨 Tipos de slides disponibles

#### Básicas

- **slide-cover**: Portada inicial
- **slide-content**: Contenido libre con estilos mínimos (ideal para personalizar)
- **slide-list**: Para listas con números circulares
- **slide-two-columns**: Para contenido lado a lado
- **slide-image**: Para slides con imágenes destacadas
- **slide-final**: Slide final con logo (añadela siempre al final)

#### Avanzadas (nuevas)

- **slide-code**: Código con explicación (fondo gris, pre oscuro, zona de explicación)
- **slide-quote**: Cita destacada o callout (4 variantes de color: default, warning, success, danger)
- **slide-comparison**: Comparación lado a lado (bueno vs malo, antes vs después)
- **slide-timeline**: Proceso paso a paso (variantes horizontal y vertical)

### 🧠 Contenido de las slides

El usuario debe especificarte el contenido de las Slides y cómo quiere que las generes. En caso que no lo haga pídeselo.

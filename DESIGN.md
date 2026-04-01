# Design System: Paradise Gate (The Tactile Dreamscape)

Este documento describe la fundación del sistema de diseño para el proyecto **Paradise Gate**, extraído de la metadata del proyecto en Stitch. Sigue un formato estructurado para guiar la implementación y su integración con Tailwind CSS.

## 1. Filosofía de Diseño: "High-End Kawaii"
El objetivo es crear un entorno digital que se sienta orgánico, flotante y deliberadamente suave. Nos alejamos del comercio electrónico frío tradicional hacia una estética similar al papel de vitela de alta calidad con influencias "Kawaii" sofisticadas.

**Reglas de Superficie (The "No-Line" Rule)**
- **PROHIBIDO el uso de bordes sólidos de 1px** para definir secciones o contenedores.
- Los límites visuales deben establecerse a través de cambios sutiles de fondo y jerarquía (ej. una tarjeta `surface-container-low` descansando sobre un fondo `surface`).

## 2. Paleta de Colores (Colors)

En este diseño, el color no se usa para crear estructura; se utiliza para establecer el **estado de ánimo y las interacciones**.

### Core Colors
| Token | Valor Hex | Uso Sugerido / Equivalente Tailwind |
| :--- | :--- | :--- |
| **Primary** | `#75525b` | Botones primarios, acentos textuales (`bg-primary`, `text-primary`) |
| **Primary Container** | `#ffd1dc` | Fondos de hover para el botón primario (`bg-primary-container`) |
| **Secondary** | `#2f6275` | Acentos secundarios (`bg-secondary`) |
| **Secondary Container** | `#b2e4fb` | Botones secundarios (tipo "Cinnamoroll blue") |
| **Tertiary** | `#6e5275` | Destacados y etiquetas terciarias |
| **Tertiary Container** | `#f5d1fb` | "Sparkle Chips", etiquetas de "Nuevo" o "Limitado" (estilo "Kuromi") |

### Superficies (Surfaces & Depth)
Piensa en la UI como capas físicas de papel texturizado:
| Capa (Tonalidad) | Valor Hex | Equivalente Tailwind | Uso |
| :--- | :--- | :--- | :--- |
| **Surface** | `#f6f6f6` | `bg-surface` | La base del layout (Base level) |
| **Surface Container Highest** | `#dbdddd` | `bg-surface-highest` | Elementos "hundidos" (ej. Inputs inactivos) |
| **Surface Container High** | `#e1e3e3` | `bg-surface-high` | Cambios sutiles o divisores visuales |
| **Surface Container Low** | `#f0f1f1` | `bg-surface-low` | Tarjetas estáticas |
| **Surface Container Lowest** | `#ffffff` | `bg-surface-lowest` | Elementos "flotantes", Focus states |

### Contraste y Tipografía
| Token | Valor Hex | Equivalente Tailwind |
| :--- | :--- | :--- |
| **On Surface** | `#2d2f2f` | `text-on-surface` (Evitar usar el negro puro #000000) |
| **On Primary** | `#ffeff1` | `text-on-primary` (Texto para botones primarios) |
| **Outline Variant** | `#acadad` | `border-outline-variant` |

## 3. Tipografía (Typography)

**Familia Principal**: `Plus Jakarta Sans`
Se eligió por sus terminales redondeadas que proveen la suavidad "Kawaii", al mismo tiempo que mantiene una estructura geométrica para una legibilidad y aspecto profesional indiscutible.

### Sistema Tipográfico
- **Display (Lg/Md/Sm)**: Usados para "Momentos de Marca". Deben poseer un interletraje ajustado (`tracking-tight` / `-0.02em`) para sentirse como gráficos cohesivos más que como simple texto.
- **Headlines (`headline-lg`)**: Títulos de categoría fundamentales. Usar en conjunto con padding superior generoso para dejar "respirar" el diseño.
- **Body (`body-lg`)**: Optimizado para lectura en áreas de descripciones de producto.
- **Labels (`label-sm`)**: Reservado para micro-copia y metadata. Siempre deben ir en `uppercase` con un interletraje extendido (`tracking-wide` / `+0.05em`).

## 4. Espaciado (Spacing Scale)

El sistema hace un uso extensivo y agresivo del **espacio en blanco (Extreme White Space)**.

| Token Original | Equivalencia recomendada | Tailwind Class (Custom) | Notas |
| :--- | :--- | :--- | :--- |
| `spacing-8` | `2.75rem` (44px) | `p-11`, `m-11`, `gap-11` | Usar para definir la jerarquía de separación entre iteraciones de datos y tarjetas. |
| `spacing-10` | `3.5rem` (56px) | `p-14`, `m-14`, `gap-14` | Usar para desplazar elementos en grids escalonados ("Staggered Grids"), rompiendo un grid normal para aparentar un scrapbook curado. |

## 5. Bordes y Radios (Roundedness)

Los elementos **nunca** deben emplear esquinas de 90 grados. Incluso los elementos más pequeños deben lucir suaves.

| Propósito | Equivalencia | Utilidad Tailwind |
| :--- | :--- | :--- |
| **Sm** (El mínimo permitido) | `0.5rem` | `rounded-sm` / `rounded-md` |
| **Md** (Inputs y Text Areas) | `1.5rem` | `rounded-[1.5rem]` / `rounded-2xl` |
| **Lg / Xl** (Imágenes grandes) | `2rem` - `3rem` | `rounded-[2rem]` / `rounded-[3rem]` |
| **Pill Standard** (Botones) | `9999px` | `rounded-full` |

## 6. Sombras y Efectos Especiales (Elevations & Materials)

**Profundidad como un "susurro" sutil**
Debes evitar el uso estándar de `box-shadow` regular para emular estructura.

- **Kawaii Glow (Componentes Flotantes)**: Para modales y estados activos en Hover/Focus. Emula luz natural súper difusa.
  `box-shadow: 0px 20px 40px rgba(45, 47, 47, 0.06)`
- **Glass Rule**: Para elementos "sobre el suelo" como Navigations o "Quick Add flotantes", emplea colores de superficie semitransparentes combinados con `backdrop-blur-xl` (`20px - 40px`).
- **Signature Gradient**: Degradado "Aura" único para Call to Actions Heroicos. Transición entre `Primary Fixed (#ffd1dc)` y `Secondary Fixed (#b2e4fb)` a 45 grados.
- **Ghost Border Fallback**: En los casos excepcionales donde el contraste requiera un borde visible por accesibilidad, usar un borde de 1px usando `outline-variant` con un **15% de opacidad**. Debe sentirse, no verse a simple vista.

---

### Snippet Sugerido para `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#75525b",
          container: "#ffd1dc",
          fixed: "#ffd1dc",
        },
        secondary: {
          DEFAULT: "#2f6275",
          container: "#b2e4fb",
          fixed: "#b2e4fb",
        },
        tertiary: {
          DEFAULT: "#6e5275",
          container: "#f5d1fb",
        },
        surface: {
          DEFAULT: "#f6f6f6",
          lowest: "#ffffff",
          low: "#f0f1f1",
          high: "#e1e3e3",
          highest: "#dbdddd",
        },
        on: {
          surface: "#2d2f2f",
          primary: "#ffeff1",
        },
        outline: {
          variant: "#acadad",
        }
      },
      spacing: {
        '11': '2.75rem', 
        '14': '3.5rem',  
      },
      boxShadow: {
        'kawaii': '0px 20px 40px rgba(45, 47, 47, 0.06)',
      },
      letterSpacing: {
        'brand': '-0.02em',
        'label': '0.05em',
      }
    },
  },
  plugins: [],
};
export default config;
```

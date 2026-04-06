# Blog Landing Page — Design System

> Extracted from the **Blog Landing Page** Stitch project (`projects/14669564814250128216`)
> Generated on: April 6, 2026

---

## Creative Direction

**North Star: "The Digital Curator"**

Rooted in the heritage of high-end print journalism — *The New Yorker*, *Kinfolk* — translated into a digital-first experience. The system embraces intentional asymmetry, generous white space, and overlapping editorial elements through a **"Breathing Grid"** layout strategy.

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| **Primary** | `#163826` | Core brand moments, high-authority type ("Forest Noir") |
| **Primary Container** | `#2d4f3c` | CTA gradients, hover states |
| **Secondary** | `#546258` | Supporting UI elements |
| **Secondary Container** | `#d4e4d7` | Secondary backgrounds |
| **Tertiary** | `#4c2629` | "Editor's Choice" accents, badges ("Oxblood") |
| **Tertiary Container** | `#663c3f` | Tertiary backgrounds |
| **Error** | `#ba1a1a` | Error states |
| **Error Container** | `#ffdad6` | Error backgrounds |

### Surfaces

| Token | Hex | Usage |
|-------|-----|-------|
| **Background / Surface** | `#faf9f7` | Warm off-white parchment base |
| **Surface Container Lowest** | `#ffffff` | Floated cards ("The Lift") |
| **Surface Container Low** | `#f4f3f1` | Secondary content areas ("The Inset") |
| **Surface Container** | `#efeeec` | Mid-level containers |
| **Surface Container High** | `#e9e8e6` | Hero gradient target |
| **Surface Container Highest** | `#e3e2e0` | Highest elevation surfaces |
| **Surface Dim** | `#dadad8` | Dimmed surface states |
| **Surface Variant** | `#e3e2e0` | Input field backgrounds |

### On-Colors (Text & Icons)

| Token | Hex | Usage |
|-------|-----|-------|
| **On Primary** | `#ffffff` | Text on primary backgrounds |
| **On Primary Container** | `#9ac0a7` | Text on primary containers |
| **On Secondary** | `#ffffff` | Text on secondary backgrounds |
| **On Secondary Container** | `#58665c` | Text on secondary containers |
| **On Tertiary** | `#ffffff` | Text on tertiary backgrounds |
| **On Tertiary Container** | `#e1a8ab` | Text on tertiary containers |
| **On Surface** | `#1a1c1b` | Primary text color (never use pure black) |
| **On Surface Variant** | `#424843` | Secondary text, metadata |
| **On Background** | `#1a1c1b` | Text on background |
| **On Error** | `#ffffff` | Text on error backgrounds |

### Outline & Borders

| Token | Hex | Usage |
|-------|-----|-------|
| **Outline** | `#727973` | Primary outlines |
| **Outline Variant** | `#c1c8c1` | Ghost borders (use at 15% opacity) |

### Inverse Colors

| Token | Hex |
|-------|-----|
| **Inverse Surface** | `#2f3130` |
| **Inverse On Surface** | `#f1f1ef` |
| **Inverse Primary** | `#a9cfb7` |

### Fixed Colors

| Token | Hex |
|-------|-----|
| **Primary Fixed** | `#c5ecd2` |
| **Primary Fixed Dim** | `#a9cfb7` |
| **Secondary Fixed** | `#d7e6da` |
| **Secondary Fixed Dim** | `#bbcabe` |
| **Tertiary Fixed** | `#ffdadb` |
| **Tertiary Fixed Dim** | `#f2b8bb` |

---

## Typography

| Role | Font Family | Type | Usage |
|------|-------------|------|-------|
| **Headlines / Display** | **Newsreader** | Serif | Hero titles, article headlines, editorial voice |
| **Body** | **Manrope** | Sans-Serif | Article prose, descriptions, paragraphs |
| **Labels** | **Manrope** | Sans-Serif | Metadata, tags, captions, UI labels |

### Type Scale Guidelines

| Scale | Font | Notes |
|-------|------|-------|
| `display-lg` | Newsreader | Hero titles · `letter-spacing: -0.02em` |
| `headline-sm` | Newsreader | Section headings, paired with label metadata |
| `title-lg` | Manrope | Card titles in grid views |
| `body-lg` | Manrope | Standard article prose (`1rem`) |
| `label-md` | Manrope | Metadata, category tags (uppercase) |

### Pairing Rule

Always pair a **serif headline** (`headline-sm` Newsreader) with a **sans-serif label** (`label-md` Manrope, uppercase) for metadata. This contrast signals "Premium Content."

---

## Theme Settings

| Setting | Value |
|---------|-------|
| **Color Mode** | Light |
| **Corner Roundness** | Round 4 (`0.375rem` for buttons) |
| **Custom Primary** | `#2D4F3C` |
| **Override Neutral** | `#F9F8F6` |
| **Color Variant** | Fidelity |
| **Spacing Scale** | 3 |

---

## Elevation & Depth

- **No traditional drop-shadows** — use **Tonal Layering** instead
- **Ambient hover shadow:** `box-shadow: 0 20px 40px rgba(22, 56, 38, 0.05)` (tinted with primary)
- **Ghost borders:** `outline-variant` at 15% opacity — felt, not seen

### Surface Stacking Order

```
surface-container-lowest (#ffffff)  ← Cards ("The Lift")
surface-container-low   (#f4f3f1)  ← Sidebars ("The Inset")
surface / background    (#faf9f7)  ← Page base
```

---

## Key Design Rules

### ✅ Do

- Use **Glass & Gradient** for CTAs: `linear-gradient(135deg, #163826, #2d4f3c)`
- Use **Glassmorphism** for nav overlays: `surface` at 70% opacity + `backdrop-filter: blur(12px)`
- Define boundaries with **background shifts** and **white space** — not borders
- Use `tertiary` for high-impact accents (badges, drop caps)

### ❌ Don't

- Use `1px solid` borders for sectioning
- Use pure black (`#000000`) for text — use `on_surface` (`#1a1c1b`)
- Use pill-shaped (`border-radius: 9999px`) buttons — use `0.375rem`
- Overcrowd layouts — when in doubt, add 16px more spacing

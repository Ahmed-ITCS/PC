# PentaCipher Light Theme Redesign Plan

## Goal
Replace the neon cyberpunk dark theme with a clean, minimal, light theme derived from the PentaCipher logo palette. Restyle the3D WebGL scene to be subtle and refined. Remove all glow/bloom effects.

---

## New Color Palette

| Role | Current | New | Description |
|------|---------|-----|-------------|
| Page background | `#04070f` | `#F0F7FA` | Soft mint/ice blue |
| Card/panel bg | `#0d1529` | `#FFFFFF` | Clean white surfaces |
| Alt section bg | `#080e1e` | `#E8F1F5` | Pale teal-gray |
| Primary text | `#e8edf5` | `#0F2A44` | Deep navy |
| Secondary text | `rgba(255,255,255,0.5)` | `#4A6580` | Muted navy |
| Tertiary text | `rgba(255,255,255,0.3)` | `#8BA3B8` | Light muted |
| Primary accent | `#00d4ff` | `#0891B2` | Professional cyan |
| Accent hover | `#00d4ff/90` | `#0E7490` | Darker teal |
| Secondary accent | `#7c3aed` | `#6366F1` | Indigo |
| Tertiary accent | `#34d399` | `#0D9488` | Teal |
| Border | `rgba(255,255,255,0.06)` | `rgba(15,42,68,0.08)` | Subtle light borders |
| Border hover | `rgba(0,212,255,0.2)` | `rgba(8,145,178,0.25)` | Cyan tint |
| Focus ring | `#00d4ff` | `#0891B2` | Accessibility |
| Scrollbar | `#162244` on `#04070f` | `#C5D5E0` on `#F0F7FA` | Light |
| Selection | `rgba(0,212,255,0.25)` | `rgba(8,145,178,0.15)` | Light cyan |

---

## Implementation Phases

### Phase 1: Core Config (3 files)
1. `app/globals.css` - CSS variables, utilities, components
2. `tailwind.config.ts` - Color tokens, shadows, gradients
3. `app/layout.tsx` - Body classes

### Phase 2: UI Primitives (3 files)
4. `components/ui/SectionLabel.tsx`
5. `components/ui/GlowOrb.tsx`
6. `components/ui/TiltCard.tsx`

### Phase 3: Layout (2 files)
7. `components/Navbar.tsx`
8. `components/Footer.tsx`

### Phase 4: Sections (12 files)
9-20. All `components/sections/*.tsx` files

### Phase 5: 3D Environment & Scenes (14 files)
21. `components/three/ThreeCanvas.tsx` - Background/fog
22. `components/three/ScrollCanvas.tsx` - CSS fallback
23. `components/three/Effects.tsx` - Remove bloom/chromatic
24. `components/three/environment/SceneLighting.tsx`
25. `components/three/environment/GridFloor.tsx`
26. `components/three/environment/AmbientParticles.tsx`
27-34. All `components/three/scenes/*.tsx` files

### Phase 6: 3D Materials & Geometric (11 files)
35-45. Materials and geometric component defaults

### Phase 7: Pages & Fallback (8 files)
46-53. All `app/**/page.tsx` files + WebGLFallback

---

## Key Changes Summary
- **Remove:** Bloom, ChromaticAberration, neon glow shadows, glow-text, neon borders
- **Replace:** All `#00d4ff` → `#0891B2`, all `#04070f` → `#F0F7FA`, all `#0d1529` → `#FFFFFF`
- **Keep:** 3D scroll scene (recolored), camera rig, animations (toned down)
- **Add:** Light scrollbar, light selection, subtle shadows instead of glows

## Total: ~53 files

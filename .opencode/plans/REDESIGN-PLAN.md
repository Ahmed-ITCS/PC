# PentaCipher 3D Website Redesign Plan

## Vision

Complete overhaul of the current wireframe-polyhedra 3D system into a deeply immersive **cyberpunk digital landscape** — a procedurally generated "cyberspace corridor" that the camera flies through as users scroll. Custom GLSL shaders, spline-based camera paths, instanced geometry, dynamic lighting, and cinematic post-processing. Same 9 homepage sections, entirely new visual presentation.

---

## Architecture Overview

```
                          +--------------------------+
                          |     ScrollCanvas (z-0)    |
                          |   Fixed full-viewport R3F  |
                          +--------------------------+
                          |  Environment Layer         |
                          |  - GridFloor (infinite)    |
                          |  - AmbientParticles        |
                          |  - SceneLighting           |
                          +--------------------------+
                          |  Section Scenes (along     |
                          |  Catmull-Rom camera path)  |
                          |  Hero -> Services -> ...   |
                          |  -> Contact                 |
                          +--------------------------+
                          |  Post-Processing           |
                          |  Bloom + Chromatic +        |
                          |  Vignette + Noise + DoF    |
                          +--------------------------+
                          |  CameraRig (spline-based)  |
                          +--------------------------+
                                    ^
                                    | z-10
                          +--------------------------+
                          |   HTML Content Layer       |
                          |   ScrollControls (html)    |
                          |   Same 9 sections          |
                          +--------------------------+
```

---

## Custom Shader Materials

### 1. CyberMaterial -- Animated grid + noise surface
- **Vertex:** Standard MVP + pass UV, world position, normals
- **Fragment:** Animated grid lines via `mod(uv, gridSize)`, simplex noise distortion, electric blue (`#00d4ff`) primary with pulse
- **Uniforms:** `uTime`, `uColor`, `uGridSize`, `uNoiseScale`, `uOpacity`
- **Use case:** Hero network nodes, service pillars, structural elements

### 2. HologramMaterial -- Transparent holographic effect
- **Vertex:** Vertex displacement with noise (subtle wobble)
- **Fragment:** Fresnel rim glow + animated scan lines + alpha transparency
- **Uniforms:** `uTime`, `uColor`, `uOpacity`, `uScanSpeed`, `uFresnelPower`
- **Use case:** Case study portals, segment labels, floating UI elements

### 3. GridFloorMaterial -- Infinite cyberpunk floor
- **Fragment:** Perspective grid with distance fade, animated grid lines that pulse
- **Uniforms:** `uTime`, `uGridColor`, `uFadeDistance`, `uLineThickness`
- **Use case:** The persistent ground plane throughout the scroll journey

### 4. DataStreamMaterial -- Flowing particle trails
- **Vertex:** Point positions animated along Y axis
- **Fragment:** Radial gradient points with additive blending
- **Uniforms:** `uTime`, `uColor`, `uSpeed`, `uDensity`
- **Use case:** Ambient data streams flowing through the scene

### Shader files:
- `components/three/shaders/noise.glsl` -- Shared simplex noise functions
- `components/three/shaders/cyber.vert` + `cyber.frag`
- `components/three/shaders/hologram.vert` + `hologram.frag`
- `components/three/shaders/gridfloor.frag`
- `components/three/shaders/datastream.vert` + `datastream.frag`
- `components/three/shaders/index.ts` -- Raw string imports for all shaders

---

## Camera System

### Spline-Based CameraPath
- Replace linear `lerpVec3` with `THREE.CatmullRomCurve3` (centripetal, tension 0.5)
- 9 control points defining a winding path through the 3D environment
- Camera tilt/roll based on curve tangent at current position
- Smooth FOV changes (e.g., wider at Hero, tighter at Stats for drama)
- Mouse parallax preserved but with stronger damping (lerp factor 0.03)

### Camera waypoints (revised for depth):
```
Hero:        [0, 1.5, 7]     looking at [0, 0, 0]
TrustBar:    [1, 2, 8]       looking at [0, 1, 0]
Services:    [-1, 2.5, 9]    looking at [0, 2, 0]
Segments:    [2, 3, 10]      looking at [0, 3, 0]
Problems:    [-1.5, 3.5, 9]  looking at [0, 4, 0]
CaseStudies: [0, 4, 11]      looking at [0, 5, 0]
WhyUs:       [1.5, 4.5, 10]  looking at [0, 6, 0]
Stats:       [0, 5, 8]       looking at [0, 7, 0]
Contact:     [0, 5.5, 7]     looking at [0, 8, 0]
```

---

## Section-by-Section 3D Scene Design

### Hero Scene (scroll 0.00-0.10)
- **"Network Brain"** -- Central icosahedron made of `CyberMaterial` with animated grid lines
- 24 `CyberNode` instances orbiting at different radii (instanced mesh)
- Connection lines rendered as animated `<line>` with vertex colors pulsing
- Surrounding `DataStream` particles flowing upward
- `GlowRing` rings orbiting at different angles
- **Lighting:** Cyan key light + purple fill + ambient

### TrustBar Scene (scroll 0.10-0.15)
- Minimal -- just the grid floor + ambient particles
- Brief visual "breath" between Hero and Services

### Services Scene (scroll 0.15-0.30)
- **"Service Pillars"** -- Three tall hexagonal columns made of `HologramMaterial`
- Each pillar has a different color tint (cyan, purple, emerald)
- `GlowRing` halos around each pillar
- Floating `DataFragment` instances between pillars
- Pillars slightly rotate toward camera as scroll approaches

### Segments Scene (scroll 0.30-0.42)
- **"Territory Zones"** -- Four distinct quadrants on the grid floor
- Each quadrant has a different colored `CyberMaterial` grid overlay
- Floating polyhedra markers per zone (instanced, different geometry per zone)
- Subtle particle density differences per quadrant

### Problems Scene (scroll 0.42-0.52)
- **"Chaos Field"** -- 200 particles (instanced) scattered chaotically
- As camera passes, particles converge from chaos into ordered formation
- `GlowOrb` accents at convergence points
- Tension/release visual metaphor

### Case Studies Scene (scroll 0.52-0.65)
- **"Portal Gateways"** -- Three archway structures made of `HologramMaterial`
- Each portal has a unique color (cyan, purple, green) and inner glow
- `GlowRing` halos around each portal
- Particles flowing through the portals

### Why Us Scene (scroll 0.65-0.78)
- **"Constellation"** -- Central `CyberMaterial` polyhedron
- 8 orbiting `HologramMaterial` spheres (instanced) at different distances
- `Trail` effects behind orbiting elements
- Dynamic light that follows the orbit

### Stats Scene (scroll 0.78-0.88)
- **"Particle Convergence"** -- 400 particles (instanced) that converge into 3 sphere formations
- Each sphere formation represents a stat number
- `GlowRing` halos around each sphere
- Dramatic lighting shift -- tighter FOV, brighter bloom

### Contact Scene (scroll 0.88-1.00)
- **"Destination Platform"** -- Flat hexagonal platform with `CyberMaterial`
- Calm ambient particles (fewer, slower)
- Central `GlowOrb` beacon
- `GlowRing` concentric circles on the platform
- Warm, inviting lighting (shift from cyan toward softer blue)

---

## File Changes

### DELETE (dead code removal)
| File | Reason |
|------|--------|
| `components/three/geometric/WireframeGlobe.tsx` | Never imported anywhere |
| `components/three/hooks/useScrollProgress.ts` | Never imported (drei's useScroll used instead) |
| `components/ui/NetworkScene3D.tsx` | Dead code, same as HeroScene |
| `components/ContactForm.tsx` | Superseded by ContactFormFull.tsx |
| `app/fonts/GeistMonoVF.woff` | Unused, project uses Google Fonts |

### CREATE (new files)
| File | Purpose |
|------|---------|
| `components/three/shaders/noise.glsl` | Shared GLSL simplex noise functions |
| `components/three/shaders/cyber.vert` | CyberMaterial vertex shader |
| `components/three/shaders/cyber.frag` | CyberMaterial fragment shader |
| `components/three/shaders/hologram.vert` | HologramMaterial vertex shader |
| `components/three/shaders/hologram.frag` | HologramMaterial fragment shader |
| `components/three/shaders/gridfloor.frag` | GridFloorMaterial fragment shader |
| `components/three/shaders/datastream.vert` | DataStreamMaterial vertex shader |
| `components/three/shaders/datastream.frag` | DataStreamMaterial fragment shader |
| `components/three/shaders/index.ts` | Shader string imports |
| `components/three/materials/CyberMaterial.tsx` | Custom shader material component |
| `components/three/materials/HologramMaterial.tsx` | Custom shader material component |
| `components/three/materials/GridFloorMaterial.tsx` | Custom shader material component |
| `components/three/materials/DataStreamMaterial.tsx` | Custom shader material component |
| `components/three/environment/GridFloor.tsx` | Infinite perspective grid floor |
| `components/three/environment/AmbientParticles.tsx` | Persistent ambient particle system |
| `components/three/environment/SceneLighting.tsx` | Dynamic lighting rig |
| `components/three/geometric/CyberNode.tsx` | Network node with shader material |
| `components/three/geometric/DataStream.tsx` | Flowing data particle streams |
| `components/three/geometric/ServicePillar.tsx` | Hexagonal service pillar |
| `components/three/geometric/PortalGateway.tsx` | Archway portal structure |
| `components/three/geometric/OrbitSystem.tsx` | Orbiting element system |
| `components/three/geometric/ConvergenceField.tsx` | Particle convergence effect |
| `components/three/geometric/DestinationPlatform.tsx` | Contact section platform |
| `components/three/hooks/useQuality.ts` | Mobile detection + quality tiers |

### REWRITE (complete replacement)
| File | Changes |
|------|---------|
| `components/three/ScrollCanvas.tsx` | New orchestrator with environment, updated scene imports, PerformanceMonitor |
| `components/three/CameraRig.tsx` | CatmullRomCurve3 spline path, tilt/roll, FOV animation, stronger mouse damping |
| `components/three/Effects.tsx` | Full cyberpunk stack: Bloom + ChromaticAberration + Vignette + Noise + DoF + ToneMapping |
| `components/three/scenes/HeroScene.tsx` | Network Brain with CyberMaterial, instanced CyberNodes, DataStreams |
| `components/three/scenes/ServicesScene.tsx` | Three ServicePillars with HologramMaterial |
| `components/three/scenes/SegmentsScene.tsx` | Four territory zones with colored grids |
| `components/three/scenes/ProblemsScene.tsx` | Chaos-to-order particle convergence |
| `components/three/scenes/CaseStudiesScene.tsx` | Three PortalGateways with HologramMaterial |
| `components/three/scenes/WhyScene.tsx` | Constellation with orbiting spheres + Trail |
| `components/three/scenes/StatsScene.tsx` | 400-particle convergence into sphere formations |
| `components/three/scenes/ContactScene.tsx` | DestinationPlatform with calm ambient |

### REPLACE (delete old, create new)
| Old File | New File | Reason |
|----------|----------|--------|
| `components/three/geometric/ParticleField.tsx` | `components/three/environment/AmbientParticles.tsx` | Rewritten with InstancedMesh, noise-based drift |
| `components/three/geometric/FloatingPolyhedra.tsx` | Split into scene-specific components | Old: generic wireframe polyhedra. New: each scene gets purpose-built geometry |
| `components/three/geometric/GlowOrb3D.tsx` | Integrated into scene components | Simplified -- just emissive spheres, no need for separate component |
| `components/three/geometric/GlowRing.tsx` | `components/three/geometric/GlowRing.tsx` | Keep but optimize: reduce segment count, share material |

### MODIFY (minor updates)
| File | Changes |
|------|---------|
| `components/three/WebGLFallback.tsx` | Minor: update fallback gradient to match new color scheme |
| `app/globals.css` | Add `--electric-2` color variable, update grid pattern, add `.shader-container` utility |
| `tailwind.config.ts` | Add `electric-2` color token, ensure all glow shadows work |
| `package.json` | Add `three-custom-shader-material` dependency (if needed for PBR shader extension) |

### KEEP UNCHANGED
- All HTML section components (`components/sections/*.tsx`)
- All page components (`app/**/page.tsx`)
- `components/Navbar.tsx`, `components/Footer.tsx`, `components/FooterWrapper.tsx`
- `components/PageTransition.tsx`
- `components/ContactFormFull.tsx`
- `components/ui/FadeIn.tsx`, `AnimatedCounter.tsx`, `GlowOrb.tsx`, `SectionLabel.tsx`, `TiltCard.tsx`
- `app/api/contact/route.ts`

---

## Performance Strategy

### Quality Tiers
```typescript
type QualityTier = 'high' | 'medium' | 'low';

// Detection logic:
// - Desktop + WebGL2 -> high
// - Mobile / tablet -> medium
// - Low GPU / old device -> low
```

| Setting | High | Medium | Low |
|---------|------|--------|-----|
| DPR | [1, 2] | [1, 1.5] | 1 |
| Particles (ambient) | 600 | 300 | 100 |
| Particles (section) | 400 | 200 | 80 |
| Post-processing | All effects | Bloom + Vignette + Noise | Vignette only |
| Antialiasing | Yes (MSAA 4x) | Yes (MSAA 2x) | No |
| Shader complexity | Full (noise + scanlines) | Simplified (noise only) | Basic (color only) |
| Instancing | Yes | Yes | Yes |
| Shadow maps | No (not needed) | No | No |

### Instancing Strategy
- All repeated geometry uses `<instancedMesh>`: CyberNodes, orbiting spheres, particles, portal elements
- Shared materials where possible (one CyberMaterial instance per scene)
- `useMemo` for temp Object3D in animation loops
- `needsUpdate = true` after matrix/color changes

### Mobile Detection
- `useQuality.ts` hook: checks `navigator.userAgent`, `window.matchMedia('(pointer: coarse)')`, WebGL2 support
- `PerformanceMonitor` from drei: auto-degrades on frame drops
- `AdaptiveDpr` + `AdaptiveEvents` from drei for runtime adjustment
- `frameloop: 'always'` on desktop, `frameloop: 'demand'` on low-tier mobile

### Expected Performance
- **Draw calls:** ~40-60 (down from ~87) thanks to instancing
- **Vertex count:** ~50,000-80,000 (up from ~35,000 but with instancing overhead)
- **Post-processing passes:** 5 on high, 3 on medium, 1 on low
- **Target FPS:** 60fps desktop, 30-60fps mobile

---

## Implementation Phases

### Phase 1: Foundation (files: 12)
> Set up the new architecture, shaders, materials, and environment

1. Create `components/three/shaders/` directory with all GLSL files
2. Create `components/three/shaders/index.ts` with raw string imports
3. Create `components/three/materials/CyberMaterial.tsx`
4. Create `components/three/materials/HologramMaterial.tsx`
5. Create `components/three/materials/GridFloorMaterial.tsx`
6. Create `components/three/materials/DataStreamMaterial.tsx`
7. Create `components/three/environment/GridFloor.tsx`
8. Create `components/three/environment/AmbientParticles.tsx`
9. Create `components/three/environment/SceneLighting.tsx`
10. Create `components/three/hooks/useQuality.ts`
11. Rewrite `components/three/CameraRig.tsx` with CatmullRomCurve3
12. Rewrite `components/three/Effects.tsx` with cyberpunk stack

### Phase 2: Geometric Primitives (files: 7)
> Build the reusable 3D building blocks

1. Create `components/three/geometric/CyberNode.tsx`
2. Create `components/three/geometric/DataStream.tsx`
3. Create `components/three/geometric/ServicePillar.tsx`
4. Create `components/three/geometric/PortalGateway.tsx`
5. Create `components/three/geometric/OrbitSystem.tsx`
6. Create `components/three/geometric/ConvergenceField.tsx`
7. Create `components/three/geometric/DestinationPlatform.tsx`

### Phase 3: Scene Rewrites (files: 8)
> Rebuild each section's 3D scene

1. Rewrite `components/three/scenes/HeroScene.tsx`
2. Rewrite `components/three/scenes/ServicesScene.tsx`
3. Rewrite `components/three/scenes/SegmentsScene.tsx`
4. Rewrite `components/three/scenes/ProblemsScene.tsx`
5. Rewrite `components/three/scenes/CaseStudiesScene.tsx`
6. Rewrite `components/three/scenes/WhyScene.tsx`
7. Rewrite `components/three/scenes/StatsScene.tsx`
8. Rewrite `components/three/scenes/ContactScene.tsx`

### Phase 4: Integration (files: 5)
> Wire everything together and clean up

1. Rewrite `components/three/ScrollCanvas.tsx` -- new orchestrator
2. Update `components/three/WebGLFallback.tsx` -- new fallback gradient
3. Delete dead code files (5 files)
4. Update `app/globals.css` -- new CSS variables
5. Update `tailwind.config.ts` -- new tokens if needed

### Phase 5: Polish & Optimize (files: 0-2)
> Performance tuning, mobile testing, visual polish

1. Test on desktop browsers (Chrome, Firefox, Safari)
2. Test on mobile devices (iOS Safari, Android Chrome)
3. Tune particle counts, bloom intensity, camera speed
4. Verify WebGL fallback works
5. Run `npm run lint` and `npm run build` to verify no errors
6. Add `next-themes` integration if desired (dark mode toggle -- optional)

---

## New Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `three-custom-shader-material` | latest | Extend MeshStandardMaterial with custom GLSL (optional -- only if PBR lighting needed on custom shaders) |

All other features use existing dependencies (`three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`).

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| GLSL shader compilation errors | Start with simple shaders, test incrementally. Use inline template strings |
| Mobile performance regression | Quality tiers + PerformanceMonitor. Test early on real devices |
| Camera path jank | Use 'centripetal' curve type for smoothest interpolation. Add damping |
| Post-processing too heavy on mobile | Gate behind quality tier. Disable Bloom/DoF on low |
| Scroll sync drift between HTML and 3D | Use drei's ScrollControls consistently. Don't mix Framer Motion scroll with drei scroll |
| Next.js SSR issues with Three.js | All 3D components are "use client" -- no SSR issues expected |

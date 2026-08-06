# Theme Redesign QA

Date: 2026-08-06

## Scope

- 12 Neumorphism: liquid-glass material system
- 25 Starry: editorial observatory
- 26 Astronaut: cinematic Apollo mission
- 27 Deepsea: photographic abyss expedition
- 30 Steampunk: industrial engine-room editorial
- 40 Cockpit: realistic automotive telemetry
- 64 Monet: French formal garden and impressionist editorial
- 66 Racer: CJC/66 driver brand with animated helmet visor

## Visual and interaction checks

- Reviewed every theme at 1440 x 900 and 375 x 812 in Chromium.
- Confirmed responsive stacking and no horizontal overflow at the mobile breakpoint.
- Confirmed real portfolio content, project cards, article cards, filters, contact forms, language controls, and the global theme switcher render in all eight themes.
- Confirmed English/Chinese switching and article filtering on representative themes.
- Confirmed no browser console or page errors during the desktop and mobile passes.
- Confirmed `prefers-reduced-motion` disables non-essential motion and leaves all content visible.
- Confirmed the Racer helmet visor sequence auto-plays, can be replayed, and overlays the driver portrait during its active state.

## Design assessment

- Each theme now has a distinct composition, typography, palette, image treatment, and motion language instead of a shared skin.
- The Astronaut and Deepsea themes use photographic depth and restrained overlays rather than decorative mock objects.
- The liquid-glass theme uses layered translucent surfaces, refraction color, soft specular edges, and accessible contrast.
- The Steampunk and Cockpit themes use real industrial and automotive photography to retain physical credibility.
- The Monet theme uses formal garden axes, terrace greens, warm stone, botanical blush, and editorial serif typography.
- The Racer theme uses an original lime/off-white motorsport system and a helmet/visor reveal inspired by the energy, not the layout or assets, of the reference site.

final result: passed

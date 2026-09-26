# DSP Avionics — Project handoff

## Current state

- Branch: `main`
- Site: Astro + Starlight, static output, Vietnamese-first DSP course.
- Package manager: `pnpm`.
- Production URL configured as `https://dsp.avionics.vn`.
- Interactive labs use `.astro` components and MDX pages under `src/content/docs/labs/`.

## Work included in this handoff

### FFT flow lab

- Component: `src/components/FFTFlowLab.astro`
- Page: `src/content/docs/labs/fft-flow.mdx`
- Route: `/labs/fft-flow/`
- Supports radix-2 DIT FFT sizes 4, 8 and 16.
- Supports symbolic input and compact numeric sequence input, including complex values.
- Main visualization is a full-width butterfly graph.
- Below the graph: DFT matrix expansion on the left and a square complex plane on the right.
- Graph branches, matrix coefficients and unit-circle twiddle points share selection IDs and highlight together.
- Clicking an output traces its complete dependency lineage.
- Direct DFT comparison is kept in a collapsed secondary section.

### Global documentation layout

- `public/site-shell.js` adds independent Menu and page-outline drawer buttons.
- Desktop sidebars are closed by default so learning content can use the full width.
- Global layout styles are in `src/styles/custom.css`.
- The script is loaded through the Starlight `head` configuration in `astro.config.mjs`.

### Collaboration resources

- `docs/EXTERNAL_MODULE_GUIDE.md`: minimal contract for an external AI or contributor.
- `templates/interactive-lab/`: reusable Astro component and MDX page templates.
- `AGENTS.md`: project conventions plus context/tool-output efficiency rules.

### Other uncommitted work included

- `src/components/RationalZSurfaceLab.astro`
- `src/content/docs/labs/ham-phan-so-huu-ti.mdx`

These files already contained ongoing improvements in the working tree and are intentionally preserved in this handoff.

## Architecture conventions

- Do not add a UI framework unless explicitly approved.
- Prefer SVG for diagrams and Canvas for frequently redrawn plots.
- Use KaTeX for mathematical notation.
- Use Starlight theme tokens; do not hard-code a dark-only palette.
- Scope component CSS locally. For elements inserted with `innerHTML`, use `<style is:global>` and prefix every selector with the component root class.
- Keep essential interactions accessible by click/tap and keyboard; do not rely on hover.
- Avoid fixed SVG `min-width` values that create page-level horizontal scrolling.

## Verification

Run from the repository root:

```bash
pnpm check
pnpm build
```

Manual smoke tests:

1. Open `/labs/fft-flow/` in light and dark themes.
2. Switch N between 4, 8 and 16.
3. Switch input between symbolic and numeric modes.
4. Enter a numeric sequence with exactly N values, including complex values such as `1+j`.
5. Click a graph output, matrix twiddle and complex-plane point; confirm synchronized highlighting.
6. Verify the Menu and page-outline drawers open and close on multiple pages.
7. Check mobile layout for page-level horizontal overflow.

## Known maintenance notes

- Astro currently emits upstream deprecation/module-directive warnings during build; `astro check` is clean.
- The FFT matrix becomes intrinsically wide for N=16 and is intentionally scrollable inside its own panel.
- Keep new lab pages under `src/content/docs/labs/`; Starlight generates their routes and sidebar entries automatically.

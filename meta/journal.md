# 📓 Architectural Decisions & Working Agreements

This is the project's living memory log. Any preference, styling choice, or corrected model error must be appended here.

---

## 🤝 Working Agreements

- **Component Instantiation**: When writing styling or structure, prioritize copying/extending base components directly from **Shadcn UI** styles rather than letting AI auto-generate components (which often yields bloated classes that require manual refactoring).
- **Responsive Breakpoints**: Always standardize on Tailwind's native breakpoint variables (`sm:`, `md:`, `lg:`) instead of forcing custom pixel ranges (e.g. `min-[400px]`).
- **Design System decoupling**: All core UI components must live in the decoupled `src/design-system` package, utilizing Radix Slot (`asChild` polymorphic button properties) and CVA for layout scaling and variant configurations.
- **API Simulation**: Avoid raw static JSON imports in pages. Consume metrics via the simulated async layer (`src/lib/metrics.ts`) with custom React hooks (`useMetric`) to support loading skeletons and mock latency.
- **Design Tokens Conformity**: Never use random utility classes or custom color/spacing overrides (e.g. `bg-neutral-100`, `text-[#333]`, or arbitrary layouts) that are not defined in the design system tokens. Always inspect `src/design-system/styles.css` and use unified semantic classes (like `fg-primary`, `st-surface-secondary`, or standardized spacing utilities).
- **No External Icon Libraries**: Do not install third-party icon libraries (e.g. `lucide-react`, `react-icons`). All vector assets must be implemented as clean custom React SVG components inside `src/design-system/components/icons`.
- **Keyboard Access & Semantic Landmarks**: Never use non-semantic elements (like `div`) for interactive actions. Always use the Design System's `<Button>` component (or `<Button asChild>` for links/router components) to ensure styling consistency and standard `:focus-visible` focus ring outlines. Use layout landmark tags (`<aside>`, `<nav>`, `<main>`, `<header>`, `<section>`) rather than generic wrapper `div`s.
- **Design System Portability & Dumb Components**: All components inside `src/design-system/` must be purely presentational ("dumb") with no side effects or API/router dependencies. They must communicate exclusively via relative imports (`../`, `./`) within the design system folder to keep the package 100% self-contained and extractable. App-level code must import components only through the central entrypoint (`import { Button } from "@/design-system"`).
- **No Inline Styles (Utility-First Principle)**: Avoid using inline `style={{ ... }}` blocks for layouts or components. All styling (margins, padding, colors, sizing) must be handled via Tailwind utility classes or custom variables in `styles.css`. The only exception is dynamic SVG math computations (such as positions inside Recharts graph wrappers).

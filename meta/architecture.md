# 🗺️ Topological Architecture Map

This file maps the codebase paths to their single responsibilities. Update this map during Phase 3 (DoD) if files are added, removed, or refactored.

---

## 📂 Source Code Map (`src/`)

### Core Application Entrypoints

- `src/main.tsx` - App boots, configures DOM mount, and sets up routing/root boundaries.
- `src/App.tsx` - Root app element, wraps layout and declares global routing views.
- `src/index.css` - Global Tailwind CSS stylesheet injection.

### Pages & Routing Views

- `src/pages/Overview.tsx` - Main landing page, displays metric cards, charts, and onboarding flows.

### Feature Components

- `src/components/MetricCard.tsx` - Handles metric presentation logic (states for loaded, loading, error, comparison trend labels).
- `src/components/OnboardingBanner.tsx` - Renders the onboarding progress bar and step item horizontal carousel with blur masks.

### Business Logic & Mock Data

- `src/lib/metrics.ts` - Decoupled data-fetching services (exposes simulated asynchronous API hooks for revenue/mrr/arr metric datasets).
- `src/lib/mockData.ts` - Generates randomized but realistic mock cohort datasets representing growth, errors, and incomplete states.
- `src/lib/revenue.json` - Static baseline mock data structure for standard metrics.
- `src/lib/revenue-comparison.json` - Static baseline mock data structure representing comparison metrics.

### 📐 Design System Package (`src/design-system/`)

- `src/design-system/index.ts` - Central export gateway for the design system components and styles.
- `src/design-system/styles.css` - Core design system stylesheet declaring `@theme` layout and token configurations (Tailwind v4 CSS-first configuration).
- `src/design-system/utils.ts` - Reusable styling utilities (e.g. `cn` class merger and `formatDate` helpers).

#### Design System Atomic Components

- `src/design-system/components/Avatar/` - Profile picture presentation component.
- `src/design-system/components/Button/` - Polymorphic button component (`asChild` supporting Slot-based node conversions) with standardized variants.
- `src/design-system/components/Card/` - Standardized content wrapper component supporting polymorphic HTML container elements (`as="li"`).
- `src/design-system/components/Chart/` - Custom charting wrappers encapsulating Recharts layers (XAxis, Area, Custom Tooltips, Grid).
- `src/design-system/components/Header/` - Top header navigation bar layout.
- `src/design-system/components/Layout/` - Main page-split dashboard frame layout.
- `src/design-system/components/Progress/` - Linear progress indicator powered by Radix primitives.
- `src/design-system/components/Sidebar/` - Navigation panel container (supports desktop expanding, mobile drawer, and dynamic navigation hover items).
- `src/design-system/components/Skeleton/` - Visual placeholder rendering while data load is active.
- `src/design-system/components/Tooltip/` - Standardized accessible popup overlays powered by Radix UI primitives.
- `src/design-system/components/icons/` - Vector graphics assets (Calendar, Arrow, Sidebar toggle, Burger, close drawer icons).

# Portfolio – Interactivity & Animation Improvements

A prioritised list of concrete things worth building. Ordered roughly by impact vs effort.

---

## 1. Tech Stack — Replace the card grid with a real graph

**Current state:** `StackGraph` is a click-to-dim card grid. The name says graph but there is no visual graph. The `x`/`y` fields on every node in `stack.ts` are defined but completely unused.

**What to build:** A canvas or SVG force-directed node graph.
- Each `StackNode` becomes a draggable circle with its label.
- `stackEdges` become animated SVG lines between them.
- Clicking a node highlights it and its edges, fades the rest — same logic as now but visually much more compelling.
- Use `d3-force` (lightweight, no full D3 needed) or a simple spring simulation with Framer Motion's `useSpring`.
- On mobile fall back to the current card grid (the data already supports both renderings).

**Why it works for your portfolio specifically:** It visually communicates that the tools are connected, not just a list — which matches the telemetry/systems aesthetic of the rest of the site.

---

## 2. Tech Stack — Proficiency rings per node

**Add to each node card (or graph node):** A small circular progress ring animated with `stroke-dashoffset` when the section enters the viewport.

Each `StackNode` in `stack.ts` could get a `proficiency: 0–100` field:

```ts
{ id: "python", proficiency: 85, ... }
{ id: "react",  proficiency: 60, ... }
```

The ring fills on scroll-in using a `whileInView` variant. Makes the grid immediately scannable — a recruiter sees Python at 85% before they read a single word.

---

## 3. TelemetryFeed — Live streaming effect

**Current state:** All entries fade in simultaneously with a small stagger.

**What to build:** On mount, reveal entries one by one with a ~300ms interval — as if log lines are actually streaming in. Each new line could have a brief "cursor blink" at the end before the next one appears.

```ts
// rough idea
const [visibleCount, setVisibleCount] = useState(0);
useEffect(() => {
  const t = setInterval(() => setVisibleCount(c => c + 1), 280);
  return () => clearInterval(t);
}, []);
```

Pairs well with the `ONLINE` pulse in the status bar. Makes the feed feel alive rather than static.

---

## 4. Navbar — Active section highlight

**Current state:** Nav links are plain anchors with no active state.

**What to build:** Use `IntersectionObserver` to track which section is currently in view and highlight the matching nav link.

```ts
// sections: ["projects", "stack", "timeline", "contact"]
// observe each section's root element, update active state
```

A subtle bottom border or colour change (`text-[#58A6FF]`) on the active link. Low effort, high polish — it tells the visitor where they are on a single-page scroll site.

---

## 5. Timeline — Animated draw-in line

**Current state:** The vertical line (`w-px bg-[#21262D]`) is always fully visible.

**What to build:** Replace it with a `motion.div` that starts at `scaleY: 0` (transform origin top) and animates to `scaleY: 1` as the section enters the viewport.

```tsx
<motion.div
  className="absolute left-[11px] sm:left-[19px] top-0 bottom-0 w-px bg-[#21262D] origin-top"
  initial={{ scaleY: 0 }}
  whileInView={{ scaleY: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 1.2, ease: "easeOut" }}
/>
```

The line "draws itself" downward as you scroll in. Each timeline dot then appears on top of it. Tiny change, big visual effect.

---

## 6. Project cards — Expandable terminal detail panel

**Current state:** Project cards are static — all content always visible.

**What to build:** Keep the card compact by default (name, status badge, one-line description). Add a "show details" toggle that expands an `AnimatePresence`-powered panel below showing the challenge, metrics, and stack.

The panel interior could be styled as a terminal block:

```
> project.getDetails("journey-blog")
  challenge: ...
  metrics:   { files: 12, components: 8 }
  stack:     [ "Next.js", "Supabase", "TypeScript" ]
```

Monospace font, `#3FB950` prompt character. Fits the aesthetic and lets you pack more projects into the grid without visual clutter.

---

## 7. Hero canvas — Cursor reactivity

**Current state:** `PipelineCanvas` nodes move on their own, ignoring the mouse.

**What to build:** Track `mousemove` on the section and apply a weak gravitational pull — nearby nodes drift slightly toward the cursor position.

```ts
// in draw loop:
for (const node of nodes) {
  const dx = mouseX - node.x;
  const dy = mouseY - node.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 120) {
    node.vx += dx * 0.00015;
    node.vy += dy * 0.00015;
  }
}
```

Subtle enough to not distract but makes the hero feel responsive to presence. Works only on desktop (skip on `pointerType === "touch"`).

---

## 8. Scroll progress bar

**One component, whole site benefit.** A 2px line at the very top of the viewport that fills left-to-right as the user scrolls.

```tsx
// in layout.tsx
"use client";
const [progress, setProgress] = useState(0);
useEffect(() => {
  const handler = () => {
    const el = document.documentElement;
    setProgress(el.scrollTop / (el.scrollHeight - el.clientHeight));
  };
  window.addEventListener("scroll", handler, { passive: true });
  return () => window.removeEventListener("scroll", handler);
}, []);

return (
  <div
    className="fixed top-0 left-0 h-[2px] bg-[#1F6FEB] z-[100] origin-left"
    style={{ transform: `scaleX(${progress})` }}
  />
);
```

---

## 9. Contact — Copy-to-clipboard email

**Current state:** Email is just an `<a href="mailto:...">` link.

**What to build:** Add a copy icon button next to the email address. On click, copy to clipboard and briefly show a `"Copied!"` tooltip using `AnimatePresence`.

```tsx
const [copied, setCopied] = useState(false);
function copy() {
  navigator.clipboard.writeText("Dries.Van.den.Brande@proton.me");
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
}
```

Small QoL detail that makes the contact section feel interactive.

---

## 10. Stack — Category filter tabs

**Current state:** All stack nodes are shown at once; the legend is read-only.

**What to build:** Make the legend dots into filter buttons. Clicking a category filters the grid to only that category using `AnimatePresence` + `layout` prop so cards smoothly reflow.

```tsx
<motion.div layout key={node.id} exit={{ opacity: 0, scale: 0.9 }}>
  <NodeCard ... />
</motion.div>
```

"All" resets to the full grid. Works alongside the click-to-highlight behaviour already built.

---

## Priority order (impact vs effort)

| # | Item | Effort | Impact |
|---|------|--------|--------|
| 1 | Force-directed stack graph | High | Very high |
| 5 | Timeline draw-in line | Very low | High |
| 4 | Navbar active section | Low | High |
| 3 | TelemetryFeed streaming | Low | High |
| 2 | Proficiency rings | Medium | Medium |
| 8 | Scroll progress bar | Very low | Medium |
| 9 | Copy email | Very low | Medium |
| 10 | Stack category filter tabs | Low | Medium |
| 6 | Project card terminal panel | Medium | Medium |
| 7 | Hero cursor reactivity | Medium | Low–Medium |

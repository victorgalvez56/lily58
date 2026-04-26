import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LAYERS, type KeyDef, type LayerData } from "./keymap";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

// ── keyboard renderer ─────────────────────────────

function keyClass(k: KeyDef): string {
  const base = "key";
  if (!k.type) return base;
  return `${base} ${k.type}`;
}

function makeKey(k: KeyDef, extra = ""): HTMLElement {
  const el = document.createElement("div");
  el.className = keyClass(k) + (extra ? ` ${extra}` : "");
  el.dataset.label = k.label;
  el.textContent = k.label;
  return el;
}

function buildKeyboard(layer: LayerData): HTMLElement {
  const wrap = document.createElement("div");

  // ── rows 0-3 (main keys) ───────────────────────
  for (let row = 0; row < 4; row++) {
    const rowEl = document.createElement("div");
    rowEl.className = "kb-main-row";

    // left 6 keys
    layer.leftMain[row].forEach((k) => rowEl.appendChild(makeKey(k)));

    // gap between halves
    const gap = document.createElement("div");
    gap.className = "kb-gap";

    // row 3: inner staggered keys sit in the gap area
    if (row === 3) {
      const innerL = makeKey(layer.leftInner, "half");
      const innerR = makeKey(layer.rightInner, "half");
      gap.style.display = "flex";
      gap.style.alignItems = "center";
      gap.style.gap = "6px";
      gap.style.width = "auto";
      gap.appendChild(innerL);
      gap.appendChild(innerR);
    }
    rowEl.appendChild(gap);

    // right 6 keys
    layer.rightMain[row].forEach((k) => rowEl.appendChild(makeKey(k)));

    wrap.appendChild(rowEl);
  }

  // ── thumb row ──────────────────────────────────
  const thumbRow = document.createElement("div");
  thumbRow.className = "kb-thumb-row";

  const thumbL = document.createElement("div");
  thumbL.className = "kb-thumb-left";
  layer.leftThumb.forEach((k) => thumbL.appendChild(makeKey(k)));

  const thumbR = document.createElement("div");
  thumbR.className = "kb-thumb-right";
  layer.rightThumb.forEach((k) => thumbR.appendChild(makeKey(k)));

  thumbRow.appendChild(thumbL);
  thumbRow.appendChild(thumbR);
  wrap.appendChild(thumbRow);

  return wrap;
}

// ── layer switching ───────────────────────────────

const kbWrap = document.getElementById("keyboard-wrap")!;
const caption = document.getElementById("layer-caption")!;
let currentLayer = 0;

function renderLayer(layerIdx: number, animate = true) {
  const layer = LAYERS[layerIdx];

  if (!animate) {
    kbWrap.innerHTML = "";
    kbWrap.appendChild(buildKeyboard(layer));
    caption.textContent = layer.caption;
    return;
  }

  const keys = kbWrap.querySelectorAll<HTMLElement>(".key");

  gsap.to(keys, {
    y: -6,
    autoAlpha: 0,
    duration: 0.18,
    stagger: { amount: 0.12, from: "random" },
    ease: "power2.in",
    onComplete: () => {
      kbWrap.innerHTML = "";
      const newBoard = buildKeyboard(layer);
      kbWrap.appendChild(newBoard);
      caption.textContent = layer.caption;

      gsap.from(kbWrap.querySelectorAll(".key"), {
        y: 8,
        autoAlpha: 0,
        duration: 0.25,
        stagger: { amount: 0.18, from: "start" },
        ease: "power2.out",
      });
    },
  });
}

// Initial render (no animation)
renderLayer(0, false);

// Tabs
document.querySelectorAll<HTMLButtonElement>(".ltab").forEach((btn) => {
  btn.addEventListener("click", () => {
    const idx = parseInt(btn.dataset.layer ?? "0", 10);
    if (idx === currentLayer) return;
    currentLayer = idx;

    document.querySelectorAll(".ltab").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderLayer(idx);
  });
});

// ── video sound toggle ────────────────────────────

const video = document.getElementById("build-video") as HTMLVideoElement;
const soundBtn = document.getElementById("sound-btn")!;
const soundLabel = document.getElementById("sound-label")!;
const muteSlash = document.getElementById("mute-slash")!;

soundBtn.addEventListener("click", () => {
  video.muted = !video.muted;
  soundLabel.textContent = video.muted ? "Unmute" : "Mute";
  muteSlash.style.display = video.muted ? "" : "none";
});

// ── scroll animations ─────────────────────────────

// article header
gsap.set([".article-meta", ".article-title", ".article-lead", ".article-chips"],
  { y: 24, autoAlpha: 0 }
);
gsap.timeline({ delay: 0.1, defaults: { ease: "power3.out" } })
  .to(".article-meta",  { y: 0, autoAlpha: 1, duration: 0.5 })
  .to(".article-title", { y: 0, autoAlpha: 1, duration: 0.75 }, "-=0.25")
  .to(".article-lead",  { y: 0, autoAlpha: 1, duration: 0.65 }, "-=0.45")
  .to(".article-chips", { y: 0, autoAlpha: 1, duration: 0.5  }, "-=0.35");

// build figure
gsap.set(".build-figure", { y: 40, autoAlpha: 0 });
gsap.to(".build-figure", {
  y: 0, autoAlpha: 1, duration: 0.9, ease: "power2.out",
  scrollTrigger: { trigger: ".build-figure", start: "top 85%" },
});
gsap.fromTo(".build-video", { scale: 0.97 }, {
  scale: 1, duration: 1.2, ease: "power2.out",
  scrollTrigger: { trigger: ".build-figure", start: "top 85%" },
});

// prose sections
document.querySelectorAll(".prose-section").forEach((sec) => {
  gsap.set(sec, { y: 30, autoAlpha: 0 });
  gsap.to(sec, {
    y: 0, autoAlpha: 1, duration: 0.75, ease: "power2.out",
    scrollTrigger: { trigger: sec, start: "top 84%" },
  });
});

// keymap section
gsap.set("#keymap-section .keymap-header", { y: 24, autoAlpha: 0 });
gsap.to("#keymap-section .keymap-header", {
  y: 0, autoAlpha: 1, duration: 0.65, ease: "power2.out",
  scrollTrigger: { trigger: "#keymap-section", start: "top 82%" },
});
gsap.set([".layer-tabs", ".layer-caption", ".keyboard-wrap", ".keyboard-legend"],
  { y: 20, autoAlpha: 0 }
);
gsap.timeline({
  scrollTrigger: { trigger: "#keymap-section", start: "top 80%" },
  defaults: { ease: "power2.out" },
})
  .to(".layer-tabs",      { y: 0, autoAlpha: 1, duration: 0.5 }, 0.15)
  .to(".layer-caption",   { y: 0, autoAlpha: 1, duration: 0.4 }, 0.25)
  .to(".keyboard-wrap",   { y: 0, autoAlpha: 1, duration: 0.65 }, 0.3)
  .to(".keyboard-legend", { y: 0, autoAlpha: 1, duration: 0.5 }, 0.5);

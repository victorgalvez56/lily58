<div align="center">

# Lily58 RGB MX

> *58 keys. 200 solder points. One dead LED chain.*

Hand-soldered split keyboard built from a bare PandaKB kit. RP2040 microcontrollers, SK6812MINI-E per-key RGB, hotswap MX sockets, dual rotary encoders, and a custom 4-layer QMK + Vial firmware adapted from a ZSA Moonlander layout.

[**Build log →**](https://lily58.victorgalvez.dev)

![Lily58 RGB MX — first light](docs/preview.gif)

[![QMK](https://img.shields.io/badge/QMK-Vial-FF2E4D.svg)](https://get.vial.today)
[![MCU](https://img.shields.io/badge/MCU-RP2040-555555.svg)](https://www.raspberrypi.com/products/rp2040)
[![Switches](https://img.shields.io/badge/Switches-MX_hotswap-888888.svg)](#)

</div>

---

## Overview

The [Lily58 RGB MX by PandaKB](https://pandakb.com/guides/lily58-rgb-mx-build-guide/) is a 58-key column-staggered split keyboard with per-key RGB and a wired (TRRS) split connection. Both halves run independent RP2040 microcontrollers. I built this to address RSI symptoms from long coding sessions — a split board keeps both hands at shoulder width with neutral wrists.

The full interactive build log with a live keymap visualizer is at [lily58.victorgalvez.dev](https://lily58.victorgalvez.dev).

## Bill of materials

| Component | Qty | Notes |
|---|---|---|
| Diodes | 58 | Stripe direction must match PCB silkscreen |
| Per-key LEDs | 58 | SK6812MINI-E — face up, toward keycaps |
| Underglow LEDs | 12 | WS2812B-5050 — face down, toward PCB |
| Hotswap sockets | 58 | MX |
| Rotary encoders | 2 | EC11 |
| MCU | 2 | RP2040 ProMicro, one per half |
| OLED modules | 2 | 0.91" |
| TRRS jacks | 2 | Wired configuration |
| Other | — | Reset switches, header pins/sockets, USBLC6-2SC6, resistors |

## Build order

Follow this order — desoldering on a dense board is painful.

1. **Diodes** — match stripe direction to silkscreen. Do these first on a clear board.
2. **Per-key LEDs (SK6812MINI-E)** — face up, align the notch. Under 3 seconds per LED or you'll lift pads.
3. **Underglow LEDs (WS2812B-5050)** — face down. Same notch-alignment rule.
4. **Hotswap sockets** — straightforward; ensure both pads wet properly.
5. **USBLC6-2SC6 & resistors** — bottom side, wired config. Protects the USB data lines.
6. **MCU (RP2040)** — chip face down, leave two top holes open. Trim protruding pins. Handle the USB port with care — it's the most fragile part.
7. **Reset switch → OLED → TRRS jack → encoders** — in that order.

## The bug: all 70 LEDs went dark

WS2812-type LEDs run as a single daisy chain — data flows LED 1 → 2 → 3 → … → 70. One bad joint on LED #1 and every downstream LED gets no signal and stays dark.

After full assembly the entire RGB matrix was dead. A multimeter traced the break to the first LED in the chain. Reflowed the joint — all 70 came back on.

> If your RGB matrix is fully dead, reflow LED #1 before replacing anything.

## Firmware

Running [Vial](https://get.vial.today) on top of QMK, targeting `pandakb/lily58_rgb_mx`. Vial adds a live USB remap GUI — rearrange any key without recompiling or reflashing.

Config source: [`lily58-config`](https://github.com/victorgalvez56/lily58-config)

Flash by holding the reset button while plugging in each half — the RP2040 mounts as a USB drive, drop the `.uf2` onto it.

## Keymap

4 layers. Full interactive visualizer at [lily58.victorgalvez.dev](https://lily58.victorgalvez.dev).

| Layer | Name | Purpose |
|---|---|---|
| 0 | Default | QWERTY base — home-row mods, adapted from ZSA Moonlander |
| 1 | Symbols | Programming symbols on home row, F-keys, numpad |
| 2 | Mouse + Media | Cursor, scroll, volume, media transport |
| 3 | Gaming | Flat WASD, right half inactive for mouse |

**Encoders:** Left = volume up/down · Right = scroll up/down

## Tools

| Tool | Notes |
|---|---|
| Soldering iron | Temperature-adjustable — 300–350 °C |
| Solder wire | 60%+ tin |
| Fine tweezers | Antistatic, for SMD components |
| Multimeter | Essential for debugging LED chains |
| Solder paste | Optional — helps with LEDs and diodes |

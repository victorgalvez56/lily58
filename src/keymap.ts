export type KeyDef = { label: string; type?: "mod" | "layer" | "empty" | "rgb" | "fn" };

const E = (label = "—"): KeyDef => ({ label, type: "empty" });
const M = (label: string): KeyDef => ({ label, type: "mod" });
const L = (label: string): KeyDef => ({ label, type: "layer" });
const F = (label: string): KeyDef => ({ label, type: "fn" });
const R = (label: string): KeyDef => ({ label, type: "rgb" });
const K = (label: string): KeyDef => ({ label });

export type LayerData = {
  id: number;
  name: string;
  caption: string;
  leftMain: KeyDef[][];   // 4 rows × 6 cols
  leftInner: KeyDef;       // staggered inner key (row 3)
  leftThumb: KeyDef[];     // 4 keys
  rightMain: KeyDef[][];  // 4 rows × 6 cols
  rightInner: KeyDef;
  rightThumb: KeyDef[];
};

export const LAYERS: LayerData[] = [
  {
    id: 0,
    name: "Default",
    caption: "QWERTY base — adapted from ZSA Moonlander",
    leftMain: [
      [M("ESC"),  K("1"),  K("2"),  K("3"),  K("4"),  K("5")],
      [M("TAB"),  K("Q"),  K("W"),  K("E"),  K("R"),  K("T")],
      [M("BKSP"), K("A"),  K("S"),  K("D"),  K("F"),  K("G")],
      [M("SHFT"), K("Z"),  K("X"),  K("C"),  K("V"),  K("B")],
    ],
    leftInner: K("["),
    leftThumb: [M("ALT"), M("GUI"), L("SYM"), K("SPC")],
    rightMain: [
      [K("6"),  K("7"),  K("8"),  K("9"),  K("0"),  K("-")],
      [K("Y"),  K("U"),  K("I"),  K("O"),  K("P"),  K("=")],
      [K("H"),  K("J"),  K("K"),  K("L"),  K("+"),  M("GUI/'")],
      [K("N"),  K("M"),  K(","),  K("."),  K("/"),  M("SHFT")],
    ],
    rightInner: K("]"),
    rightThumb: [K("ENT"), L("MOD"), M("BKSP"), M("CTRL")],
  },
  {
    id: 1,
    name: "Symbols",
    caption: "Programming symbols on home row + F-keys + numpad",
    leftMain: [
      [M("ESC"), F("F1"), F("F2"), F("F3"),  F("F4"),  F("F5")],
      [K("?"),   K("!"),  K("@"),  K("{"),   K("}"),   K("|")],
      [K('"'),   K("#"),  K("$"),  K("("),   K(")"),   K("~")],
      [E(),      K("%"),  K("^"),  K("["),   K("]"),   K("<")],
    ],
    leftInner: L("TG2"),
    leftThumb: [E(), E(), E(), R("RGB−")],
    rightMain: [
      [F("F6"), F("F7"), F("F8"), F("F9"), F("F10"), F("F11")],
      [K("↑"),  K("7"),  K("8"),  K("9"),  K("*"),   F("F12")],
      [K(";"),  K("`"),  K("+"),  K("-"),  K("_"),   E()],
      [K(">"),  K("&"),  K("2"),  K("3"),  K("\\"),  E()],
    ],
    rightInner: L("TG3"),
    rightThumb: [R("RGB+"), L("MO3"), E(), R("TOG")],
  },
  {
    id: 2,
    name: "Mouse + Media",
    caption: "Cursor, scroll, media controls and volume",
    leftMain: [
      [E(), E(), E(),     E(), E(), E()],
      [E(), E(), K("M↑"), E(), E(), E()],
      [E(), K("M←"), K("M↓"), K("M→"), E(), E()],
      [E(), E(), E(), E(), E(), E()],
    ],
    leftInner: E(),
    leftThumb: [M("BTN1"), K("SCR↓"), L("MO3"), E()],
    rightMain: [
      [E(), E(), E(),      E(),      E(),  M("BOOT")],
      [E(), E(), E(),      E(),      E(),  E()],
      [E(), E(), E(),      E(),      E(),  K("PLAY")],
      [E(), E(), K("PRV"), K("NXT"), E(),  E()],
    ],
    rightInner: E(),
    rightThumb: [E(), E(), K("VOL+"), K("VOL−")],
  },
  {
    id: 3,
    name: "Gaming",
    caption: "Flat WASD layout — right half inactive, right hand on mouse",
    leftMain: [
      [E(),      K("1"), K("2"), K("3"), K("4"), K("5")],
      [E(),      K("Q"), K("W"), K("E"), K("R"), K("T")],
      [E(),      K("A"), K("S"), K("D"), K("F"), K("G")],
      [E(),      K("Z"), K("X"), K("C"), K("V"), K("B")],
    ],
    leftInner: E(),
    leftThumb: [M("ALT"), K("X"), K("Z"), K("SPC")],
    rightMain: [
      [E(), E(), E(), E(), E(), E()],
      [E(), E(), E(), E(), E(), E()],
      [E(), E(), E(), E(), E(), E()],
      [E(), E(), E(), E(), E(), E()],
    ],
    rightInner: E(),
    rightThumb: [E(), E(), E(), E()],
  },
];

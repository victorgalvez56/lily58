/* Copyright 2020 Josef Adamcik
 * Modification for VIA support and RGB underglow by Jens Bonk-Wiltfang
 * Modification for Vial support by Drew Petersen
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// clang-format off

#include QMK_KEYBOARD_H

#ifdef OLED_ENABLE
#include "oled.c" 
#endif

#define _______ KC_NO

// Moonlander layout adapted for Lily58 by Victor

const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {

// Layer 0: Default
[0] = LAYOUT(
  KC_ESC , KC_1   , KC_2   , KC_3   , KC_4   , KC_5   ,                   KC_6   , KC_7   , KC_8   , KC_9   , KC_0   , KC_MINS,
  KC_TAB , KC_Q   , KC_W   , KC_E   , KC_R   , KC_T   ,                   KC_Y   , KC_U   , KC_I   , KC_O   , KC_P   , KC_EQL ,
  KC_BSPC, KC_A   , KC_S   , KC_D   , KC_F   , KC_G   ,                   KC_H   , KC_J   , KC_K   , KC_L   , KC_PLUS, MT(MOD_LGUI, KC_QUOT),
  KC_LSFT, KC_Z   , KC_X   , KC_C   , KC_V   , KC_B   , KC_LBRC, KC_RBRC, KC_N   , KC_M   , KC_COMM, KC_DOT , KC_SLSH, KC_RSFT,
                             KC_LALT, KC_LGUI, MO(1)  , KC_SPC , KC_ENT , MO(2)  , KC_BSPC, KC_LCTL
),

// Layer 1: Symbols + Numpad + F-keys
[1] = LAYOUT(
  KC_ESC , KC_F1  , KC_F2  , KC_F3  , KC_F4  , KC_F5  ,                   KC_F6  , KC_F7  , KC_F8  , KC_F9  , KC_F10 , KC_F11 ,
  KC_QUES, KC_EXLM, KC_AT  , KC_LCBR, KC_RCBR, KC_PIPE,                   KC_UP  , KC_7   , KC_8   , KC_9   , KC_ASTR, KC_F12 ,
  KC_DQUO, KC_HASH, KC_DLR , KC_LPRN, KC_RPRN, KC_TILD,                   KC_SCLN, KC_GRV , KC_PLUS, KC_MINS, KC_UNDS, _______,
  _______, KC_PERC, KC_CIRC, KC_LBRC, KC_RBRC, KC_LABK, TG(2)  , TG(3)  , KC_RABK, KC_AMPR, KC_2   , KC_3   , KC_BSLS, _______,
                             _______, _______, _______, RGB_VAD, RGB_VAI, MO(3)  , _______, RGB_TOG
),

// Layer 2: Mouse + Media
[2] = LAYOUT(
  _______, _______, _______, _______, _______, _______,                   _______, _______, _______, _______, _______, QK_BOOT,
  _______, _______, KC_MS_U, _______, _______, _______,                   _______, _______, _______, _______, _______, _______,
  _______, KC_MS_L, KC_MS_D, KC_MS_R, _______, _______,                   _______, _______, _______, _______, _______, KC_MPLY,
  _______, _______, _______, _______, _______, _______, _______, _______, _______, _______, KC_MPRV, KC_MNXT, _______, _______,
                             KC_BTN1, KC_WH_D, MO(3)  , _______, _______, _______, KC_VOLU, KC_VOLD
),

// Layer 3: Gaming
[3] = LAYOUT(
  _______, KC_1   , KC_2   , KC_3   , KC_4   , KC_5   ,                   _______, _______, _______, _______, _______, _______,
  _______, KC_Q   , KC_W   , KC_E   , KC_R   , KC_T   ,                   _______, _______, _______, _______, _______, _______,
  _______, KC_A   , KC_S   , KC_D   , KC_F   , KC_G   ,                   _______, _______, _______, _______, _______, _______,
  _______, KC_Z   , KC_X   , KC_C   , KC_V   , KC_B   , _______, _______, _______, _______, _______, _______, _______, _______,
                             KC_LALT, KC_X   , KC_Z   , KC_SPC , _______, _______, _______, _______
)
};

const uint16_t PROGMEM encoder_map[][NUM_ENCODERS][2] = {
    [0] = { ENCODER_CCW_CW(KC_VOLD, KC_VOLU), ENCODER_CCW_CW(KC_PGUP, KC_PGDN) },
    [1] = { ENCODER_CCW_CW(RGB_HUD, RGB_HUI), ENCODER_CCW_CW(RGB_SAD, RGB_SAI) },
    [2] = { ENCODER_CCW_CW(KC_TRNS, KC_TRNS), ENCODER_CCW_CW(KC_TRNS, KC_TRNS) },
    [3] = { ENCODER_CCW_CW(KC_TRNS, KC_TRNS), ENCODER_CCW_CW(KC_TRNS, KC_TRNS) },
};

void keyboard_post_init_user(void) {
  rgb_matrix_enable();
}

bool process_record_user(uint16_t keycode, keyrecord_t *record) {
  if (record->event.pressed) {
#ifdef OLED_ENABLE
    set_keylog(keycode, record);
#endif
  }
  return true;
}


import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CHANGE_STYLES,
  APPLY_STYLES, CHANGE_TITLE, UPDATE_DATE,
} from "@/store/types";

export function tableResize(payload) {
  return {
    type: TABLE_RESIZE,
    payload,
  };
}

export function changeText(payload) {
  return {
    type: CHANGE_TEXT,
    payload,
  };
}

export function updateDate() {
  return { type: UPDATE_DATE };
}

export function changeStyles(payload) {
  return {
    type: CHANGE_STYLES,
    payload,
  };
}

// value, ids
export function applyStyles(payload) {
  return {
    type: APPLY_STYLES,
    payload,
  };
}

export function changeTitle(payload) {
  return {
    type: CHANGE_TITLE,
    payload,
  };
}

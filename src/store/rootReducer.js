// eslint-disable-next-line max-len
import { TABLE_RESIZE, CHANGE_TEXT, CHANGE_STYLES, APPLY_STYLES, CHANGE_TITLE } from "./types";

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE: {
      const cellStateName = action.payload.type === "column"
          ? "colState"
          : "rowState";
      const cellState = state[cellStateName] ?? {};
      cellState[action.payload.id] = action.payload.value;

      return {
        ...state,
        [cellStateName]: { ...cellState },
      };
    }
    case CHANGE_TEXT: {
      return {
        ...state,
        currentText: action.payload.text,
        dataState: {
          ...state.dataState,
          [action.payload.id]: action.payload.text,
        },
      };
    }
    case CHANGE_STYLES: {
      return { ...state, currentStyles: action.payload };
    }
    case APPLY_STYLES: {
      const styles = state["stylesState"] ?? {};
      action.payload.ids.forEach((id) => {
        styles[id] = { ...styles[id], ...action.payload.value };
      });
      return {
        ...state,
        stylesState: styles,
        currentStyles: { ...state.currentStyles, ...action.payload.value },
      };
    }
    case CHANGE_TITLE: {
      return { ...state, title: action.payload };
    }
    default: {
      return state;
    }
  }
}

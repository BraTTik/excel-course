import { defaultStyles, defaultTitle } from "@/constants.ts";

const defaultState = {
  colState: {},
  stylesState: {},
  rowState: {},
  currentText: "",
  dataState: {},
  currentStyles: defaultStyles,
  title: defaultTitle,
  openedDate: new Date().toJSON(),
};

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: "",
});

export const normalizeInitialState = (state) => {
  return state ? normalize(state) : defaultState;
};

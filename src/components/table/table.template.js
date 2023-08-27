import { toInlineStyles } from "@core/utils";
import { defaultStyles } from "@/constants.ts";
import { parse } from "@core/parse";

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 20;

function getWidth(state, index) {
  return (state.colState[index] || DEFAULT_WIDTH) + "px";
}

function getHeight(state, index) {
  return (state.rowState[index] || DEFAULT_HEIGHT) + "px";
}

function getCellData(state, id) {
  return state.dataState[id] ?? "";
}

export const colsCount = () => CODES.Z - CODES.A + 1;

const createCell = (row, state) => (_, col) => {
  const width = getWidth(state, col);
  const id = `${row}:${col}`;
  const data = getCellData(state, id);

  const styles = toInlineStyles({ ...defaultStyles, ...state.stylesState[id] });

  return `
    <div
        class="cell"
        data-col="${col}"
        data-id="${id}"
        data-type="cell"
        data-value="${data ?? ""}"
        style="width: ${width};${styles};"
        contenteditable>
        ${parse(data) ?? ""}
    </div>
  `;
};


const createColumn = (state) => (content, index) => {
  const width = getWidth(state, index);

  return `
      <div
      class="column"
      data-type="resizable"
      data-col="${index}"
      style="width: ${width}">
          ${content}
          <div class="col-resize" data-resize="column"></div>
      </div>
  `;
};

const createRow = (content, index, state) => {
  const resizer = index
      ? "<div class=\"row-resize\" data-resize=\"row\"></div>"
      : "";
  const height = index ? getHeight(state, index) : DEFAULT_HEIGHT + "px";
  return `
    <div
    class="row"
    data-type="resizable"
    data-row="${index}"
    style="height: ${height}">
        <div class="row-info">
            ${index ? index : ""}
            ${resizer}
        </div>
        <div class="row-data">${content}</div>
    </div>
  `;
};

const toChar = (_, index) => String.fromCharCode(CODES.A + index);

export function createTable(rowsCount = 15, state) {
  const columnsCount = colsCount();

  const rows = [];

  const cols = new Array(columnsCount)
      .fill("")
      .map(toChar)
      .map(createColumn(state))
      .join("");

  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(columnsCount)
        .fill("")
        .map(createCell(row, state))
        .join("");

    rows.push(createRow(cells, row + 1, state));
  }

  return rows.join("");
}

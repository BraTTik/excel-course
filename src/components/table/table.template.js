const CODES = {
  A: 65,
  Z: 90,
};

export const colsCount = () => CODES.Z - CODES.A + 1;

const createCell = (row) => (_, col) => {
  return `
    <div
        class="cell"
        data-col="${col}"
        data-id="${row}:${col}"
        data-type="cell"
        contenteditable>
    </div>
  `;
};

const createColumn = (content, index) => {
  return `
      <div class="column" data-type="resizable" data-col="${index}">
          ${content}
          <div class="col-resize" data-resize="column"></div>
      </div>
  `;
};

const createRow = (content, index) => {
  const resizer = index
      ? "<div class=\"row-resize\" data-resize=\"row\"></div>"
      : "";

  return `
    <div class="row" data-type="resizable">
        <div class="row-info">
            ${index ? index : ""}
            ${resizer}
        </div>
        <div class="row-data">${content}</div>
    </div>
  `;
};

const toChar = (_, index) => String.fromCharCode(CODES.A + index);

export function createTable(rowsCount = 15) {
  const columnsCount = colsCount();

  const rows = [];

  const cols = new Array(columnsCount)
      .fill("")
      .map(toChar)
      .map(createColumn)
      .join("");

  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(columnsCount)
        .fill("")
        .map(createCell(row))
        .join("");

    rows.push(createRow(cells, row + 1));
  }

  return rows.join("");
}

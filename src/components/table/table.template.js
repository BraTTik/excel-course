const CODES = {
  A: 65,
  Z: 90,
};

const createCell = (_, col) => {
  return `
    <div class="cell" data-col="${col}" contenteditable>
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
  const colsCount = CODES.Z - CODES.A + 1;

  const rows = [];

  const cols = new Array(colsCount)
      .fill("")
      .map(toChar)
      .map(createColumn)
      .join("");

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill("")
        .map(createCell)
        .join("");

    rows.push(createRow(cells, i + 1));
  }

  return rows.join("");
}

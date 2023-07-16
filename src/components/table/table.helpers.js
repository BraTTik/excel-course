import { range } from "@core/utils";

export function shouldResize(event) {
  return Boolean(event.target.dataset.resize);
}

export function isCell(event) {
  return event.target.dataset.type === "cell";
}

export function matrix(target, current) {
  const columns = range(current.col, target.col);
  const rows = range(current.row, target.row);

  return columns.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export function nextSelector(key, id, { maxRows, maxColumns }) {
  const MIN = 0;
  let { row, col } = id;
  switch (key) {
    case "Enter":
    case "ArrowDown": {
      row++;
      break;
    }
    case "Tab":
    case "ArrowRight": {
      col++;
      break;
    }
    case "ArrowLeft": {
      col--;
      break;
    }
    case "ArrowUp": {
      row--;
      break;
    }
  }

  row = Math.min(Math.max(MIN, row), maxRows - 1);
  col = Math.min(Math.max(MIN, col), maxColumns - 1);

  return `[data-id="${row}:${col}"]`;
}

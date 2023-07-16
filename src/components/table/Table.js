import { ExcelComponent } from "@core/ExcelComponent";
import { createTable, colsCount } from "./table.template";
import { tableResize } from "./table.resize";
import { isCell, matrix, shouldResize, nextSelector } from "./table.helpers";
import { TableSelection } from "./TableSelection";
import { $ } from "@core/dom";

export class Table extends ExcelComponent {
  static className = "excel__table";
  static rowsCount = 50;

  constructor($root, options = {}) {
    super($root, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input"],
      ...options,
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find("[data-id=\"0:0\"]");
    this.selectCell($cell);

    this.$on("formula:input", (text) => {
      this.selection.current.text(text);
    });

    this.$on("formula:enter", () => {
      this.selection.current.focus();
    });
  }

  toHTML() {
    return createTable(Table.rowsCount);
  }

  onMousedown = (event) => {
    if (shouldResize(event)) {
      tableResize(this.$root)(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const target = $target.id(true);
        const current = this.selection.current.id(true);

        const $cells = matrix(target, current)
            .map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
        this.$emit("table:select", $target);
      }
    }
  };

  onKeydown = (event) => {
    const keys =
        [
          "Enter",
          "Tab",
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
        ];

    const { key } = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      this.nextCell(key);
    }
  };

  nextCell = (key) => {
    const id = this.selection.current.id(true);
    const max = { maxRows: Table.rowsCount, maxColumns: colsCount() };
    const $next = this.$root.find(nextSelector(key, id, max));
    this.selectCell($next);
  };

  onInput = (event) => {
    this.$emit("table:input", $(event.target));
  };

  selectCell = ($cell) => {
    this.selection.select($cell);
    this.$emit("table:select", $cell);
  };
}

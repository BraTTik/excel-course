import { ExcelComponent } from "@core/ExcelComponent";
import { createTable, colsCount } from "./table.template";
import { tableResize } from "./table.resize";
import { isCell, matrix, shouldResize, nextSelector } from "./table.helpers";
import { TableSelection } from "./TableSelection";
import { $ } from "@core/dom";
import * as actions from "@/store/actions";
import { defaultStyles } from "@/constants.ts";
import { changeStyles } from "@/store/actions";
import { parse } from "@core/parse";

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

    this.$on("formula:input", (value) => {
      const text = parse(value);

      this.selection.current
          .attr("data-value", value)
          .text(text);
      this.updateTextStore(value);
    });

    this.$on("formula:enter", () => {
      this.selection.current.focus();
    });

    this.$on("toolbar:applyStyle", (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(
          actions.applyStyles({ value, ids: this.selection.selectedIds })
      );
    });
  }

  toHTML() {
    return createTable(Table.rowsCount, this.store.getState());
  }

  resizeTable = async (event) => {
    const payload = await tableResize(this.$root, event);
    this.$dispatch(actions.tableResize(payload));
  };

  onMousedown = (event) => {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const target = $target.id(true);
        const current = this.selection.current.id(true);

        const $cells = matrix(target, current)
            .map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
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
    this.updateTextStore($(event.target).text());
  };

  selectCell = ($cell) => {
    this.selection.select($cell);
    this.$emit("table:select", $cell);
    this.$dispatch(changeStyles($cell.getStyles(Object.keys(defaultStyles))));
  };

  updateTextStore = (text) => {
    this.selection.current.text(parse(text));
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      text,
    }));
  };
}

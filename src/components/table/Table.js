import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { tableResize } from "./table.resize";
import { shouldResize } from "./table.helpers";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root) {
    super($root, {
      listeners: ["mousedown"],
    });
  }

  toHTML() {
    return createTable(50);
  }

  onMousedown = (event) => {
    if (shouldResize(event)) {
      tableResize(this.$root)(event);
    }
  };
}

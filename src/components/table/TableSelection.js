export class TableSelection {
  static className = "selected";

  constructor() {
    this.group = [];
    this.current = null;
  }

  select($cell) {
    this.clear();
    this.group.push($cell);
    this.current = $cell;
    $cell.focus();
    $cell.addClass(TableSelection.className);
  }

  selectGroup($group) {
    this.clear();
    this.group = $group;
    this.group.forEach(($cell) => $cell.addClass(TableSelection.className));
  }

  clear() {
    this.group.forEach((cell) => cell.removeClass(TableSelection.className));
    this.group = [];
  }
}

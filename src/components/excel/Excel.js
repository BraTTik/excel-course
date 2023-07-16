import { $ } from "@core/dom";
import { Emitter } from "@core/Emitter";

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components ?? [];
    this.emitter = new Emitter();
  }

  getRoot() {
    const root = $.create("div", "excel");
    const options = {
      emitter: this.emitter,
    };

    this.components = this.components.map((Component) => {
      const $element = $.create("div", Component.className);
      const component = new Component($element, options);
      $element.html(component.toHTML());

      root.append($element);

      return component;
    });
    return root;
  }

  render() {
    this.$el.append(this.getRoot());
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.components.forEach((component) => component.destroy());
  }
}

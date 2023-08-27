import { $ } from "@core/dom";
import { Emitter } from "@core/Emitter";
import { StoreSubscriber } from "@core/StoreSubscriber";

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components ?? [];
    this.emitter = new Emitter();
    this.store = options.store;
    this.subscriber = new StoreSubscriber(this.store);
  }

  getRoot() {
    const root = $.create("div", "excel");
    const options = {
      emitter: this.emitter,
      store: this.store,
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
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.subscriber.unsubscribeComponents();
    this.components.forEach((component) => component.destroy());
  }
}

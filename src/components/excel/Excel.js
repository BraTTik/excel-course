import { $ } from "@core/dom";
import { Emitter } from "@core/Emitter";
import { StoreSubscriber } from "@core/StoreSubscriber";
import { updateDate } from "@/store/actions";
import { preventDefault } from "@core/utils";

export class Excel {
  constructor(options) {
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

  init = () => {
    if (process.env.NODE_ENV === "production") {
      document.addEventListener("contextmenu", preventDefault);
    }
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach((component) => component.init());
    this.store.dispatch(updateDate());
  };

  destroy = () => {
    this.subscriber.unsubscribeComponents();
    this.components.forEach((component) => component.destroy());
    document.removeEventListener("contextmenu", preventDefault);
  };
}

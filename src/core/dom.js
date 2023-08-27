class Dom {
  constructor(selector) {
    this.$element = typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === "string") {
      this.$element.innerHTML = html;
      return this;
    }

    return this.$element.outerHTML.trim();
  }

  text(content) {
    if (typeof content !== "undefined") {
      this.$element.textContent = content;
      return this;
    }
    if (this.$element.tagName.toLowerCase() === "input") {
      return this.$element.value.trim();
    }
    return this.$element.textContent.trim();
  }

  on(eventType, callback) {
    this.$element.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$element.removeEventListener(eventType, callback);
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$element;
    }
    if (Element.prototype.append) {
      this.$element.append(node);
    } else {
      this.$element.appendChild(node);
    }
  }

  closest(selector) {
    return $(this.$element.closest(selector));
  }

  getCoords() {
    return this.$element.getBoundingClientRect();
  }

  get data() {
    return this.$element.dataset;
  }

  findAll(selector) {
    return this.$element.querySelectorAll(selector);
  }

  find(selector) {
    return $(this.$element.querySelector(selector));
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$element.style[key] = styles[key];
    });
  }

  getStyles(styles = []) {
    return styles.reduce((res, style) => {
      res[style] = this.$element.style[style];
      return res;
    }, {});
  }

  focus() {
    this.$element.focus();
    return this;
  }

  value() {
    return this.$element.value;
  }

  attr(name, value) {
    if (value !== undefined) {
      this.$element.setAttribute(name, value);
      return this;
    }

    return this.$element.getAttribute(name);
  }

  addClass(className) {
    this.$element.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$element.classList.remove(className);
    return this;
  }

  id(parse) {
    if (parse) {
      const id = this.id();
      const [row = 0, col = 0] = id.split(":").map(Number);
      return {
        row,
        col,
      };
    }
    return this.data.id;
  }

  clear() {
    this.html("");
    return this;
  }
}

export const $ = (selector) => {
  return new Dom(selector);
};

$.create = (tagName, classes = "") => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }

  return $(el);
};

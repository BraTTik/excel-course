import { $ } from "@core/dom";

export const tableResize = ($root, event) => {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest("[data-type=\"resizable\"]");
    const type = $resizer.data.resize;

    const coords = $parent.getCoords();
    let delta = 0;

    const sideProp = type === "column" ? "bottom" : "right";

    $resizer.css({
      opacity: 1,
      [sideProp]: "-5000px",
    });

    document.onmousemove = (e) => {
      if (type === "column") {
        delta = Math.floor(e.pageX - coords.right);
        $resizer.css({
          right: -delta + "px",
        });
      } else {
        delta = Math.floor(e.pageY - coords.bottom);
        $resizer.css({
          bottom: -delta + "px",
        });
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      let result;

      if (type === "column") {
        const col = $parent.data.col;
        const cells = $root.findAll(`[data-col="${col}"`);

        result = coords.width + delta;
        $parent.css({ width: result + "px" });
        cells.forEach((cell) => cell.style.width = result + "px");
      } else {
        result = coords.height + delta;
        $parent.css({ height: result + "px" });
      }

      resolve({
        value: result,
        type: type,
        id: type === "column" ? $parent.data.col : $parent.data.row,
      });
      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0,
      });
    };
  });
};

import "./styles/index.scss";
import { Excel, Formula, Header, Table, Toolbar } from "@/components";

const excel = new Excel("#app", {
  components: [Header, Toolbar, Formula, Table],
});

console.log(excel.render());

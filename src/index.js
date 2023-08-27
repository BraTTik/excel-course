import "./styles/index.scss";
import { Excel, Formula, Header, Table, Toolbar } from "@/components";
import { createStore } from "@core/createStore";
import { rootReducer } from "@/store/rootReducer";
import { initialState } from "@/store/initialState";
import { debounce, storage } from "@core/utils";

const store = createStore(rootReducer, initialState);

const stateListener = debounce((state) => {
  storage("excel-state", state);
}, 300);

store.subscribe(stateListener);

const excel = new Excel("#app", {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();

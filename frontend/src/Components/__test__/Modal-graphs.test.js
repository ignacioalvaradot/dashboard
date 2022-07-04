import DoublePieChart from "../Graphs/DoublePieChart";
import { render, screen, cleanup } from "@testing-library/react";
import App from "../../App";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import generateStore from "../../redux/store.js";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});
//FIXME - EL TEST NO FUNCIONA, BORRAR SI ES NECESARIO
test("renders without crashing", () => {
  const store = generateStore();
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <DoublePieChart
        data={10}
        width={270}
        height={270}
        innerRadius={60}
        outerRadius={100}
        grupos={4}
      />
    </Provider>,
    div
  );
});

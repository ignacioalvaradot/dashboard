import { render, screen, cleanup } from "@testing-library/react";
import Expresion from "../Views/Expresion";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import generateStore from "../../redux/store.js";

test("renders without crashing", () => {
  const store = generateStore();
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <Expresion />
    </Provider>,
    div
  );
});

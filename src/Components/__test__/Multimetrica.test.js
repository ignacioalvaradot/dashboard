import { render, screen, cleanup } from "@testing-library/react";
import Multimetrica from "../Views/Multimetrica";
import App from "../../App";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import generateStore from "../../redux/store.js";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

test("renders without crashing", () => {
  const store = generateStore();
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <Multimetrica />
    </Provider>,
    div
  );
});

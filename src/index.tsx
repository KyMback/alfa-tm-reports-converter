import "regenerator-runtime";

import { StrictMode } from "react";
import { render } from "react-dom";
import { App } from "./App";
import { setAppElement } from "react-modal";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element should exist");
}

setAppElement(root);

render(
  <StrictMode>
    <App />
  </StrictMode>,
  root,
);

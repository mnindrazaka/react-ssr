import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const root = document.getElementById("root");

if (process.env.SSR) {
  ReactDOM.hydrate(<App />, root);
} else {
  ReactDOM.render(<App />, root);
}

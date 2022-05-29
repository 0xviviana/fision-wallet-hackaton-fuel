/* @refresh reload */
import { render } from "solid-js/web";
import "~/lib/styles/global.css";

import App from "./App";

render(
  () => (
    <>
      <App />
    </>
  ),
  document.getElementById("app") as HTMLElement
);

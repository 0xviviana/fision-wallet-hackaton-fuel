import "~/lib/styles/global.css";

/* @refresh reload */
import { render } from "solid-js/web";

render(
  () => (
    <>
      <h1>Hello World</h1>
    </>
  ),
  document.getElementById("app") as HTMLElement
);

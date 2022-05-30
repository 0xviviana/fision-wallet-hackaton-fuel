import renderContent from "../renderContent";
import logo from "~/assets/logo.svg";
import "./style.css";

renderContent(
  import.meta.PLUGIN_WEB_EXT_CHUNK_CSS_PATHS,
  (appRoot: HTMLElement) => {
    appRoot.innerHTML = ``;
  }
);

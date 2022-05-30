import renderContent from "../renderContent";

import "~/lib/styles/global.css";
import ReactDOM from "react-dom";
import React from "react";

renderContent(import.meta.PLUGIN_WEB_EXT_CHUNK_CSS_PATHS, (appRoot) =>
  ReactDOM.render(
    <React.StrictMode>
      <h1></h1>
    </React.StrictMode>,
    appRoot
  )
);

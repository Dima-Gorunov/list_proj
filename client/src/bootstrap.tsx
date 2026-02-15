import React from "react";

import ReactDOM from "react-dom/client";
import { App } from "./1_app";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    // <React.StrictMode>
    //   <App />
    // </React.StrictMode>
    <App />,
);

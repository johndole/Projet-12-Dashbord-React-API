import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";

import { DependenciesContext } from "./dependencies.context.ts";
import { dependencies } from "./dependencies.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DependenciesContext.Provider value={dependencies}>
      <App />
    </DependenciesContext.Provider>
  </React.StrictMode>
);

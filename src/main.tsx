import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactLenis } from "lenis/react";
import App from "./App";
import "lenis/dist/lenis.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactLenis
      root
      options={{
        anchors: true,
        lerp: 0.08,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      <App />
    </ReactLenis>
  </StrictMode>,
);

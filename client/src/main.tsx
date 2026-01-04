import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./lib/i18n"; // Initialize i18n before App

createRoot(document.getElementById("root")!).render(<App />);

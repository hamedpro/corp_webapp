import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./main.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-image-gallery/styles/scss/image-gallery.scss";
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

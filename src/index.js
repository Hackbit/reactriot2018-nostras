import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import DashBoard from "./components/DashBoard";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(<DashBoard />, document.getElementById("root"));
registerServiceWorker();

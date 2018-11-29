import * as React from "react";
import * as ReactDOM from "react-dom";
import Hello from "./components/Hello";
import './index.css'


ReactDOM.render(
    <Hello name="huangbin" age={222} />,
    document.getElementById("root")
);
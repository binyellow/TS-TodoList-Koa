import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";

ReactDOM.render(
    <Hello name="huangbin" age={22} />,
    document.getElementById("root")
);
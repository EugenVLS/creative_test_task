'use strict';

import React from "react";
import ReactDOM from "react-dom";
import Table from "./js/Table.js";
import modal from "./js/modal.js";
import './css/style.css';

(function () {
  modal();
  ReactDOM.render(<Table />, document.getElementById("table"));
})();
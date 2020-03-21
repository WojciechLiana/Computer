import React from "react";
import ReactDOM from "react-dom";
import Computer from "./src/Computer.js"


const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<Computer/>, wrapper) : false;

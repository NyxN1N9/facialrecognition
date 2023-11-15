/* index.js file aka Main.jsx */
//import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "./App.js";
import "./index.css";
import "tachyons";

const root = createRoot(document.getElementById('root'));
root.render(
  <App/>
);


import React from "react";
import ReactDOMClient from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

// Находим корневой DOM-элемент, в который хотим отрендерить наше приложение
const container = document.getElementById("root");

// Создаем корневой узел React только один раз
const root = ReactDOMClient.createRoot(container);

// Отрисовываем компонент App в корневой узел
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

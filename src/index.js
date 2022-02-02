import { render } from "react-dom";
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Edit from "./paginas/edit";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/editar/:id" element={<Edit />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
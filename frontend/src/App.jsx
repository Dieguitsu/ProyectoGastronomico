import React from "react";
import Login from "./views/login";
import Nav from "./views/nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Usuario from "./views/usuario";
import Producto from "./views/producto";
import Compra from "./views/compra";
import Almacen from "./views/almacen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Nav />}>
          <Route path="/usuarios" element={<Usuario />} />
          <Route path="/productos" element={<Producto />} />
          <Route path="/compras" element={<Compra />} />
          <Route path="/almacen" element={<Almacen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { Plus, Search, Edit2, X } from "lucide-react";
import { useGet } from "../hook/useGet";
import { usePost } from "../hook/usePost";
import styled from "styled-components";
import {
  Button,
  FormGroup,
  FormHeader,
  FormTitle,
  Input,
  Label,
  PageContainer,
  Table,
  TableContainer,
  TableHeader,
  Td,
  Th,
} from "../style/styleCrud";
import { Select } from "../style/tareaStyled";
import { useUser } from "../context/useContext";
import { useUpdate } from "../hook/usePut";
import { formatFecha } from "../utils/formatDate";
import { toast } from "react-toastify";

const Compra = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUser();
  const { data, reload } = useGet("comprasUsu");
  const { postData } = usePost("compras");
  const { updateData } = useUpdate("compra");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [form, setForm] = useState({
    detalles: [],
  });

  const [nuevoProducto, setNuevoProducto] = useState({
    producto_id: "",
    cantidad: "",
    precio_unitario: "",
  });

  const { data: productoData } = useGet("producto");

  const manejarCambioProducto = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };

  const agregarDetalle = (producto) => {
    setForm((prevForm) => ({
      ...prevForm,
      detalles: [...prevForm.detalles, producto],
    }));
  };

  const agregarProducto = () => {
    const productoSeleccionado = productoData.find(
      (producto) => producto.id === parseInt(nuevoProducto.producto_id)
    );

    if (productoSeleccionado) {
      agregarDetalle({
        producto_id: nuevoProducto.producto_id,
        nombre: productoSeleccionado.nombre,
        cantidad: nuevoProducto.cantidad,
        precio_unitario: nuevoProducto.precio_unitario,
      });

      setNuevoProducto({
        producto_id: "",
        cantidad: "",
        precio_unitario: "",
      });
    }
  };

  const eliminarDetalle = (index) => {
    setForm((prevForm) => ({
      ...prevForm,
      detalles: prevForm.detalles.filter((_, i) => i !== index),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentItem) {
      await updateData(currentItem.id, form);
    } else {
      await postData({
        usuario_id: user.data.id,
        detalles: form.detalles.map((detalle) => ({
          cantidad: parseInt(detalle.cantidad, 10),
          precio_unitario: parseFloat(detalle.precio_unitario),
          producto_id: parseInt(detalle.producto_id, 10),
        })),
      });
      reload();
    }
    setIsFormOpen(false);
    setCurrentItem(null);
    setForm({
      detalles: [],
    });
  };
  const filteredItems = data?.filter((item) =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <PageContainer>
      <TableContainer>
        <TableHeader>
          <Button variant="primary" onClick={() => setIsFormOpen(true)}>
            <Plus size={20} />
            Agregar Compra
          </Button>
        </TableHeader>

        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Comprador</Th>
              <Th>Total</Th>
              <Th>Fecha</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.id}>
                <Td>{item.id}</Td>
                <Td>{item.nombre}</Td>
                <Td>{item.total} Bs</Td>
                <Td>{formatFecha(item.fecha_compra)}</Td>
                <Td>
                  <Button
                    variant="primary"
                    onClick={() => toast.warning("No se puede editar")}
                  >
                    <Edit2 size={16} />
                  </Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      <FormContainer isOpen={isFormOpen}>
        <FormHeader>
          <FormTitle>Nueva Compra</FormTitle>
          <Button variant="primary" onClick={() => setIsFormOpen(false)}>
            <X size={20} />
          </Button>
        </FormHeader>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Producto</Label>
            <Select
              name="producto_id"
              value={nuevoProducto.producto_id}
              onChange={manejarCambioProducto}
            >
              <option value="">Seleccione producto</option>
              {productoData?.map((producto) => (
                <option key={producto.id} value={producto.id}>
                  {producto.nombre}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Cantidad</Label>
            <Input
              type="number"
              name="cantidad"
              value={nuevoProducto.cantidad}
              onChange={manejarCambioProducto}
              placeholder="Cantidad"
            />
          </FormGroup>
          <FormGroup>
            <Label>Precio Unitario</Label>
            <Input
              type="number"
              name="precio_unitario"
              step="0.01"
              value={nuevoProducto.precio_unitario}
              onChange={manejarCambioProducto}
              placeholder="Precio Unitario"
            />
          </FormGroup>
          <Button type="button" variant="primary" onClick={agregarProducto}>
            Agregar Producto
          </Button>

          <FormTitle>Detalles de la Compra</FormTitle>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <Th>Producto</Th>
                  <Th>Cantidad</Th>
                  <Th>Precio Unitario</Th>
                  <Th>Acción</Th>
                </tr>
              </thead>
              <tbody>
                {form.detalles.map((detalle, index) => (
                  <tr key={index}>
                    <Td>{detalle.nombre}</Td>
                    <Td>{detalle.cantidad}</Td>
                    <Td>{detalle.precio_unitario}</Td>
                    <Td>
                      <Button
                        variant="segundary"
                        onClick={() => eliminarDetalle(index)}
                      >
                        Eliminar
                      </Button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
          <Button variant="primary" type="submit">
            Guardar Compra
          </Button>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default Compra;
const FormContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 1000px;
  background: white;
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  transform: translateX(${(props) => (props.isOpen ? "0" : "100%")});
  transition: transform 0.3s ease-in-out;
  overflow-y: auto;
`;

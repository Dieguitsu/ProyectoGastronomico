import React, { useState, useEffect } from "react";
import {
  FilePen,
  FileSpreadsheet,
  Plus,
  Search,
  Edit2,
  Trash2,
  Save,
  X,
} from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  ActionButtons,
  Button,
  ButtonGroup,
  FormContainer,
  FormGroup,
  FormHeader,
  FormTitle,
  Input,
  InputSelect,
  Label,
  PageContainer,
  SearchContainer,
  Table,
  TableContainer,
  TableHeader,
  Td,
  Th,
} from "../style/styleCrud";
import { useGet } from "../hook/useGet";
import { formatFecha } from "../utils/formatDate";
import { usePost } from "../hook/usePost";
import { useUpdate } from "../hook/usePut";
import { useDelete } from "../hook/useDelete";
const Producto = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  function obtenerFechaActualISO() {
    return new Date().toISOString();
  }

  const fechaActual = obtenerFechaActualISO();
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: "",
    fecha_registro: fechaActual,
  });
  const { data } = useGet("producto");
  const { postData } = usePost("producto");
  const { updateData } = useUpdate("producto");
  const { deleteData } = useDelete("producto");

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);
  useEffect(() => {
    if (currentItem) {
      setForm({
        nombre: currentItem.nombre,
        descripcion: currentItem.descripcion,
        precio: currentItem.precio,
        stock: currentItem.stock,
        categoria: currentItem.categoria,
      });
    }
  }, [currentItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["ID", "Nombre", "Descripcion", "Precio", "Stock", "Categoria"]],
      body: items.map((item) => [
        item.id,
        item.nombre,
        item.descripcion,
        item.precio,
        item.stock,
        item.categoria,
      ]),
    });
    doc.save("productos.pdf");
  };
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Productos");
    XLSX.writeFile(wb, "productos.xlsx");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentItem) {
      const updatedUser = await updateData(currentItem.id, form);
      setItems(
        items.map((item) => (item.id === updatedUser.id ? updatedUser : item))
      );
    } else {
      const newUser = await postData(form);
      setItems([...items, newUser]);
    }
    setIsFormOpen(false);
    setCurrentItem(null);
    setForm({
      nombre: "",
      descripcion: "",
      precio: "",
      stock: "",
      categoria: "",
      fecha_registro: fechaActual,
    });
  };
  const handleDelete = async (id) => {
    await deleteData(id);
    setItems(items.filter((item) => item.id !== id));
  };
  const filteredItems = data?.filter((item) =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer>
      <TableContainer>
        <TableHeader>
          <SearchContainer>
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <ButtonGroup>
            <Button variant="secondary" onClick={exportToPDF}>
              <FilePen size={20} />
              PDF
            </Button>
            <Button variant="secondary" onClick={exportToExcel}>
              <FileSpreadsheet size={20} />
              Excel
            </Button>
            <Button variant="primary" onClick={() => setIsFormOpen(true)}>
              <Plus size={20} />
              Agregar
            </Button>
          </ButtonGroup>
        </TableHeader>

        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th>Descripcion</Th>
              <Th>Precio</Th>
              <Th>Cantidad</Th>
              <Th>Categoria</Th>
              <Th>acciones</Th>
            </tr>
          </thead>
          <tbody>
            {filteredItems?.map((item) => (
              <tr key={item.id}>
                <Td>{item.id}</Td>
                <Td>{item.nombre}</Td>
                <Td>{item.descripcion}</Td>
                <Td>{item.precio}</Td>
                <Td>{item.stock}</Td>
                <Th>{item.categoria}</Th>
                <Td>
                  <ActionButtons>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setCurrentItem(item);
                        setIsFormOpen(true);
                      }}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </ActionButtons>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      <FormContainer isOpen={isFormOpen}>
        <FormHeader>
          <FormTitle>
            {currentItem ? "Editar producto" : "Nuevo producto"}
          </FormTitle>
          <Button
            variant="secondary"
            onClick={() => {
              setIsFormOpen(false);
              setCurrentItem(null);
            }}
          >
            <X size={20} />
          </Button>
        </FormHeader>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Nombre</Label>
            <Input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre"
            />
          </FormGroup>
          <FormGroup>
            <Label>Descripcion</Label>
            <Input
              type="text"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Descripcion"
            />
          </FormGroup>
          <FormGroup>
            <Label>Precio</Label>
            <Input
              type="text"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              placeholder="Precio"
            />
          </FormGroup>
          <FormGroup>
            <Label>Cantidad</Label>
            <Input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Cantidad"
            />
          </FormGroup>
          <FormGroup>
            <Label>Categoria</Label>
            <Input
              type="text"
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              placeholder="Categoria"
            />
          </FormGroup>
          <ButtonGroup>
            <Button type="submit" variant="primary">
              <Save size={20} /> Guardar
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsFormOpen(false);
                setCurrentItem(null);
              }}
            >
              <X size={20} /> Cancelar
            </Button>
          </ButtonGroup>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default Producto;

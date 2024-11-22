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
const Usuario = () => {
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
    correo: "",
    contraseña: "",
    rol: "",
    fecha_registro: fechaActual,
  });
  const { data } = useGet("usuario");
  const { postData } = usePost("usuario");
  const { updateData } = useUpdate("usuario");
  const { deleteData } = useDelete("usuario");

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);
  useEffect(() => {
    if (currentItem) {
      setForm({
        nombre: currentItem.nombre,
        correo: currentItem.correo,
        contraseña: currentItem.contraseña,
        rol: currentItem.rol,
        fecha_registro: currentItem.fecha_registro,
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
      head: [["ID", "Nombre", "Precio", "Stock"]],
      body: items.map((item) => [
        item.id,
        item.nombre,
        item.precio,
        item.stock,
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
      correo: "",
      contraseña: "",
      rol: "",
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
              placeholder="Buscar usuario..."
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
              <Th>Correo</Th>
              <Th>Contraseña</Th>
              <Th>Rol</Th>
              <Th>Fecha registro</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {filteredItems?.map((item) => (
              <tr key={item.id}>
                <Td>{item.id}</Td>
                <Td>{item.nombre}</Td>
                <Td>{item.correo}</Td>
                <Td>******</Td>
                <Td>{item.rol}</Td>
                <Th>{formatFecha(item.fecha_registro)}</Th>
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
            {currentItem ? "Editar usuario" : "Nuevo usuario"}
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
            <Label>Correo</Label>
            <Input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              placeholder="Correo"
            />
          </FormGroup>
          <FormGroup>
            <Label>Contraseña</Label>
            <Input
              type="password"
              name="contraseña"
              value={form.contraseña}
              onChange={handleChange}
              placeholder="Contraseña"
            />
          </FormGroup>
          <FormGroup>
            <Label>Rol</Label>
            <InputSelect name="rol" onChange={handleChange} value={form.rol}>
              <option value="dueño">Dueño</option>
              <option value="chef">Chef</option>
              <option value="jefe de area">Jefe de área</option>
              <option value="cocinero">Cocinero</option>
            </InputSelect>
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

export default Usuario;

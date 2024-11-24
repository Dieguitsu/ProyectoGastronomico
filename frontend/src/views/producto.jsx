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
  ArrowUp,
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
import { usePost } from "../hook/usePost";
import { useUpdate } from "../hook/usePut";
import { useDelete } from "../hook/useDelete";
import { fechaActual } from "../utils/dateDay";
import { CloseButton, Form, Modal, ModalContent } from "../style/tareaStyled";
import { useUser } from "../context/useContext";
const Producto = () => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { postData: postCocina } = usePost("crear-pedido");

  const [currentData, setCurrentData] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: "",
    fecha_registro: fechaActual,
  });
  const { data: producto, reload } = useGet("producto");
  const { postData } = usePost("producto");
  const { updateData } = useUpdate("producto");
  const { deleteData } = useDelete("producto");

  useEffect(() => {
    if (currentData) {
      setForm({
        nombre: currentData.nombre,
        descripcion: currentData.descripcion,
        precio: currentData.precio,
        stock: currentData.stock,
        categoria: currentData.categoria,
      });
    }
  }, [currentData]);

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
      body: producto.map((item) => [
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
    const ws = XLSX.utils.json_to_sheet(producto);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Productos");
    XLSX.writeFile(wb, "productos.xlsx");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentData) {
      await updateData(currentData.id, form);
      reload();
    } else {
      await postData(form);
      reload();
    }
    setIsFormOpen(false);
    setCurrentData(null);
    setForm({
      nombre: "",
      descripcion: "",
      precio: "",
      stock: "",
      categoria: "",
      fecha_registro: fechaActual,
    });
  };
  const handleSendToAlmacen = async () => {
    if (selectedProduct) {
      await postCocina({
        usuario: user.data.id,
        producto: selectedProduct.id,
        cantidad: quantity,
        estado: "listo",
      });
      setShowModal(false);
      setQuantity(1);
      reload();
    }
  };
  const handleDelete = async (id) => {
    await deleteData(id);
    reload();
  };
  const filteredItems = producto?.filter((item) =>
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
            {filteredItems?.map((item, i) => (
              <tr key={i}>
                <Td>{i + 1}</Td>
                <Td>{item.nombre}</Td>
                <Td>{item.descripcion}</Td>
                <Td>{item.precio} Bs</Td>
                <Td>{item.stock}</Td>
                <Th>{item.categoria}</Th>
                <Td>
                  <ActionButtons>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setCurrentData(item);
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
                    <Button
                      variant="primary"
                      onClick={() => {
                        setSelectedProduct(item);
                        setShowModal(true);
                      }}
                    >
                      Enviar almacén <ArrowUp size={16} />
                    </Button>
                  </ActionButtons>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      {showModal && (
        <Modal>
          <ModalContent>
            <button
              style={{
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
              }}
              onClick={() => setShowModal(false)}
            >
              <X />
            </button>
            <h2 style={{ marginBottom: "20px" }}>
              Enviar al almacén: {selectedProduct?.nombre}
            </h2>
            <h3 style={{ marginBottom: "20px" }}>
              Cantidad: {selectedProduct?.stock}
            </h3>
            <div style={{ marginBottom: "20px" }}>
              <Label>Cantidad a enviar</Label>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                placeholder="Ingrese cantidad"
              />
            </div>
            <Button variant="primary" onClick={handleSendToAlmacen}>
              Enviar
            </Button>
          </ModalContent>
        </Modal>
      )}
      <FormContainer isOpen={isFormOpen}>
        <FormHeader>
          <FormTitle>
            {currentData ? "Editar producto" : "Nuevo producto"}
          </FormTitle>
          <Button
            variant="secondary"
            onClick={() => {
              setIsFormOpen(false);
              setCurrentData(null);
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
                setCurrentData(null);
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

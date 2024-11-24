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
  PageContainer,
  SearchContainer,
  Table,
  TableContainer,
  TableHeader,
  Td,
  Th,
} from "../style/styleCrud";
import { useGet } from "../hook/useGet";

const Almacen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useGet("pedidos-recientes");
  const { data: dataAll } = useGet("pedido-cocina");
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["ID", "Usuario", "producto", "cantidad", "estado"]],
      body: dataAll?.map((item) => [
        item.id,
        item.usuario,
        item.producto,
        item.cantidad,
        item.estado,
      ]),
    });
    doc.save("reporteAlmacen.pdf");
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(dataAll);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Almacen");
    XLSX.writeFile(wb, "almacen.xlsx");
  };

  return (
    <PageContainer>
      <TableContainer>
        <TableHeader>
          <SearchContainer>
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar almacen..."
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
          </ButtonGroup>
        </TableHeader>

        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th>Producto</Th>
              <Th>Cantidad</Th>
            </tr>
          </thead>
          <tbody>
            {data?.pedidos
              ?.filter(
                (item) =>
                  item.usuario
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  item.producto.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item, i) => (
                <tr key={i}>
                  <Td>{i + 1}</Td>
                  <Td>{item.usuario}</Td>
                  <Td>{item.producto}</Td>
                  <Td>{item.cantidad}</Td>
                </tr>
              ))}
          </tbody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
};

export default Almacen;

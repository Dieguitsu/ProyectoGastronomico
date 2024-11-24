import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  FormContainer,
  FormGroup,
  Input,
  Label,
  LoadingSpinner,
  Table,
  Td,
  Th,
  Title,
  UserInfo,
  AccessBadge,
  IconArrow,
  StatusMessage,
} from "../style/registroIngreso";
import { Url } from "../config";
import { toast } from "react-toastify";
import { useGet } from "../hook/useGet";
import { usePost } from "../hook/usePost";
import jsPDF from "jspdf";
import "jspdf-autotable";

const RegistroAccesoForm = () => {
  const [correo, setCorreo] = useState("");
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(null);
  const [ultimoRegistro, setUltimoRegistro] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: registrosIn, reload } = useGet("ingresoDia");
  const { postData } = usePost("registro-acceso");

  const buscarUsuario = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${Url}usuario/buscar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo }),
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje({
          tipo: "succes",
          text: "Usuario encontrado",
        });
        setUsuarioEncontrado(data);
      } else {
        setMensaje({
          tipo: "error",
          text: "Usuario no encontrado",
        });
        setUsuarioEncontrado(null);
      }
    } catch (error) {
      setMensaje("Error al buscar usuario");
    } finally {
      setLoading(false);
    }
  };

  const determinarTipoAcceso = () => {
    const ingresoExist = registrosIn.filter((user) => user.correo === correo);

    if (ingresoExist.length === 0) return "ingreso";

    const registroSalida = ingresoExist.find(
      (user) => user.tipo_acceso === "salida"
    );
    if (registroSalida) return "registro del día concluido";

    return "salida";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioEncontrado) {
      toast.error("Por favor ingrese un correo válido");
      return;
    }

    const tipo_acceso = determinarTipoAcceso();
    const ingresoExist = registrosIn.filter(
      (user) => user.tipo_acceso === "salida" && user.correo === correo
    );

    if (ingresoExist.length > 0) {
      toast.error(
        `No se puede registrar un nuevo, El último registro ya se realizo.`
      );
      return;
    }

    try {
      const nuevoRegistro = await postData({
        usuario: usuarioEncontrado.id,
        tipo_acceso,
      });
      setUltimoRegistro(nuevoRegistro);
      reload();
      setCorreo("");
      setUsuarioEncontrado(null);
    } catch (error) {
      toast.error("Error al registrar el acceso");
    }
  };

  const generarReporte = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Reporte de Registros de Acceso", 14, 20);

    const datos = registrosIn.map((registro) => [
      registro.usuario.nombre,
      registro.usuario.correo,
      registro.tipo_acceso.charAt(0).toUpperCase() +
        registro.tipo_acceso.slice(1),
      new Date(registro.fecha_hora).toLocaleString("es-ES"),
    ]);

    doc.autoTable({
      startY: 30,
      head: [["Usuario", "Correo", "Tipo", "Fecha y Hora"]],
      body: datos,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [59, 130, 246] },
    });

    doc.save("reporte-accesos.pdf");
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (correo && correo.includes("@")) buscarUsuario();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [correo]);

  return (
    <FormContainer>
      <Title>Registrar Acceso</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Correo Electrónico</Label>
          <Input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="ejemplo@correo.com"
            required
          />
        </FormGroup>
        <Button type="submit">Registrar Acceso</Button>
      </Form>
      {mensaje && (
        <StatusMessage tipo={mensaje.tipo}>{mensaje.text}</StatusMessage>
      )}

      {loading && <LoadingSpinner>Buscando usuario...</LoadingSpinner>}

      {usuarioEncontrado && (
        <UserInfo>
          <p>
            <strong>Nombre:</strong> {usuarioEncontrado.nombre}
          </p>
          <p>
            <strong>Próximo registro:</strong>
            <AccessBadge tipo={determinarTipoAcceso()}>
              <IconArrow>
                {determinarTipoAcceso() === "ingreso"
                  ? "↓"
                  : determinarTipoAcceso() === "salida"
                  ? "↑"
                  : "*"}
              </IconArrow>
              {determinarTipoAcceso().charAt(0).toUpperCase() +
                determinarTipoAcceso().slice(1)}
            </AccessBadge>
          </p>
          {/* {ultimoRegistro && (
            <p>
              <strong>Último registro:</strong> {ultimoRegistro.tipo_acceso} -{" "}
              {new Date(ultimoRegistro.fecha_hora).toLocaleString("es-ES")}
            </p>
          )} */}
        </UserInfo>
      )}

      <Title>Historial de Accesos</Title>
      <Table>
        <thead>
          <tr>
            <Th>Usuario</Th>
            <Th>Correo</Th>
            <Th>Tipo</Th>
            <Th>Fecha y Hora</Th>
          </tr>
        </thead>
        <tbody>
          {registrosIn?.map((registro) => (
            <tr key={registro.id}>
              <Td>{registro.nombre}</Td>
              <Td>{registro.correo}</Td>
              <Td>
                <AccessBadge tipo={registro.tipo_acceso}>
                  <IconArrow>
                    {registro.tipo_acceso === "ingreso" ? "↓" : "↑"}
                  </IconArrow>
                  {registro.tipo_acceso.charAt(0).toUpperCase() +
                    registro.tipo_acceso.slice(1)}
                </AccessBadge>
              </Td>
              <Td>{new Date(registro.fecha_hora).toLocaleString("es-ES")}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </FormContainer>
  );
};

export default RegistroAccesoForm;

import React, { useState } from "react";
import {
  Header,
  AddButton,
  CloseButton,
  Container,
  EmptyState,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalContent,
  Select,
  StatusBadge,
  SubmitButton,
  TaskCard,
  TaskDate,
  TaskDescription,
  TaskHeader,
  TaskInfo,
  TaskMeta,
  TaskUser,
  TasksContainer,
  TextArea,
  Title,
} from "../style/tareaStyled";
import { useGet } from "../hook/useGet";
import { fechaActual } from "../utils/dateDay";
import { usePost } from "../hook/usePost";
import { useUpdate } from "../hook/usePut";
import { toast } from "react-toastify";

const UserIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const Tareas = () => {
  const { data, reload } = useGet("usuarioTarea");
  const { postData } = usePost("tarea");
  const { updateData } = useUpdate("tarea");
  const { data: usuarioData } = useGet("usuario");
  const [tareas, setTareas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevaTarea, setNuevaTarea] = useState({
    usuario: "",
    descripcion: "",
    estado: "pendiente",
    fecha_limite: "",
    fecha_creacion: fechaActual,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tarea = {
      id: Date.now(),
      ...nuevaTarea,
      fecha_creacion: new Date().toISOString(),
    };
    await postData(...tareas, tarea);
    setShowModal(false);
    reload();
    setNuevaTarea({
      descripcion: "",
      estado: "pendiente",
      fecha_limite: "",
      usuario: "",
    });
  };

  const cambiarEstado = async (tarea) => {
    if (tarea.estado === "completada")
      return toast.error("Ya se termino la tarea");
    await updateData(tarea.id, {
      usuario: tarea.usuarioId,
      descripcion: tarea.descripcion,
      estado: tarea.estado === "pendiente" ? "en progreso" : "completada",
      fecha_limite: tarea.fecha_limite,
      fecha_creacion: tarea.fecha_creacion,
    });
    reload();
    setTareas(
      tareas.map((tarea) => {
        if (tarea.id === id) {
          const estados = ["pendiente", "en progreso", "completada"];
          const currentIndex = estados.indexOf(tarea.estado);
          const nextIndex = (currentIndex + 1) % estados.length;
          return { ...tarea, estado: estados[nextIndex] };
        }
        return tarea;
      })
    );
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Container>
      <Header>
        <Title>Mis Tareas</Title>
        <AddButton onClick={() => setShowModal(true)}>
          <span>+</span> Nueva Tarea
        </AddButton>
      </Header>

      {data?.length === 0 ? (
        <EmptyState>
          <h3>No hay tareas pendientes</h3>
          <p>¡Comienza agregando una nueva tarea!</p>
        </EmptyState>
      ) : (
        <TasksContainer>
          {data?.map((tarea) => (
            <TaskCard key={tarea.id} status={tarea.estado}>
              <TaskHeader>
                <TaskDescription>{tarea.descripcion}</TaskDescription>
              </TaskHeader>
              <TaskMeta>
                <TaskInfo>
                  <TaskUser>
                    <UserIcon /> {tarea.usuario}
                  </TaskUser>
                  <TaskDate>
                    <CalendarIcon /> {formatearFecha(tarea.fecha_limite)}
                  </TaskDate>
                </TaskInfo>
                <StatusBadge
                  status={tarea.estado}
                  onClick={() => cambiarEstado(tarea)}
                >
                  {tarea.estado}
                </StatusBadge>
              </TaskMeta>
            </TaskCard>
          ))}
        </TasksContainer>
      )}

      {showModal && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setShowModal(false)}>
              &times;
            </CloseButton>
            <h2
              style={{
                marginBottom: "25px",
                color: "#2d3436",
                fontSize: "1.5rem",
              }}
            >
              Nueva Tarea
            </h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Usuario Asignado</Label>
                <Select
                  value={nuevaTarea.usuario}
                  onChange={(e) =>
                    setNuevaTarea({ ...nuevaTarea, usuario: e.target.value })
                  }
                >
                  <option>Seleccione usuario</option>
                  {usuarioData.map((v, i) => (
                    <option key={i} value={v.id}>
                      {v.nombre}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Descripción</Label>
                <TextArea
                  value={nuevaTarea.descripcion}
                  onChange={(e) =>
                    setNuevaTarea({
                      ...nuevaTarea,
                      descripcion: e.target.value,
                    })
                  }
                  placeholder="¿Qué necesitas hacer?"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Estado</Label>
                <Select
                  value={nuevaTarea.estado}
                  onChange={(e) =>
                    setNuevaTarea({ ...nuevaTarea, estado: e.target.value })
                  }
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en progreso">En Progreso</option>
                  <option value="completada">Completada</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Fecha Límite</Label>
                <Input
                  type="datetime-local"
                  value={nuevaTarea.fecha_limite}
                  onChange={(e) =>
                    setNuevaTarea({
                      ...nuevaTarea,
                      fecha_limite: e.target.value,
                    })
                  }
                  required
                />
              </FormGroup>

              <SubmitButton type="submit">Crear Tarea</SubmitButton>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Tareas;

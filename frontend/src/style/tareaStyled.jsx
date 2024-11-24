import styled from "styled-components";

// Contenedor principal con fondo gradiente sutil
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #fff, #f8f9fa);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
`;

export const Title = styled.h1`
  color: #2d3436;
  font-size: 2.5rem;
  font-weight: 700;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 60px;
    height: 4px;
    background: #ff5733;
    border-radius: 2px;
  }
`;

export const AddButton = styled.button`
  background-color: #ff5733;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: #fff;
  &:hover {
    opacity: 0.8;
  }

`;

export const TasksContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
  padding: 20px 0;
`;

export const TaskCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${(props) => {
      switch (props.status) {
        case "pendiente":
          return "#3498db";
        case "en progreso":
          return "#2ecc71";
        case "completada":
          return "#e74c3c";
        default:
          return "#3498db";
      }
    }};
  }
`;

export const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const TaskDescription = styled.p`
  font-size: 1.1rem;
  color: #2d3436;
  line-height: 1.6;
  margin: 0;
  flex-grow: 1;
`;

export const TaskMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
`;

export const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const TaskDate = styled.span`
  color: #636e72;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const TaskUser = styled.span`
  color: #2d3436;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const StatusBadge = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  background-color: ${(props) => {
    switch (props.status) {
      case "pendiente":
        return "#3498db";
      case "en progreso":
        return "#2ecc71";
      case "completada":
        return "#e74c3c";
      default:
        return "#3498db";
    }
  }};

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px
      ${(props) => {
        switch (props.status) {
          case "pendiente":
            return "rgba(52, 152, 219, 0.3)";
          case "en progreso":
            return "rgba(46, 204, 113, 0.3)";
          case "completada":
            return "rgba(231, 76, 60, 0.3)";
          default:
            return "rgba(52, 152, 219, 0.3)";
        }
      }};
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

export const ModalContent = styled.div`
  background: white;
  padding: 35px;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  position: relative;
  animation: slideIn 0.3s ease-out;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);

  @keyframes slideIn {
    from {
      transform: translateY(-30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  transition: all 0.3s ease;

  &:hover {
    color: #ff5733;
    transform: rotate(90deg);
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  color: #636e72;
  font-weight: 500;
`;

export const Input = styled.input`
  padding: 12px;
  border: 2px solid #f0f0f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ff5733;
    box-shadow: 0 0 0 3px rgba(255, 87, 51, 0.1);
  }
`;

export const TextArea = styled.textarea`
  padding: 12px;
  border: 2px solid #f0f0f0;
  border-radius: 10px;
  font-size: 1rem;
  min-height: 120px;
  transition: all 0.3s ease;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #ff5733;
    box-shadow: 0 0 0 3px rgba(255, 87, 51, 0.1);
  }
`;

export const Select = styled.select`
  padding: 12px;
  border: 2px solid #f0f0f0;
  border-radius: 10px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ff5733;
    box-shadow: 0 0 0 3px rgba(255, 87, 51, 0.1);
  }
`;

export const SubmitButton = styled.button`
  background-color: #ff5733;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 87, 51, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  h3 {
    color: #2d3436;
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  p {
    color: #636e72;
    font-size: 1rem;
  }
`;

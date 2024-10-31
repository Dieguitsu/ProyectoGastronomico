import styled from "styled-components";

const PRIMARY_COLOR = "#ff5733";

export const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.variant === "primary" &&
    `
    background: ${PRIMARY_COLOR};
    color: white;
    &:hover {
      background: #ff4a1f;
    }
  `}

  ${(props) =>
    props.variant === "secondary" &&
    `
    background: #f3f4f6;
    color: #374151;
    &:hover {
      background: #e5e7eb;
    }
  `}

  ${(props) =>
    props.variant === "danger" &&
    `
    background: #fee2e2;
    color: #dc2626;
    &:hover {
      background: #fecaca;
    }
  `}
`;

// Componentes de la Tabla
export const TableContainer = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-top: 1.5rem;
`;

export const TableHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f3f4f6;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  width: 300px;

  svg {
    color: #9ca3af;
  }

  input {
    border: none;
    background: transparent;
    padding: 0.25rem 0.5rem;
    width: 100%;
    outline: none;

    &::placeholder {
      color: #9ca3af;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 500;
  color: #374151;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

export const Td = styled.td`
  padding: 1rem;
  color: #4b5563;
  border-bottom: 1px solid #e5e7eb;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

// Componente de Formulario
export const FormContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  max-width: 500px;
  background: white;
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  transform: translateX(${(props) => (props.isOpen ? "0" : "100%")});
  transition: transform 0.3s ease-in-out;
  overflow-y: auto;
`;

export const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const FormTitle = styled.h2`
  font-size: 1.5rem;
  color: #111827;
  font-weight: 600;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #374151;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${PRIMARY_COLOR};
    box-shadow: 0 0 0 2px rgba(255, 87, 51, 0.1);
  }
`;

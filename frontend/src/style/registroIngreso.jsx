import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const FormContainer = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #ff5733;
  margin: 20px;
`;

export const Form = styled.form`
  display: flex;
  gap: 16px;
  align-items: flex-end;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
`;

export const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

export const Button = styled.button`
  padding: 8px 16px;
  background: #ff5733;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;

export const StatusMessage = styled.div`
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  margin-top: 8px;

  ${(props) =>
    props.tipo === "error"
      ? `
    background-color: #fee2e2;
    color: #b91c1c;
  `
      : `
    background-color: #dcfce7;
    color: #15803d;
  `}
`;

export const UserInfo = styled.div`
  margin-top: 16px;
  padding: 12px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
`;

export const AccessBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;

  ${(props) =>
    props.tipo === "ingreso"
      ? `
    background-color: #dcfce7;
    color: #15803d;
  `
      : props.tipo === "salida"
      ? `
    background-color: #fee2e2;
    color: #b91c1c;
  `
      : `
       background-color: #90e0ef;
    color: #03045e;
      `}
`;

export const IconArrow = styled.span`
  display: inline-block;
  margin-right: 4px;
  font-size: 12px;
`;

export const LoadingSpinner = styled.div`
  color: #3b82f6;
  font-size: 14px;
  margin-top: 8px;
`;
export const ReportSection = styled.div`
  margin: 20px 0;
  padding: 20px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

export const ReportControls = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
`;

export const DateInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
`;

export const FiltersContainer = styled.div`
  display: flex;
  gap: 16px;
  margin: 20px 0;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
`;

export const Th = styled.th`
  text-align: left;
  padding: 12px 16px;
  background: #f8fafc;
  font-weight: 500;
  color: #4a5568;
  border-bottom: 1px solid #e2e8f0;
`;

export const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  color: #1a1a1a;
`;

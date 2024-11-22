import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { ChefHat } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importamos axios para manejar las solicitudes HTTP.
import { toast } from "react-toastify";
import { Url } from "../config";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${Url}login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo,
          contraseña,
        }),
      });

      if (!response.ok) {
        throw new Error("Credenciales inválidas. Inténtalo de nuevo.");
      }

      const data = await response.json();
      toast.success(data.message);
      console.log(data);
      navigate("/usuarios");
    } catch (err) {
      console.error(err);
      setError("Credenciales inválidas. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <LoginCard>
        <IconWrapper>
          <IconCircle>
            <ChefHat size={50} color="#ff5733" />
          </IconCircle>
        </IconWrapper>
        <Title>Bienvenido</Title>
        <Subtitle>Ingresa a tu cuenta</Subtitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <Input
            type="contraseña"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </Form>

        <LinksContainer>
          <StyledLink href="#">¿Olvidaste tu contraseña?</StyledLink>
        </LinksContainer>

        <Footer>
          Al iniciar sesión, aceptas nuestros términos y condiciones
        </Footer>
      </LoginCard>
    </Container>
  );
};

export default Login;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;
const ErrorMessage = styled.div`
  color: #ff3333;
  background: #ffe6e6;
  padding: 0.5rem;
  border-radius: 0.5rem;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(135deg, #fef2f2 0%, #f0fdfa 100%);
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const IconCircle = styled.div`
  padding: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 300;
  color: #1f2937;
  margin-bottom: 0.5rem;
  letter-spacing: 0.025em;
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 2rem;
  letter-spacing: 0.025em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid rgb(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.5);
  transition: all 0.2s;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(13, 148, 136, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #ff5733;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const StyledLink = styled.a`
  font-size: 0.875rem;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #ff5733;
  }
`;

const Footer = styled.p`
  text-align: center;
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 2rem;
`;

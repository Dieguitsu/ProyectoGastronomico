import React from "react";
import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";
import {
  User,
  Package,
  ShoppingCart,
  Archive,
  ChefHat,
  LogOut,
} from "lucide-react";

const Nav = () => {
  return (
    <NavContainer>
      <NavContent>
        <LogoContainer>
          <IconCircle>
            <ChefHat size={28} color={PRIMARY_COLOR} />
          </IconCircle>
          <RestaurantName>Sistema de Gestión</RestaurantName>
        </LogoContainer>
        <ButtonsContainer>
          <NavLink to="/usuarios">
            <User size={20} />
            Usuario
          </NavLink>

          <NavLink to="/productos">
            <Package size={20} />
            Producto
          </NavLink>

          <NavLink to="/compras">
            <ShoppingCart size={20} />
            Compra
          </NavLink>

          <NavLink to="/almacen">
            <Archive size={20} />
            Almacén
          </NavLink>
          <NavLinkLogout to="/">
            <LogOut size={20} />
            Salir
          </NavLinkLogout>
        </ButtonsContainer>
      </NavContent>
      <DivOutled>
        <Outlet />
      </DivOutled>
    </NavContainer>
  );
};

export default Nav;
const PRIMARY_COLOR = "#ff5733";

const NavContainer = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const NavContent = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 10rem;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(255, 87, 51, 0.1);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconCircle = styled.div`
  background: rgba(255, 87, 51, 0.1);
  padding: 0.75rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RestaurantName = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${PRIMARY_COLOR};
  font-family: "Playfair Display", serif;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
const NavLinkLogout = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 0.75rem;
  background: rgba(255, 87, 51, 0.08);
  color: ${PRIMARY_COLOR};
  font-size: 0.938rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background: rgba(255, 87, 51, 0.08);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0px);
  }

  svg {
    margin-right: 0.5rem;
    stroke-width: 2px;
  }

  &.active {
    background: rgba(255, 87, 51, 0.1);
    color: ${PRIMARY_COLOR};
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 0.75rem;
  background: transparent;
  color: #4b5563;
  font-size: 0.938rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background: rgba(255, 87, 51, 0.08);
    color: ${PRIMARY_COLOR};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0px);
  }

  svg {
    margin-right: 0.5rem;
    stroke-width: 2px;
  }

  &.active {
    background: rgba(255, 87, 51, 0.1);
    color: ${PRIMARY_COLOR};
  }
`;
const DivOutled = styled.div`
  width: 100%;
  height: calc(100% - 4.5rem);
`;

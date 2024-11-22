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

const PRIMARY_COLOR = "#ff5733";

const Nav = () => {
  return (
    <NavContainer>
      <Sidebar>
        <SidebarContent>
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
        </SidebarContent>
      </Sidebar>
      
      <MainContent>
        <Outlet />
      </MainContent>
    </NavContainer>
  );
};

export default Nav;

const NavContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const Sidebar = styled.nav`
  width: 250px;
  background: white;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
`;

const SidebarContent = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
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
  flex-direction: column;
  gap: 1rem;
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
    color: ${PRIMARY_COLOR};
  }
`;

const NavLinkLogout = styled(NavLink)`
  margin-top: auto;
  color: ${PRIMARY_COLOR};

`;

const MainContent = styled.main`
  margin-left: 250px;
  width: calc(100% - 250px);
  height: 100%;
  overflow-y: auto;
  padding: 2rem;
`;
import styled, { keyframes } from "styled-components";

export const LoginContainer = styled.div`
  width: 100;
  height: 100vh;
  display: flex;
  position: relative;
`;

export const LoginLeft = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const LoginImage = styled.img`
  width: 90%;
`;

export const LoginImg = styled.img`
  position: absolute;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const DivFlavor = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
  flex-direction: column;
`;

export const ImgFlavor = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 25px;
  object-fit: cover;
`;

export const LoginTitle = styled.h2`
  color: #ffffff;
  font-size: 40px;
  text-align: center;
  flex: 2;
  font-weight: 700;
`;

export const LoginRight = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

export const LoginBox = styled.div`
  width: 65%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border-radius: 8px;
  z-index: 2;
  margin-left: 130px;
`;

export const Label = styled.label`
  font-size: 15px;
  color: #ffffff;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 25px;
  border: 1px solid #d1d9e6;
  border-radius: 4px;
  outline: none;
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ea88ab;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #e0a2b4;
    color: white;
  }
`;
export const LoginButtona = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #ea88ab;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e0a2b4;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(224, 162, 180, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
export const IconWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
`;
export const StyledInput = styled.input`
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ea88ab;
    box-shadow: 0 0 10px rgba(234, 136, 171, 0.5);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;
const gradientAnimation = keyframes`
  0% {background-position: 0% 50%;}
  50% {background-position: 100% 50%;}
  100% {background-position: 0% 50%;}
`;

export const LoginContainera = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(45deg, #ff6b8e, #ea88ab, #e0a2b4);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 10s ease infinite;
  overflow: hidden;
`;

export const LoginWrapper = styled.div`
  width: 100%;
  max-width: 450px;
  margin: auto;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

export const Logo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.3);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1) rotate(5deg);
  }
`;

export const Title = styled.h2`
  color: white;
  text-align: center;
  margin-top: 15px;
  font-size: 24px;
  letter-spacing: 1px;
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

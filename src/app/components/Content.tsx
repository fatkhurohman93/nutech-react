import React from "react";
import styled from "styled-components";
import Login from "./Login";
import { useApp } from "../hooks/useApp";
import ProductList from "./ProductList";
const Content: React.FC = () => {
  const { isAuthenticated } = useApp();

  return <Container>{isAuthenticated ? <ProductList /> : <Login />}</Container>;
};

const Container = styled.main`
  padding: 16px 32px;
`;

export default Content;

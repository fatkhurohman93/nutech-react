import React, { createContext } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import { useProvideApp } from "./hooks/useApp";

export const AuthContext = createContext<any>(null);

const App: React.FC = () => {
  const auth = useProvideApp();

  return (
    <AuthContext.Provider value={auth}>
      <Container>
        <Header />
        <Content />
        <Footer />
      </Container>
    </AuthContext.Provider>
  );
};

const Container = styled.div``;

export default App;

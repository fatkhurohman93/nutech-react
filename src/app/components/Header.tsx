import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useApp } from "../hooks/useApp";

const Header: React.FC = () => {
  const [copyRight] = useState<string[]>(["Akbar", "Fatkhurohman"]);
  const [index, setIndex] = useState<number>(0);

  const { logOut, isAuthenticated } = useApp();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(index ? 0 : 1);
    }, 2000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <Container>
      <Title>{index ? "Programming Test" : "Nutech APP 2023"}</Title>
      <TopRightContent>
        <div>By {copyRight[index]}</div>
        {isAuthenticated && <Logout onClick={logOut}>Logout</Logout>}
      </TopRightContent>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 16px 32px;
  background: #333;
  color: #fff;
`;
const Title = styled.div``;
const TopRightContent = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;
const Logout = styled.div`
  cursor: pointer;
`;

export default Header;

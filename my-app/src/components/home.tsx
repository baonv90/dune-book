import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.div`
  padding: 8px 16px;
  box-shadow: #eeeeee 1px 0px 5px 1px;
`;

const Title = styled.h2`
  color: #7b7b7b;
  font-size: 16px;
`;

const Main = styled.div`
  display: grid;
  padding: 8px;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 180px;
  grid-gap: 24px;
  height: 100%;
`;

const BookWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eeeeee;
  cursor: pointer;
`;

function Home() {
  return (
    <PageWrapper>
      <Header>
        <Title>My books</Title>
      </Header>
      <Main>
        <BookWrapper>
          <Link to="read">Dune</Link>
        </BookWrapper>
      </Main>
    </PageWrapper>
  );
}

export default Home;

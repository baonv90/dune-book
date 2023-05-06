import React from "react";
import styled from "styled-components";
import { MdModeNight } from "react-icons/md";
import { useAppearance } from "../providers/appearance-provider.tsx";
import { Link } from "react-router-dom";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${({ theme }) => theme.colors.white};
`;

const Header = styled.div`
  padding: 8px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.disabled};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  width: calc(100% - 32px);
`;

const DarkMode = styled(MdModeNight)`
  z-index: 1;
  cursor: pointer;
  width: 20px;
  height: 20px;
  padding: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.disabled};
  color: ${({ theme }) => theme.colors.title};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.title};
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
  background: ${({ theme }) => theme.colors.disabled};
  cursor: pointer;
`;

function Home() {
  const { setAppearance } = useAppearance();

  return (
    <PageWrapper>
      <Header>
        <Title>My books</Title>
        <DarkMode
          onClick={() =>
            setAppearance((mode) => (mode === "light" ? "dark" : "light"))
          }
        />
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

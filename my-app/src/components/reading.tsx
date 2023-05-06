import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { VscChromeClose } from "react-icons/vsc";
import { useFetchData } from "../helper/useFetchData.ts";
import "./reading.css";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  font-size: ${({ fontSize }) => fontSize || FONTSIZE}px;
  line-height: ${({ fontSize }) => fontSize + 5 || FONTSIZE + 5}px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
`;

const HeaderContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  align-items: center;
  opacity: 0.95;
  background: ${({ theme }) => theme.colors.white};
  height: 40px;
  width: calc(100% - 32px);
`;

const Title = styled.h2`
  font-size: 20px;
  line-height: 30px;
  font-weight: 600;
`;

const CloseButton = styled(VscChromeClose)`
  color: ${({ theme }) => theme.colors.title};
  width: 22px;
  height: 22px;
`;

const LoaderContent = styled.div`
  padding: 70px 24px;
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const Content = styled.div`
  padding: 70px 24px;
  font-family: sans-serif;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: calc(100% - 48px);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 24px;
  justify-content: center;
  background: ${({ theme }) => theme.colors.white};
  opacity: 0.95;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.disabled};
  color: ${({ theme }) => theme.colors.actionPrimary};
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
`;

const Placeholder = styled.span`
  background-color: ${({ theme }) => theme.colors.disabled};
  display: block;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  width: ${({ size, circle }) => (circle ? `${size}px` : "100%")};
  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${maxWidth};
    `};
  height: ${({ size }) => `${size}px`};
`;

const BASE_URL =
  "https://isach.info/story.php?story=xu_cat__frank_herbert&chapter=00";

function convertChapter(chapter) {
  if (chapter < 10) return `0${chapter}`;
  return `${chapter}`;
}

function Loader() {
  return (
    <LoaderContent>
      <Placeholder size={13} maxWidth="80%" />
      <Placeholder size={13} maxWidth="60%" />
      <Placeholder size={13} maxWidth="40%" />
    </LoaderContent>
  );
}

const FONTSIZE = 18;

function Reading() {
  const [chapter, setChapter] = useState(
    parseInt(localStorage.getItem("chapter")) || 1
  );
  const [scrollPosition, setScrollPosition] = useState(
    localStorage.getItem("scrollPosition") || 0
  );
  const [fontSize, setFontSize] = useState(
    parseInt(localStorage.getItem("fontSize")) || FONTSIZE
  );

  useEffect(() => {
    function handleBeforeUnload() {
      saveLocalStorage();
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const saveLocalStorage = () => {
    localStorage.setItem("chapter", chapter);
    localStorage.setItem("scrollPosition", scrollPosition);
    localStorage.setItem("fontSize", fontSize);
  };

  const handleScroll = (event) => {
    setScrollPosition(event.target.scrollTop);
  };

  return (
    <PageWrapper onScroll={handleScroll} fontSize={fontSize}>
      <HeaderContainer>
        <Title>{`Chapter ${chapter}`}</Title>
        <Link to="/">
          <CloseButton onClick={saveLocalStorage} />
        </Link>
      </HeaderContainer>
      <View chapter={chapter} />
      <Footer>
        <Button onClick={() => setChapter((old) => (old > 1 ? old - 1 : old))}>
          Previous
        </Button>
        <Button onClick={() => setFontSize((font) => font + 1)}>A+</Button>
        <Button
          onClick={() => setFontSize((font) => (font > 16 ? font - 1 : font))}
        >
          A-
        </Button>
        <Button onClick={() => setChapter((old) => old + 1)}>Next</Button>
      </Footer>
    </PageWrapper>
  );
}

function View({ chapter }) {
  const { data, loading, hasError } = useFetchData(
    `${BASE_URL}${convertChapter(chapter)}`
  );

  if (!data && hasError) return <div>Error!</div>;
  if (loading) return <Loader />;
  if (!data) return null;

  return <Content dangerouslySetInnerHTML={{ __html: data }} />;
}

export default Reading;

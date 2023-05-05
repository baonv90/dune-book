import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { VscChromeClose } from "react-icons/vsc";
import { MdModeNight } from "react-icons/md";
import { useFetchData } from "../helper/useFetchData.ts";
import "./reading.css";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  font-size: ${({ fontSize }) => fontSize || FONTSIZE}px;
  line-height: ${({ fontSize }) => fontSize + 5 || FONTSIZE + 5}px;
  background: ${({ mode }) => (mode === DARK_MODE ? "#232323" : "white")};
  color: ${({ mode }) => (mode === DARK_MODE ? "white" : "black")};
`;

const CloseButton = styled(VscChromeClose)`
  position: fixed;
  color: ${({ mode }) => (mode === DARK_MODE ? "white" : "black")};
  right: 16px;
  top: 16px;
  z-index: 1;
  cursor: pointer;
  width: 1.2rem;
  height: 1.2rem;
`;

const DarkMode = styled(MdModeNight)`
  z-index: 1;
  cursor: pointer;
  width: 24px;
  height: 24px;
  padding: 4px 8px;
  background: #e3e3e3;
  border-radius: 8px;
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
  margin-bottom: 80px;
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
  background: ${({ mode }) => (mode === DARK_MODE ? "#232323" : "white")};
  opacity: 0.95;
`;

const Button = styled.button`
  background: #e3e3e3;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
`;

const Placeholder = styled.span`
  background-color: #e3e3e3;
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
const DARK_MODE = "dark";
const LIGHT_MODE = "light";

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
  const [mode, setMode] = useState(localStorage.getItem("mode") || LIGHT_MODE);

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
    localStorage.setItem("mode", mode);
  };

  const handleScroll = (event) => {
    setScrollPosition(event.target.scrollTop);
  };

  return (
    <PageWrapper onScroll={handleScroll} fontSize={fontSize} mode={mode}>
      <Link to="/">
        <CloseButton mode={mode} onClick={saveLocalStorage} />
      </Link>
      <View chapter={chapter} />
      <Footer mode={mode}>
        <Button onClick={() => setChapter((old) => (old > 1 ? old - 1 : old))}>
          Previous
        </Button>
        <Button onClick={() => setFontSize((font) => font + 1)}>A+</Button>
        <Button
          onClick={() => setFontSize((font) => (font > 16 ? font - 1 : font))}
        >
          A-
        </Button>
        <DarkMode
          onClick={() =>
            setMode((mode) => (mode === LIGHT_MODE ? DARK_MODE : LIGHT_MODE))
          }
        />
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

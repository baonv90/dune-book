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
`;

const CloseButton = styled(VscChromeClose)`
  position: fixed;
  color: black;
  right: 16px;
  top: 16px;
  z-index: 1;
  cursor: pointer;
  width: 1.2rem;
  height: 1.2rem;
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
  line-height: 22px;
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
  background: white;
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

function Reading() {
  console.log(localStorage);
  const [chapter, setChapter] = useState(
    parseInt(localStorage.getItem("chapter")) || 1
  );
  const [scrollPosition, setScrollPosition] = useState(
    localStorage.getItem("scrollPosition") || 0
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
  };

  const handleScroll = (event) => {
    setScrollPosition(event.target.scrollTop);
  };

  return (
    <PageWrapper onScroll={handleScroll}>
      <Link to="/">
        <CloseButton onClick={saveLocalStorage} />
      </Link>
      <View chapter={chapter} />
      <Footer>
        <Button onClick={() => setChapter((old) => (old > 1 ? old - 1 : old))}>
          Previous
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

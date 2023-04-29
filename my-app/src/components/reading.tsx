import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { VscChromeClose } from "react-icons/vsc";
import { useFetchData } from "../helper/useFetchData.ts";
import "./reading.css";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const CloseButton = styled(VscChromeClose)`
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 10;
  cursor: pointer;
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

const BASE_URL =
  "https://isach.info/story.php?story=xu_cat__frank_herbert&chapter=00";

function convertChapter(chapter) {
  if (chapter < 10) return `0${chapter}`;
  return `${chapter}`;
}

function Loader() {
  return <Content>Loading...</Content>;
}

function Reading() {
  const [chapter, setChapter] = useState(1);

  return (
    <PageWrapper>
      <Link to="/">
        <CloseButton />
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

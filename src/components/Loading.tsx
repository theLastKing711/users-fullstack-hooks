import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  console.log(`${process.env.PUBLIC_URL + "/Rolling-1s-200px.gif"}`);

  return (
    <Wrapper>
      <img
        src="/assets/test/Rolling-1s-200px.gif"
        alt="Loading"
        style={{ marginTop: "10rem" }}
      />
    </Wrapper>
  );
};
export default Loading;

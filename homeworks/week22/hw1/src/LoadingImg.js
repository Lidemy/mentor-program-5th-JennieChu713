/* eslint-disable */
import styled from "styled-components";
import ripple from "./imgs/ripple.svg";
import ellipsis from "./imgs/ellipsis.svg";

const LoadingImg = styled.div`
  width: fit-content;
  margin: 0 auto;
`;

export const RippleLoading = () => {
  return (
    <LoadingImg>
      <img src={ripple} />
    </LoadingImg>
  );
};

export const EllipsisLoading = () => {
  return (
    <LoadingImg>
      <img src={ellipsis} />
    </LoadingImg>
  );
};

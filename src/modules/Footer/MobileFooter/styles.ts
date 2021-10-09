import styled from "styled-components";
import { themeColor } from "styles/helpers";

export const MobileFooterButton = styled.button`
  width: fit-content;

  position: absolute;
  bottom: 0;

  z-index: 100;

  margin: 0 auto 10px auto;
  padding: 15px;

  border: none;
  border-radius: 100%;

  box-shadow: 10px 0 30px ${themeColor("shadow")};
  background: ${themeColor("primary")};
  color: ${themeColor("onPrimary")};

  font-size: 30px;
  line-height: 0;
`;

export const FormatsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

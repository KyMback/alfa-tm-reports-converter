import styled from "styled-components";
import { themeColor } from "styles/helpers";

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 10px 20px;

  background: ${themeColor("primary")};
  color: ${themeColor("onPrimary")};

  border: none;
  border-radius: 10px;

  font-weight: bold;
  font-size: 20px;
  line-height: 24px;

  cursor: pointer;

  svg {
    margin-right: 22px;
  }
`;

export const OutlineButton = styled(Button)`
  background: ${themeColor("surface")};
  color: ${themeColor("primary")};

  border: 2px solid ${themeColor("primary")};
`;

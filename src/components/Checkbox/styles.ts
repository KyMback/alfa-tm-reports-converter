import styled from "styled-components";
import { themeColor } from "styles/helpers";

export const CheckboxWrapper = styled.span<{ checked: boolean }>`
  display: inline-flex;
  vertical-align: middle;
  position: relative;
  width: 1em;
  height: 1em;
  border: 4px solid ${themeColor("primary")};
  border-radius: 5px;
  background: ${(props) =>
    props.checked ? themeColor("primary")(props) : "transparent"};
`;

export const CheckboxInput = styled.input`
  cursor: pointer;
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
`;

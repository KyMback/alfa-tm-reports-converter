import styled from "styled-components";
import { lessOrEqualTo, themeColor } from "styles/helpers";

export const CheckboxWrapper = styled.span<{ checked: boolean }>`
  position: relative;

  display: inline-flex;
  vertical-align: middle;

  width: 22px;
  height: 22px;

  border: 4px solid ${themeColor("primary")};
  border-radius: 5px;

  background: ${(props) =>
    props.checked ? themeColor("primary")(props) : "transparent"};

  @media (${lessOrEqualTo.tablet}) {
    border-width: 2px;

    width: 21px;
    height: 21px;
  }
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

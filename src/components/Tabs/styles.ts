import styled from "styled-components";
import { themeColor } from "styles/helpers";

export const TabsWrapper = styled.div`
  width: 100%;
`;

export const TabsHeadersWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const Tab = styled.button`
  padding: 0;
  width: 100%;
  border: none;
  cursor: pointer;
  background: transparent;
`;

export const TabTitle = styled.div<{ active: boolean }>`
  padding: 14px 0;
  font-size: 24px;
  line-height: 28px;
  color: ${(props) =>
    props.active
      ? themeColor("primary")(props)
      : themeColor("onSurface")(props)};
  font-weight: ${(props) => (props.active ? "bold" : "500")};
`;

export const TabLine = styled.div<{ active: boolean }>`
  height: 4px;
  border-radius: 20px;
  background: ${(props) =>
    props.active
      ? themeColor("secondary")(props)
      : themeColor("onSurface")(props)};
`;

export const TabContentWrapper = styled.div``;

export const TabContent = styled.div``;

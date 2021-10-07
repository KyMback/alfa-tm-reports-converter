import styled from "styled-components";
import { themeColor } from "styles/helpers";

export const FooterWrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  z-index: 1000;
  box-shadow: 10px 0 30px ${themeColor("shadow")};
  padding: 20px 160px;
`;

export const DownloadFormatsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Text = styled.span`
  margin-right: 20px;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
`;

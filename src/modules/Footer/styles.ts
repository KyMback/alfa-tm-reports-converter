import styled from "styled-components";
import { themeColor } from "styles/utils";

export const FooterWrapper = styled.footer`
  box-shadow: 10px 0 30px ${themeColor("shadow")};
  padding: 20px 160px;
  display: flex;
  justify-content: space-between;
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

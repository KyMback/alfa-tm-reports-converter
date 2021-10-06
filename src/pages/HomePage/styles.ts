import styled from "styled-components";
import { themeColor } from "styles/utils";
import { Button } from "components/Button";

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 70px;
  padding-bottom: 50px;
`;

export const DropZone = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: ${themeColor("secondary")};
  color: ${themeColor("primary")};
  border: 5px solid ${themeColor("primary")};
  border-radius: 40px;
  font-size: 40px;
  line-height: 48px;
  font-weight: bold;
`;

export const MainContentWrapper = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;

export const InfoWrapper = styled.div`
  width: 520px;
  text-align: center;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 45px;
  margin-top: 45px;
`;

export const Image = styled.img`
  height: 460px;
`;

export const AttachButton = styled(Button)`
  font-size: 24px;
  line-height: 29px;
`;

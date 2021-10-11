import styled from "styled-components";
import { moreOrEqualTo, themeColor } from "styles/helpers";
import { Button } from "components/Button";

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: min-content;
  align-self: center;
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
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (${moreOrEqualTo.laptop}) {
    margin-left: 20px;
  }
`;

export const InfoWrapper = styled.div`
  text-align: center;

  margin-bottom: 25px;

  font-size: 20px;
  line-height: 24px;

  @media (${moreOrEqualTo.laptop}) {
    margin-bottom: 45px;

    font-size: 24px;
    line-height: 28px;
  }
`;

export const Image = styled.img`
  width: 250px;

  @media (${moreOrEqualTo.tablet}) {
    width: 380px;
  }

  @media (${moreOrEqualTo.laptop}) {
    width: 460px;
  }

  @media (${moreOrEqualTo.laptopL}) {
    width: 520px;
  }
`;

export const AttachButton = styled(Button)`
  width: 100%;

  @media (${moreOrEqualTo.laptop}) {
    font-size: 24px;
    line-height: 29px;
  }
`;

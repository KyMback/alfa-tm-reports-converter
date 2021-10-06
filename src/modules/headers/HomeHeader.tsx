import { HeaderTitle, HeaderTitleLink, HomeHeaderWrapper } from "./styles";

export const HomeHeader = () => {
  return (
    <HomeHeaderWrapper>
      <HeaderTitleLink href="/">
        <HeaderTitle>Alfa Converter</HeaderTitle>
      </HeaderTitleLink>
    </HomeHeaderWrapper>
  );
};

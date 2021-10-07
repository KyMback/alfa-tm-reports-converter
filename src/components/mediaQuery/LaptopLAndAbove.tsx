import { PropsWithChildren } from "react";
import { useMediaQuery } from "react-responsive";
import { devicesMinSizes } from "styles/themes";

export const LaptopLAndAbove = ({ children }: PropsWithChildren<{}>) => {
  const isLaptopAndAbove = useMediaQuery({ minWidth: devicesMinSizes.laptopL });
  return isLaptopAndAbove ? <>{children}</> : null;
};

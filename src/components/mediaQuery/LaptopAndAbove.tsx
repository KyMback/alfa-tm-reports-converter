import { PropsWithChildren } from "react";
import { useMediaQuery } from "react-responsive";
import { devicesMinSizes } from "styles/themes";

export const LaptopAndAbove = ({ children }: PropsWithChildren<{}>) => {
  const isLaptopAndAbove = useMediaQuery({ minWidth: devicesMinSizes.laptop });
  return isLaptopAndAbove ? <>{children}</> : null;
};

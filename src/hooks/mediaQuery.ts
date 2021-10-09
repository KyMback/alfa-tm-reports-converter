import { useMediaQuery } from "react-responsive";
import { devicesMaxSizes, devicesMinSizes } from "styles/themes";

export const useTabletOrBelow = () => {
  return useMediaQuery({ maxWidth: devicesMaxSizes.tablet });
};

export const useLaptopOrAbove = () => {
  return useMediaQuery({ minWidth: devicesMinSizes.laptop });
};

export const useLaptopLOrAbove = () => {
  return useMediaQuery({ minWidth: devicesMinSizes.laptopL });
};

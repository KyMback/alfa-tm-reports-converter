import { round } from "utils/math";

interface Props {
  number: number;
}

export const NumberCell = ({ number }: Props) => {
  return <>{round(number, 2)}</>;
};

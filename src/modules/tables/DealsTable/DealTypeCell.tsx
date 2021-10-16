import { Deal } from "typings/internal";

interface Props {
  type: Deal["type"];
}

export const DealTypeCell = ({ type }: Props) => {
  switch (type) {
    case "Sell":
      return "Продажа";
    case "Buy":
      return "Покупка";
    default:
      return null;
  }
};

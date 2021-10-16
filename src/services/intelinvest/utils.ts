import { StockBuySell, SubOperationType } from "./typings";
import { Deal } from "typings/internal";

export const getNoteForDealBySubOperation = (
  instrument: string,
  subOperationType: SubOperationType,
) => {
  switch (subOperationType) {
    case "MONEYDEPOSIT":
      return `Зачисление денег за сделку по ${instrument}`;
    case "MONEYWITHDRAW":
      return `Списание денег за сделку по ${instrument}`;
    default:
      throw new Error("Unsupported operation");
  }
};

export const dealTypeToIntelinvestType: Record<
  Deal["type"],
  "STOCKBUY" | "STOCKSELL"
> = {
  Buy: "STOCKBUY",
  Sell: "STOCKSELL",
};

export const stockBuySellToSubOperationType: Record<
  StockBuySell["TYPE"],
  SubOperationType
> = {
  STOCKBUY: "MONEYWITHDRAW",
  STOCKSELL: "MONEYDEPOSIT",
};

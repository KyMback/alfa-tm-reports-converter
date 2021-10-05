import { format } from "date-fns";
import { Dividend } from "typings/internal";

export const intelinvestCsvColumns = [
  "TYPE",
  "DATE",
  "TICKER",
  "QUANTITY",
  "PRICE",
  "FEE",
  "NKD",
  "NOMINAL",
  "CURRENCY",
  "FEE_CURRENCY",
  "NOTE",
  "LINK_ID",
];

export const dividendsToCsvItems = (dividends: Array<Dividend>) => {
  return dividends.flatMap<IntelinvestDividendDealItem>((dividend, index) => {
    const date = format(dividend.date, "dd.MM.yyyy");
    const netIncome = dividend.gross - (dividend.tax || 0);
    const linkId = index.toString();

    return [
      {
        TYPE: "DIVIDEND",
        CURRENCY: dividend.currency,
        TICKER: dividend.ticker,
        DATE: date,
        PRICE: (netIncome / dividend.count).toString(),
        QUANTITY: dividend.count.toString(),
        LINK_ID: linkId,
      },
      {
        TYPE: "MONEYDEPOSIT",
        CURRENCY: dividend.currency,
        PRICE: netIncome.toString(),
        DATE: date,
        LINK_ID: linkId,
        NOTE: `Зачисление дивидендов по акции ${dividend.ticker} от ${date}`,
      },
    ];
  });
};

type IntelinvestDividendDealItem =
  | IntelinvestDividendDeal
  | IntelinvestMoneyDeposit;

type IntelinvestDividendDeal = {
  TYPE: "DIVIDEND";
  DATE: string;
  TICKER: string;
  QUANTITY: string;
  PRICE: string;
  CURRENCY: string;
  LINK_ID: string;
};

type IntelinvestMoneyDeposit = {
  TYPE: "MONEYDEPOSIT";
  DATE: string;
  PRICE: string;
  CURRENCY: string;
  NOTE: string;
  LINK_ID: string;
};

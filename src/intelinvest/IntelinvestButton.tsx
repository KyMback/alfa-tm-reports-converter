import { Dividend } from "typings/internal";
import fileDownload from "js-file-download";
import { format } from "date-fns";
import { toCsv } from "utils/csv";

interface Props {
  dividends: Array<Dividend>;
}

export const IntelinvestButton = ({ dividends }: Props) => {
  return (
    <button onClick={() => download(dividends)}>
      Download Intelinvest import file
    </button>
  );
};

const columns = [
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

const download = (dividends: Array<Dividend>) => {
  const deals = dividends.flatMap<IntelinvestDividendDealItem>(
    (dividend, index) => {
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
    },
  );

  const csv = toCsv(columns, deals, ";");
  fileDownload(csv, `dividends.csv`);
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

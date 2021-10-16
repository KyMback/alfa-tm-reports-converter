import { Deal, Dividend } from "typings/internal";
import { toCsv } from "utils/csv";
import {
  dealTypeToIntelinvestType,
  getNoteForDealBySubOperation,
  stockBuySellToSubOperationType,
} from "./utils";
import { csvFileSeparator, intelinvestCsvColumns } from "./constants";
import { DividendDeal, MoneyWithdrawDeposit, StockBuySell } from "./typings";
import { shortDate } from "utils/date";

export class IntelinvestConvertingService {
  public getCsvImportFile = (
    deals: Array<Deal>,
    dividends: Array<Dividend>,
  ) => {
    const dealItems = this.dealsToCsvItems(deals, 0);
    const dividendsItems = this.dividendsToCsvItems(
      dividends,
      dealItems.length + 1,
    );

    return toCsv(
      intelinvestCsvColumns,
      [...dealItems, ...dividendsItems],
      csvFileSeparator,
    );
  };

  private dealsToCsvItems = (deals: Array<Deal>, firstFreeLinkId: number) => {
    return deals.flatMap<DealItem>((deal, index) => {
      const dealType = dealTypeToIntelinvestType[deal.type];
      const subOperationType = stockBuySellToSubOperationType[dealType];
      const date = shortDate(deal.date);
      const linkId = (firstFreeLinkId + index).toString();

      return [
        {
          TYPE: dealType,
          DATE: date,
          TICKER: deal.ticker,
          QUANTITY: deal.count.toString(),
          PRICE: deal.price.toString(),
          CURRENCY: deal.priceCurrency,
          LINK_ID: linkId,
        },
        {
          TYPE: subOperationType,
          DATE: date,
          PRICE: deal.sum.toString(),
          CURRENCY: deal.sumCurrency,
          NOTE: getNoteForDealBySubOperation(deal.instrument, subOperationType),
          LINK_ID: linkId,
        },
      ];
    });
  };

  private dividendsToCsvItems = (
    dividends: Array<Dividend>,
    firstFreeLinkId: number,
  ) => {
    return dividends.flatMap<DividendItem>((dividend, index) => {
      const date = shortDate(dividend.date);
      const netIncome = dividend.gross - (dividend.tax || 0);
      const linkId = (firstFreeLinkId + index).toString();

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
}

type DividendItem =
  | DividendDeal
  | (MoneyWithdrawDeposit & { TYPE: "MONEYDEPOSIT" });
type DealItem = StockBuySell | MoneyWithdrawDeposit;

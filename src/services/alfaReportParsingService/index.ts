import { read, Sheet } from "xlsx";
import { getTitle } from "./utils";
import { dealsTitle, depositsWithdrawals, incomeOutgoings } from "./constants";
import { parseIncomeOutgoings } from "./parts/incomeOutgoings";
import { parseDeals } from "./parts/deals";
import { parseDepositsWithdrawals } from "./parts/depositsWithdrawals";
import { ParseResult } from "typings/parsing";

const maxRowIndexRegexp = /\d+$/;

export class AlfaReportParsingService {
  public parse = async (report: File): Promise<ParseResult> => {
    const buffer = await report.arrayBuffer();
    const book = read(buffer, { type: "array" });

    if (book.SheetNames[0] !== "История сделок") {
      throw new Error("Incorrect file format");
    }

    const sheet = book.Sheets[book.SheetNames[0]];
    const rowsCount = getRowsCount(sheet);

    const result: ParseResult = {
      deals: [],
      incomes: [],
      outgoings: [],
      depositsWithdrawals: [],
    };

    for (let index = 5; index < rowsCount; index++) {
      const title = getTitle(sheet, index);

      switch (title) {
        case dealsTitle: {
          const dealsResult = parseDeals(sheet, index, rowsCount);
          index += dealsResult.parsedRows;
          result.deals = dealsResult.deals;
          break;
        }
        case incomeOutgoings: {
          const incomeOutgoings = parseIncomeOutgoings(sheet, index, rowsCount);
          index += incomeOutgoings.parsedRows;
          result.incomes = incomeOutgoings.incomes;
          result.outgoings = incomeOutgoings.outgoings;
          break;
        }
        case depositsWithdrawals: {
          const incomeOutgoings = parseDepositsWithdrawals(
            sheet,
            index,
            rowsCount,
          );
          index += incomeOutgoings.parsedRows;
          result.depositsWithdrawals = incomeOutgoings.depositsWithdrawals;
          break;
        }
      }
    }

    return result;
  };
}

const getRowsCount = (sheet: Sheet) => {
  const ref = sheet["!ref"];

  if (!ref) {
    throw new Error("Incorrect file format");
  }

  return Number(maxRowIndexRegexp.exec(ref)![0]);
};

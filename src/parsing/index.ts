import { read } from "xlsx";
import { getTitle } from "./utils";
import { dealsTitle, depositsWithdrawals, incomeOutgoings } from "./constants";
import { parseIncomeOutgoings } from "./parts/incomeOutgoings";
import { DealItemParsingResult, parseDeals } from "./parts/deals";
import {
  DepositsWithdrawals,
  parseDepositsWithdrawals,
} from "./parts/depositsWithdrawals";
import { IncomeParsingResult } from "./parts/incomeOutgoings/incomes";
import { OutgoingsParsingResult } from "./parts/incomeOutgoings/outgoings";

export interface ParseResult {
  deals: Array<DealItemParsingResult>;
  incomes: Array<IncomeParsingResult>;
  outgoings: Array<OutgoingsParsingResult>;
  depositsWithdrawals: Array<DepositsWithdrawals>;
}

const maxRowIndexRegexp = /\d+$/;

export const parse = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const book = read(buffer, { type: "array" });
  if (book.SheetNames[0] !== "История сделок") {
    throw new Error("Incorrect file format");
  }

  const sheet = book.Sheets[book.SheetNames[0]];

  const ref = sheet["!ref"];

  if (!ref) {
    throw new Error("Incorrect file format");
  }

  const maxIndex = Number(maxRowIndexRegexp.exec(ref)![0]);

  const result: ParseResult = {
    deals: [],
    incomes: [],
    outgoings: [],
    depositsWithdrawals: [],
  };

  for (let index = 5; index < maxIndex; index++) {
    const title = getTitle(sheet, index);

    switch (title) {
      case dealsTitle: {
        const dealsResult = parseDeals(sheet, index, maxIndex);
        index = dealsResult.newIndex - 1;
        result.deals = dealsResult.deals;
        break;
      }
      case incomeOutgoings: {
        const incomeOutgoings = parseIncomeOutgoings(sheet, index, maxIndex);
        index = incomeOutgoings.newIndex - 1;
        result.incomes = incomeOutgoings.incomes;
        result.outgoings = incomeOutgoings.outgoings;
        break;
      }
      case depositsWithdrawals: {
        const incomeOutgoings = parseDepositsWithdrawals(
          sheet,
          index,
          maxIndex,
        );
        index = incomeOutgoings.newIndex - 1;
        result.depositsWithdrawals = incomeOutgoings.depositsWithdrawals;
        break;
      }
    }
  }

  return result;
};

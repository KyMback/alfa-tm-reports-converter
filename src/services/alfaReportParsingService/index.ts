import { read, Sheet } from "xlsx";
import { getTitle } from "./utils";
import {
  dealsTitle,
  depositsWithdrawals,
  incomeTitle,
  outgoingsTitle,
  sheetName,
} from "./constants";
import { ParseResult } from "typings/parsing";
import { parseIncomeItem } from "services/alfaReportParsingService/parts/incomes";
import { parseOutgoingsItem } from "services/alfaReportParsingService/parts/outgoings";

const maxRowIndexRegexp = /\d+$/;
const titleAndTableHeaderRowsCount = 2;

export class AlfaReportParsingService {
  public parse = async (report: File): Promise<ParseResult> => {
    const buffer = await report.arrayBuffer();
    const book = read(buffer, { type: "array", sheets: sheetName });

    const sheet = book.Sheets[sheetName];
    if (!sheet) {
      throw new Error("Incorrect file format");
    }

    const rowsCount = getRowsCount(sheet);

    const result: ParseResult = {
      deals: [],
      incomes: [],
      outgoings: [],
      depositsWithdrawals: [],
    };

    let rowType: RowType | null = null;

    for (let index = 5; index < rowsCount; index++) {
      const newType = getRowsType(sheet, index);

      if (newType.skipRow) {
        rowType = null;
        continue;
      }

      if (newType.newType) {
        rowType = newType.newType;
        index += titleAndTableHeaderRowsCount;
      }

      switch (rowType) {
        case "deals":
          // TODO: Not supported now
          break;
        case "income": {
          const incomeResult = parseIncomeItem(sheet, index);
          if ("result" in incomeResult) {
            result.incomes.push(incomeResult.result);
          }
          break;
        }
        case "outgoings": {
          const outgoingsItem = parseOutgoingsItem(sheet, index);
          if ("result" in outgoingsItem) {
            result.outgoings.push(outgoingsItem.result);
          }
          break;
        }
        case "depositsWithdrawals":
          // TODO: Not supported now
          break;
      }
    }

    return result;
  };
}

type RowType = "deals" | "income" | "outgoings" | "depositsWithdrawals";

const getRowsType = (
  sheet: Sheet,
  index: number,
): {
  skipRow?: boolean;
  newType?: RowType;
} => {
  const title = getTitle(sheet, index);

  if (!title) {
    return {
      skipRow: true,
    };
  }

  switch (title) {
    case dealsTitle: {
      return {
        newType: "deals",
      };
    }
    case incomeTitle: {
      return {
        newType: "income",
      };
    }
    case outgoingsTitle: {
      return {
        newType: "outgoings",
      };
    }
    case depositsWithdrawals: {
      return {
        newType: "depositsWithdrawals",
      };
    }
  }

  // Empty value === old type
  return {};
};

const getRowsCount = (sheet: Sheet) => {
  const ref = sheet["!ref"];

  if (!ref) {
    throw new Error("Incorrect file format");
  }

  return Number(maxRowIndexRegexp.exec(ref)![0]);
};

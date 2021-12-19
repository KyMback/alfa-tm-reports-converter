import { AlfaParseResult } from "services/alfaReportParsingService/alfaTypings";
import { read, Sheet } from "xlsx";
import {
  dealsTitles,
  depositsWithdrawals,
  incomeTitle,
  outgoingsTitle,
  sheetName,
} from "services/alfaReportParsingService/constants";
import { parseDealsItems } from "services/alfaReportParsingService/parts/deals";
import { parseIncomeItem } from "services/alfaReportParsingService/parts/incomes";
import { parseOutgoingsItem } from "services/alfaReportParsingService/parts/outgoings";
import { getTitle } from "services/alfaReportParsingService/utils";

export interface IAlfaReportParsingService {
  parse(file: File): Promise<AlfaParseResult>;
}

const maxRowIndexRegexp = /\d+$/;
const titleAndTableHeaderRowsCount = 2;

export class AlfaReportParsingService implements IAlfaReportParsingService {
  public parse = async (report: File): Promise<AlfaParseResult> => {
    const buffer = await report.arrayBuffer();
    const book = read(buffer, { type: "array", sheets: sheetName });

    const sheet = book.Sheets[sheetName];
    if (!sheet) {
      throw new Error("Incorrect file format");
    }

    const rowsCount = getRowsCount(sheet);

    const result: AlfaParseResult = {
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
          const deal = parseDealsItems(sheet, index);
          if ("result" in deal) {
            result.deals.push(deal.result);
          }
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

  const firstCorrect = titleToSupportedTypeCheckers.find((ch) =>
    ch.predicate(title),
  );

  if (firstCorrect) {
    return {
      newType: firstCorrect.type,
    };
  }

  // Empty value === old type
  return {};
};

const titleToSupportedTypeCheckers: Array<{
  predicate: (title: string) => boolean;
  type: RowType;
}> = [
  {
    type: "deals",
    predicate: (title) => dealsTitles.some((t) => title.includes(t)),
  },
  {
    type: "depositsWithdrawals",
    predicate: (title) => title.includes(depositsWithdrawals),
  },
  {
    type: "income",
    predicate: (title) => title === incomeTitle,
  },
  {
    type: "outgoings",
    predicate: (title) => title === outgoingsTitle,
  },
];

const getRowsCount = (sheet: Sheet) => {
  const ref = sheet["!ref"];

  if (!ref) {
    throw new Error("Incorrect file format");
  }

  return Number(maxRowIndexRegexp.exec(ref)![0]);
};

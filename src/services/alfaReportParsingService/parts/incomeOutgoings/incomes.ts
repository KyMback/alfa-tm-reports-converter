import { WorkSheet } from "xlsx";
import {
  generateRows,
  getTitle,
  parseCellDate,
  parseCellNumber,
  parseCellString,
} from "../../utils";
import {
  incomeTitle,
  skipTitleAndHeader,
  supportedIncomeTypes,
} from "../../constants";
import { IncomeParsingResult } from "typings/parsing";

export const parseIncome = (
  sheet: WorkSheet,
  startIndex: number,
  maxIndex: number,
): { incomes: Array<IncomeParsingResult>; parsedRows: number } => {
  if (getTitle(sheet, startIndex) !== incomeTitle) {
    throw new Error("Incorrect format");
  }

  const income: Array<IncomeParsingResult> = [];
  const rows = generateRows(sheet, maxIndex, startIndex + skipTitleAndHeader);
  let parsedRows = skipTitleAndHeader;
  for (const row of rows) {
    parsedRows++;

    const typeCell = row.B;
    if (!typeCell) {
      break;
    }

    if (!supportedIncomeTypes.includes(String(typeCell.v))) {
      // TODO: currently do not support other incomes
      continue;
    }

    if (
      !row.A ||
      !row.C ||
      !row.D ||
      !row.E ||
      !row.F ||
      !row.G ||
      !row.H ||
      !row.I
    ) {
      throw new Error(
        `Missed required cells for income in row with index: ${row.index}`,
      );
    }

    income.push({
      date: parseCellDate(row.A),
      incomeForOne: parseCellNumber(row.C),
      currency: parseCellString(row.D),
      count: parseCellNumber(row.E),
      instrument: parseCellString(row.F),
      ticker: parseCellString(row.G),
      isin: parseCellString(row.H),
      gross: parseCellNumber(row.I),
    });
  }

  return {
    incomes: income,
    parsedRows: parsedRows - 1,
  };
};

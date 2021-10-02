import { WorkSheet } from "xlsx";
import {
  getCell,
  getTitle,
  isPartOrSubpart,
  parseDate,
  parseNumber,
  parseString,
} from "../../utils";
import {
  incomeTitle,
  skipTitleAndHeader,
  supportedIncomeTypes,
} from "../../constants";
import { IncomeParsingResult } from "typings/parsing";

export const parseIncome = (
  sheet: WorkSheet,
  index: number,
  maxIndex: number,
): { incomes: Array<IncomeParsingResult>; newIndex: number } => {
  if (getTitle(sheet, index) !== incomeTitle) {
    throw new Error("Incorrect format");
  }

  let curIndex = index + skipTitleAndHeader;

  const income: Array<IncomeParsingResult> = [];
  for (; curIndex < maxIndex; curIndex++) {
    if (isPartOrSubpart(sheet, curIndex)) {
      return {
        incomes: income,
        newIndex: curIndex,
      };
    }

    const type = String(getCell(sheet, "B", curIndex).v);
    if (!supportedIncomeTypes.includes(type)) {
      // TODO: currently do not support other incomes
      continue;
    }

    income.push({
      date: parseDate(sheet, "A", curIndex),
      incomeForOne: parseNumber(sheet, "C", curIndex),
      currency: parseString(sheet, "D", curIndex),
      count: parseNumber(sheet, "E", curIndex),
      instrument: parseString(sheet, "F", curIndex),
      ticker: parseString(sheet, "G", curIndex),
      isin: parseString(sheet, "H", curIndex),
      gross: parseNumber(sheet, "I", curIndex),
    });
  }

  return {
    incomes: income,
    newIndex: curIndex,
  };
};

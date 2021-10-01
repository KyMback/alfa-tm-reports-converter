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

export type IncomeParsingResult = {
  date: Date;
  currency: string;
  incomeForOne: number;
  allIncome: number;
  count: number;
  ticker: string;
  instrument: string;
  isin: string;
};

export const parseIncome = (
  sheet: WorkSheet,
  index: number,
  maxIndex: number,
): { income: Array<IncomeParsingResult>; newIndex: number } => {
  if (getTitle(sheet, index) !== incomeTitle) {
    throw new Error("Incorrect format");
  }

  let curIndex = index + skipTitleAndHeader;

  const income: Array<IncomeParsingResult> = [];
  for (; curIndex < maxIndex; curIndex++) {
    if (isPartOrSubpart(sheet, curIndex)) {
      return {
        income: income,
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
      allIncome: parseNumber(sheet, "I", curIndex),
    });
  }

  return {
    income: income,
    newIndex: curIndex,
  };
};

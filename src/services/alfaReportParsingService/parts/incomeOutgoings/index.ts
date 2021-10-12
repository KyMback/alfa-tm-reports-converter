import { WorkSheet } from "xlsx";
import { getTitle } from "../../utils";
import { incomeOutgoings, outgoingsTitle } from "../../constants";
import { parseOutgoings } from "./outgoings";
import { parseIncome } from "./incomes";
import { IncomeParsingResult, OutgoingsParsingResult } from "typings/parsing";

export const parseIncomeOutgoings = (
  sheet: WorkSheet,
  index: number,
  maxIndex: number,
): {
  incomes: Array<IncomeParsingResult>;
  outgoings: Array<OutgoingsParsingResult>;
  parsedRows: number;
} => {
  if (getTitle(sheet, index) !== incomeOutgoings) {
    throw new Error("Incorrect format");
  }
  const parsedTitleRows = 1;

  const incomeTitleIndex = index + parsedTitleRows;
  const incomeResult = parseIncome(sheet, incomeTitleIndex, maxIndex);
  const outgoingsStartIndex = getOutgoingsStartIndex(
    sheet,
    incomeTitleIndex + incomeResult.parsedRows,
    maxIndex,
  );

  if (!outgoingsStartIndex) {
    return {
      incomes: incomeResult.incomes,
      outgoings: [],
      parsedRows: incomeResult.parsedRows + parsedTitleRows,
    };
  }

  const outgoingsResult = parseOutgoings(sheet, outgoingsStartIndex, maxIndex);

  return {
    incomes: incomeResult.incomes,
    outgoings: outgoingsResult.outgoings,
    parsedRows:
      incomeResult.parsedRows + outgoingsResult.parsedRows + parsedTitleRows,
  };
};

const getOutgoingsStartIndex = (
  sheet: WorkSheet,
  startIndex: number,
  maxIndex: number,
) => {
  for (let i = startIndex; i < maxIndex; i++) {
    if (getTitle(sheet, i) === outgoingsTitle) {
      return i;
    }
  }
};

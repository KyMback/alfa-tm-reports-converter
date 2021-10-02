import { WorkSheet } from "xlsx";
import { getTitle } from "../../utils";
import { incomeOutgoings } from "../../constants";
import { OutgoingsParsingResult, parseOutgoings } from "./outgoings";
import { IncomeParsingResult, parseIncome } from "./incomes";

export const parseIncomeOutgoings = (
  sheet: WorkSheet,
  index: number,
  maxIndex: number,
): {
  incomes: Array<IncomeParsingResult>;
  outgoings: Array<OutgoingsParsingResult>;
  newIndex: number;
} => {
  if (getTitle(sheet, index) !== incomeOutgoings) {
    throw new Error("Incorrect format");
  }

  const incomeResult = parseIncome(sheet, index + 1, maxIndex);
  const outgoingsResult = parseOutgoings(
    sheet,
    incomeResult.newIndex,
    maxIndex,
  );

  return {
    incomes: incomeResult.incomes,
    outgoings: outgoingsResult.outgoings,
    newIndex: outgoingsResult.newIndex,
  };
};

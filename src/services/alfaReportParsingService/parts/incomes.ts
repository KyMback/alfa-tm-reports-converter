import { Sheet } from "xlsx";
import { getCell, parseDate, parseNumber, parseString } from "../utils";
import { supportedIncomeTypes } from "../constants";
import { IncomeParsingResult } from "typings/parsing";

export const parseIncomeItem = (
  sheet: Sheet,
  index: number,
): IncomeParseResult => {
  const typeCell = getCell(sheet, "B", index);
  if (!typeCell) {
    return { incorrectFormat: true };
  }

  if (!supportedIncomeTypes.includes(String(typeCell.v))) {
    // TODO: currently do not support other incomes
    return { notSupportedType: true };
  }

  return {
    result: {
      date: parseDate(sheet, "A", index),
      incomeForOne: parseNumber(sheet, "C", index),
      currency: parseString(sheet, "D", index),
      count: parseNumber(sheet, "E", index),
      instrument: parseString(sheet, "F", index),
      ticker: parseString(sheet, "G", index),
      isin: parseString(sheet, "H", index),
      gross: parseNumber(sheet, "I", index),
    },
  };
};

type IncomeParseResult =
  | {
      notSupportedType: true;
    }
  | {
      incorrectFormat: true;
    }
  | {
      result: IncomeParsingResult;
    };

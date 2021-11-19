import {
  AlfaDeal,
  AlfaDealType,
} from "services/alfaReportParsingService/alfaTypings";
import { Sheet } from "xlsx";
import { getCell, parseDate, parseNumber, parseString } from "./../utils";
import { supportedDealsTypes } from "./../constants";

export const parseDealsItems = (
  sheet: Sheet,
  index: number,
): DealParseResult => {
  const typeCell = getCell(sheet, "B", index);
  if (!typeCell) {
    return { incorrectFormat: true };
  }

  const type = typeCell.v;
  if (!isSupportedType(type)) {
    // TODO: currently do not support other deals
    return { notSupportedType: true };
  }

  const isDealFromPlatform = !!getCell(sheet, "K", index);

  return {
    result: {
      date: isDealFromPlatform
        ? parseDate(sheet, "K", index)
        : parseDate(sheet, "A", index),
      type: type,
      price: parseNumber(sheet, "C", index),
      priceCurrency: parseString(sheet, "D", index),
      count: parseNumber(sheet, "E", index),
      instrument: parseString(sheet, "F", index),
      ticker: parseString(sheet, "G", index),
      isin: parseString(sheet, "H", index),
      sum: parseNumber(sheet, "I", index),
      sumCurrency: parseString(sheet, "J", index),
    },
  };
};

const isSupportedType = (x: unknown): x is AlfaDealType => {
  return supportedDealsTypes.includes(x as AlfaDealType);
};

type DealParseResult =
  | {
      notSupportedType: true;
    }
  | {
      incorrectFormat: true;
    }
  | {
      result: AlfaDeal;
    };

import { Sheet } from "xlsx";
import { getCell, parseDate, parseNumber, parseString } from "../utils";
import { supportedOutgoingsTypes } from "../constants";
import { AlfaOutgoing } from "services/alfaReportParsingService/alfaTypings";

const typeRegexp = /.+акциям (.+) (\d+\.00)/;

export const parseOutgoingsItem = (
  sheet: Sheet,
  index: number,
): OutgoingsParseResult => {
  const typeCell = getCell(sheet, "B", index);
  if (!typeCell) {
    return { incorrectFormat: true };
  }

  const type = String(typeCell.v);

  if (!supportedOutgoingsTypes.find((supported) => type.includes(supported))) {
    // TODO: currently do not support other incomes
    return { notSupportedType: true };
  }

  return {
    result: {
      ...parseInstrumentAndCount(type, index),
      date: parseDate(sheet, "A", index),
      sum: parseNumber(sheet, "I", index),
      currency: parseString(sheet, "J", index),
    },
  };
};

const parseInstrumentAndCount = (type: string, rowIndex: number) => {
  const instrumentAndCount = typeRegexp.exec(type);
  if (instrumentAndCount == null) {
    throw new Error(`Can't parse cell B${rowIndex}`);
  }
  const instrument = instrumentAndCount[1];
  const count = Number(instrumentAndCount[2]);

  return { instrument, count };
};

type OutgoingsParseResult =
  | {
      notSupportedType: true;
    }
  | {
      incorrectFormat: true;
    }
  | {
      result: AlfaOutgoing;
    };

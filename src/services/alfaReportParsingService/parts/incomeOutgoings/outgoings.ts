import { WorkSheet } from "xlsx";
import {
  generateRows,
  getTitle,
  parseCellDate,
  parseCellNumber,
  parseCellString,
} from "../../utils";
import {
  outgoingsTitle,
  skipTitleAndHeader,
  supportedOutgoingsTypes,
} from "../../constants";
import { OutgoingsParsingResult } from "typings/parsing";

const typeRegexp = /.+акциям (.+) (\d+\.00)/;

export const parseOutgoings = (
  sheet: WorkSheet,
  startIndex: number,
  maxIndex: number,
): { outgoings: Array<OutgoingsParsingResult>; parsedRows: number } => {
  if (getTitle(sheet, startIndex) !== outgoingsTitle) {
    throw new Error("Incorrect format");
  }

  const outgoings: Array<OutgoingsParsingResult> = [];
  const rows = generateRows(sheet, maxIndex, startIndex + skipTitleAndHeader);
  let parsedRows = skipTitleAndHeader;

  for (const row of rows) {
    parsedRows++;

    const typeCell = row.B;
    if (!typeCell) {
      break;
    }

    const type = String(typeCell.v);

    if (
      !supportedOutgoingsTypes.find((supported) => type.includes(supported))
    ) {
      // TODO: currently do not support other incomes
      continue;
    }

    if (!row.A || !row.I || !row.J) {
      throw new Error(
        `Missed required cells for outgoings in row with index: ${row.index}`,
      );
    }

    outgoings.push({
      ...parseInstrumentAndCount(type, row.index),
      date: parseCellDate(row.A),
      sum: parseCellNumber(row.I),
      currency: parseCellString(row.J),
    });
  }

  return {
    outgoings: outgoings,
    parsedRows: parsedRows - 1,
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

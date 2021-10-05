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
  outgoingsTitle,
  skipTitleAndHeader,
  supportedOutgoingsTypes,
} from "../../constants";
import { OutgoingsParsingResult } from "typings/parsing";

const typeRegexp = /.+акциям (.+) (\d+\.00)/;

export const parseOutgoings = (
  sheet: WorkSheet,
  index: number,
  maxIndex: number,
): { outgoings: Array<OutgoingsParsingResult>; newIndex: number } => {
  if (getTitle(sheet, index) !== outgoingsTitle) {
    throw new Error("Incorrect format");
  }

  let curIndex = index + skipTitleAndHeader;

  const outgoings: Array<OutgoingsParsingResult> = [];
  for (; curIndex < maxIndex; curIndex++) {
    if (isPartOrSubpart(sheet, curIndex)) {
      return {
        outgoings: outgoings,
        newIndex: curIndex,
      };
    }

    const type = String(getCell(sheet, "B", curIndex).v);

    if (
      !supportedOutgoingsTypes.find((supported) => type.includes(supported))
    ) {
      // TODO: currently do not support other outgoings
      continue;
    }

    const instrumentAndCount = typeRegexp.exec(type);
    if (instrumentAndCount == null) {
      throw new Error(`Can't parse cell B${curIndex}`);
    }
    const instrument = instrumentAndCount[1];
    const count = Number(instrumentAndCount[2]);

    outgoings.push({
      date: parseDate(sheet, "A", curIndex),
      instrument,
      count,
      sum: parseNumber(sheet, "I", curIndex),
      currency: parseString(sheet, "J", curIndex),
    });
  }

  return {
    outgoings: [],
    newIndex: curIndex,
  };
};

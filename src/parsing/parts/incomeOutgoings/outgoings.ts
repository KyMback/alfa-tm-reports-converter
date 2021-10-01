import { WorkSheet } from "xlsx";
import { getTitle } from "../../utils";
import { outgoingsTitle, skipTitleAndHeader } from "../../constants";

export type OutgoingsParsingResult = {};

export const parseOutgoings = (
  sheet: WorkSheet,
  index: number,
  maxIndex: number,
): { outgoings: Array<OutgoingsParsingResult>; newIndex: number } => {
  if (getTitle(sheet, index) !== outgoingsTitle) {
    throw new Error("Incorrect format");
  }

  const newIndex = index + skipTitleAndHeader;
  return {
    outgoings: [],
    newIndex: newIndex >= maxIndex ? maxIndex : newIndex,
  };
};

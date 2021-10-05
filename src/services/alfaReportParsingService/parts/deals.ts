import { WorkSheet } from "xlsx";
import { getTitle } from "../utils";
import { dealsTitle, skipTitleAndHeader } from "../constants";
import { DealItemParsingResult } from "typings/parsing";

export const parseDeals = (
  sheet: WorkSheet,
  index: number,
  maxIndex: number,
): { deals: Array<DealItemParsingResult>; newIndex: number } => {
  if (getTitle(sheet, index) !== dealsTitle) {
    throw new Error("Incorrect format");
  }
  // TODO: skip now

  const newIndex = index + skipTitleAndHeader;
  return {
    deals: [],
    newIndex: newIndex >= maxIndex ? maxIndex : newIndex,
  };
};

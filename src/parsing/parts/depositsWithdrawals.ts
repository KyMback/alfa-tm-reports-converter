import { WorkSheet } from "xlsx";
import { getTitle } from "../utils";
import { depositsWithdrawals, skipTitleAndHeader } from "../constants";

export type DepositsWithdrawals = {};

export const parseDepositsWithdrawals = (
  sheet: WorkSheet,
  index: number,
  maxIndex: number,
): {
  depositsWithdrawals: Array<DepositsWithdrawals>;
  newIndex: number;
} => {
  if (getTitle(sheet, index) !== depositsWithdrawals) {
    throw new Error("Incorrect format");
  }

  const newIndex = index + skipTitleAndHeader;
  return {
    depositsWithdrawals: [],
    newIndex: newIndex >= maxIndex ? maxIndex : newIndex,
  };
};

import { WorkSheet } from "xlsx";
import { getTitle } from "../utils";
import { depositsWithdrawals, skipTitleAndHeader } from "../constants";
import { DepositsWithdrawals } from "typings/parsing";

export const parseDepositsWithdrawals = (
  sheet: WorkSheet,
  index: number,
  maxIndex: number,
): {
  depositsWithdrawals: Array<DepositsWithdrawals>;
  parsedRows: number;
} => {
  if (getTitle(sheet, index) !== depositsWithdrawals) {
    throw new Error("Incorrect format");
  }

  return {
    depositsWithdrawals: [],
    parsedRows: skipTitleAndHeader,
  };
};

import { CellObject, WorkSheet } from "xlsx";
import { parse } from "date-fns";

const supportedColumns = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
] as const;

type Column = typeof supportedColumns[number];

const referenceDate = new Date(0, 0, 0, 12, 0, 0, 0);

export const getCell = (
  sheet: WorkSheet,
  column: Column,
  index: number,
): CellObject | undefined => {
  return sheet[`${column}${index}`];
};

export const getTitle = (sheet: WorkSheet, index: number) => {
  return String(getCell(sheet, "A", index)?.v || "");
};

export const parseDate = (sheet: WorkSheet, column: Column, index: number) => {
  const cell = getCell(sheet, column, index);
  if (typeof cell?.v !== "string") {
    return throwParseError("string", column, index);
  }

  return parse(cell.v, "dd.MM.yyyy", referenceDate);
};

export const parseNumber = (
  sheet: WorkSheet,
  column: Column,
  index: number,
) => {
  const cell = getCell(sheet, column, index);
  if (typeof cell?.v !== "number") {
    return throwParseError("number", column, index);
  }

  return Number(cell.v);
};

export const parseString = (
  sheet: WorkSheet,
  column: Column,
  index: number,
) => {
  const cell = getCell(sheet, column, index);
  if (typeof cell?.v !== "string") {
    return throwParseError("string", column, index);
  }

  return cell.v;
};

const throwParseError = (
  expectedType: string,
  column: string,
  index: number,
): never => {
  throw new Error(`Expected to be ${expectedType} in ${column}${index} cell`);
};

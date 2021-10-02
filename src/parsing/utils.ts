import { CellObject, WorkSheet } from "xlsx";
import { parse } from "date-fns";
import { partsAndSubParts } from "./constants";

type Column = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J";

const referenceDate = new Date(0, 0, 0, 12, 0, 0, 0);

export const getCell = (
  sheet: WorkSheet,
  column: string,
  index: number,
): CellObject => {
  return sheet[`${column}${index}`];
};

export const getTitle = (sheet: WorkSheet, index: number) => {
  return String(sheet[`A${index}`].v);
};

export const parseDate = (sheet: WorkSheet, column: Column, index: number) => {
  const cell = getCell(sheet, column, index);
  if (typeof cell.v !== "string") {
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
  if (typeof cell.v !== "number") {
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
  if (typeof cell.v !== "string") {
    return throwParseError("string", column, index);
  }

  return cell.v;
};

export const isPartOrSubpart = (sheet: WorkSheet, index: number) => {
  return partsAndSubParts.includes(getTitle(sheet, index));
};

const throwParseError = (
  expectedType: string,
  column: string,
  index: number,
): never => {
  throw new Error(`Expected to be ${expectedType} in ${column}${index} cell`);
};

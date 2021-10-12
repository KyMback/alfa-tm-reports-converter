import { CellObject, WorkSheet } from "xlsx";
import { parse } from "date-fns";
import { partsAndSubParts } from "./constants";

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
  return String(sheet[`A${index}`]?.v || "");
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

export const parseCellDate = (cell: CellObject) => {
  if (typeof cell.v !== "string") {
    throw new Error("Expected string type");
  }

  return parse(cell.v, "dd.MM.yyyy", referenceDate);
};

export const parseCellNumber = (cell: CellObject) => {
  if (typeof cell.v !== "number") {
    throw new Error("Expected number type");
  }

  return Number(cell.v);
};

export const parseCellString = (cell: CellObject) => {
  if (typeof cell.v !== "string") {
    throw new Error("Expected string type");
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

export function* generateRows(
  sheet: WorkSheet,
  maxRows: number,
  startAt: number = 1,
) {
  for (let index = startAt; index < maxRows; index++) {
    yield supportedColumns.reduce(
      (accum, curr) =>
        Object.assign(accum, { [curr]: getCell(sheet, curr, index) }),
      <Row>{ index },
    );
  }
}

export interface Row extends Record<Column, CellObject | undefined> {
  index: number;
}

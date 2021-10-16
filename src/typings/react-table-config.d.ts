// see https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-table

import {
  UseFiltersColumnProps,
  UseGroupByColumnProps,
  UseResizeColumnsColumnProps,
  UseRowSelectHooks,
  UseRowSelectInstanceProps,
  UseRowSelectOptions,
  UseRowSelectRowProps,
  UseRowSelectState,
  UseSortByColumnProps,
} from "react-table";

declare module "react-table" {
  // take this file as-is, or comment out the sections that don't apply to your plugin configuration

  // @ts-ignore
  export interface TableOptions<
    D extends Record<string, unknown>,
  > extends UseRowSelectOptions<D>,
      // note that having Record here allows you to add anything to the options, this matches the spirit of the
      // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
      // feature set, this is a safe default.
      Record<string, any> {}

  // @ts-ignore
  export interface Hooks<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseRowSelectHooks<D> {}

  // @ts-ignore
  export interface TableInstance<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseRowSelectInstanceProps<D> {}

  // @ts-ignore
  export interface TableState<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseRowSelectState<D> {}

  // @ts-ignore
  export interface ColumnInterface<
    // eslint-disable-next-line no-unused-vars
    D extends Record<string, unknown> = Record<string, unknown>,
  > {}

  // @ts-ignore
  export interface ColumnInstance<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseFiltersColumnProps<D>,
      UseGroupByColumnProps<D>,
      UseResizeColumnsColumnProps<D>,
      UseSortByColumnProps<D> {}

  // @ts-ignore
  export interface Cell<
    // eslint-disable-next-line no-unused-vars
    D extends Record<string, unknown> = Record<string, unknown>,
    // eslint-disable-next-line no-unused-vars
    V = any,
  > {}

  // @ts-ignore
  export interface Row<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseRowSelectRowProps<D> {}
}

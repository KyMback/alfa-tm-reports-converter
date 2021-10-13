export const toCsv = <
  TKey extends string,
  TData extends Partial<Record<TKey, string>>,
>(
  columns: Array<TKey>,
  data: Array<TData>,
  separator: string,
) => {
  return [
    columns.join(separator),
    ...data.map((d) => columns.map((c) => d[c] || "").join(separator)),
  ].join("\r\n");
};

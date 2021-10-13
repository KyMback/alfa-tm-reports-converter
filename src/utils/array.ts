export const sortByDesc = <TItem>(
  array: Array<TItem>,
  by: (item: TItem) => Date | number,
) => {
  return array.sort((a, b) => {
    const aValue = by(a);
    const bValue = by(b);

    if (typeof aValue === "number" && typeof bValue === "number") {
      return bValue - aValue;
    }

    if (aValue instanceof Date && bValue instanceof Date) {
      return bValue.getTime() - aValue.getTime();
    }

    throw new Error("Incorrect sort value type");
  });
};

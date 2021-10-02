export const round = (value: number, decimals: number) => {
  const multiply = 10 ** decimals;
  return Math.round(value * multiply) / multiply;
};

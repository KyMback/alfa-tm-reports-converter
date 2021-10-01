export const dealsTitle = "1. Сделки с акциями";
export const incomeOutgoings =
  "2. Поступление дивидендов/ иные зачисления и списания  из ДУ";
export const depositsWithdrawals = "3. Пополнения/выводы с трастового счета";

export const incomeTitle = "Информация по зачислениям";
export const outgoingsTitle = "Информация по списаниям";

export const partsTitles = [
  dealsTitle,
  incomeOutgoings,
  depositsWithdrawals,
] as const;
export const partsAndSubParts = [...partsTitles, incomeTitle, outgoingsTitle];

export const skipTitleAndHeader = 2;

export const supportedIncomeTypes = ["Дивиденды"];

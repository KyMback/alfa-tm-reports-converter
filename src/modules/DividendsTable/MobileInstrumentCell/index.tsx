import { Dividend } from "typings/internal";
import { CurrencyText, DateText, MobileInstrumentCellWrapper } from "./styles";
import { format } from "date-fns";

interface Props {
  dividend: Dividend;
}

export const MobileInstrumentCell = ({ dividend }: Props) => {
  return (
    <MobileInstrumentCellWrapper>
      <span>{dividend.ticker}</span>
      <DateText>{format(dividend.date, "dd.MM.yyyy")}</DateText>
      <CurrencyText>{dividend.currency}</CurrencyText>
    </MobileInstrumentCellWrapper>
  );
};

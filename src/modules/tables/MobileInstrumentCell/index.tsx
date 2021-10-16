import { CurrencyText, DateText, MobileInstrumentCellWrapper } from "./styles";
import { shortDate } from "utils/date";

interface Props {
  ticker: string;
  date: Date;
  currency: string;
}

export const MobileInstrumentCell = ({ date, ticker, currency }: Props) => {
  return (
    <MobileInstrumentCellWrapper>
      <span>{ticker}</span>
      <DateText>{shortDate(date)}</DateText>
      <CurrencyText>{currency}</CurrencyText>
    </MobileInstrumentCellWrapper>
  );
};

import { shortDate } from "utils/date";

interface Props {
  date: Date;
}

export const DateCell = ({ date }: Props) => {
  return shortDate(date);
};

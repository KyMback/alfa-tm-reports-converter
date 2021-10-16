import { format } from "date-fns";

export const shortDate = (date: Date) => format(date, "dd.MM.yyyy");

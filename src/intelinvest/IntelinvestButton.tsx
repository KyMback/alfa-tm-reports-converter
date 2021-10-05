import { Dividend } from "typings/internal";
import fileDownload from "js-file-download";
import { toCsv } from "utils/csv";
import { dividendsToCsvItems, intelinvestCsvColumns } from "./converters";

interface Props {
  dividends: Array<Dividend>;
}

export const IntelinvestButton = ({ dividends }: Props) => {
  return (
    <button onClick={() => download(dividends)}>
      Download Intelinvest import file
    </button>
  );
};

const download = (dividends: Array<Dividend>) => {
  const items = dividendsToCsvItems(dividends);
  const csv = toCsv(intelinvestCsvColumns, items, ";");
  fileDownload(csv, `dividends.csv`);
};

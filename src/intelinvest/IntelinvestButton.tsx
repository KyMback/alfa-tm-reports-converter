import { Dividend } from "typings/internal";

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
  console.log(dividends);
};

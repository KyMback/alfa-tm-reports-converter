import { parse, ParseResult } from "./parsing";
import { DividendsTable } from "./dividends/DividendsTable";
import { useState } from "react";

export const App = () => {
  const [parsingResult, setParsingResult] = useState<ParseResult | undefined>();

  return (
    <>
      <input
        type="file"
        onChange={async (value) => {
          const file = value.target.files?.[0];
          if (!file) {
            return;
          }

          const result = await parse(file);
          setParsingResult(result);
        }}
      />
      {parsingResult && (
        <DividendsTable
          incomes={parsingResult.incomes}
          outgoings={parsingResult.outgoings}
        />
      )}
    </>
  );
};

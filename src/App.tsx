import { parse } from "./parsing";
import { DividendsTable } from "./internal/DividendsTable";
import { useMemo, useState } from "react";
import { ParseResult } from "typings/parsing";
import { getDividends } from "./internal/converters";
import { IntelinvestButton } from "./intelinvest/IntelinvestButton";

export const App = () => {
  const [parsingResult, setParsingResult] = useState<ParseResult | undefined>();
  const dividends = useMemo(
    () =>
      parsingResult &&
      getDividends(parsingResult.incomes, parsingResult.outgoings),
    [parsingResult?.incomes, parsingResult?.outgoings],
  );

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
      {dividends && (
        <div>
          <div>
            <IntelinvestButton dividends={dividends} />
          </div>
          <DividendsTable dividends={dividends} />
        </div>
      )}
    </>
  );
};

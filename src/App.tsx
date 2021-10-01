import { parse } from "./parsing";

export const App = () => {
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
          console.log(result);
        }}
      />
    </>
  );
};

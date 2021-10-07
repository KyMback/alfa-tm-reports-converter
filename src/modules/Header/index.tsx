import { HeaderTitle, HeaderTitleLink, HeaderWrapper } from "./styles";
import { Button } from "components/Button";
import { useDropzone } from "react-dropzone";
import { Reports } from "constants/reports";
import { RootStore } from "stores/rootStore";
import { observer } from "mobx-react-lite";
import { LaptopAndAbove } from "components/mediaQuery/LaptopAndAbove";

interface Props {
  rootStore: RootStore;
}

export const Header = observer(({ rootStore }: Props) => {
  const { getInputProps, open } = useDropzone({
    ...Reports.filesRestrictions,
    onDrop: async (files) => {
      if (files.length == 0) {
        return;
      }
      await rootStore.parseReport(files[0]);
    },
  });

  const withReport = rootStore.reportParsed;

  return (
    <HeaderWrapper onlyTitle={!withReport}>
      <HeaderTitleLink href="./">
        <HeaderTitle>Alfa Converter</HeaderTitle>
      </HeaderTitleLink>
      {withReport ? (
        <LaptopAndAbove>
          <Button onClick={open}>{"Загрузить другой отчёт"}</Button>
          <input {...getInputProps()} />
        </LaptopAndAbove>
      ) : null}
    </HeaderWrapper>
  );
});

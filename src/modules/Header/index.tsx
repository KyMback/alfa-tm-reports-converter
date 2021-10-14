import { HeaderTitle, HeaderTitleLink, HeaderWrapper } from "./styles";
import { Button } from "components/buttons";
import { useDropzone } from "react-dropzone";
import { Reports } from "constants/reports";
import { observer } from "mobx-react-lite";
import { useLaptopOrAbove } from "hooks/mediaQuery";
import { useRootStore } from "hooks/useRootStore";

export const Header = observer(() => {
  const rootStore = useRootStore();
  const isLaptopOrAbove = useLaptopOrAbove();
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
        <HeaderTitle>AlfaTM Converter</HeaderTitle>
      </HeaderTitleLink>
      {withReport && isLaptopOrAbove ? (
        <>
          <Button onClick={open}>{"Загрузить другой отчёт"}</Button>
          <input {...getInputProps()} />
        </>
      ) : null}
    </HeaderWrapper>
  );
});

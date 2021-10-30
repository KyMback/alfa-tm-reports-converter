import { HeaderTitle, HeaderTitleLink, HeaderWrapper } from "./styles";
import { Button } from "components/buttons";
import { useDropzone } from "react-dropzone";
import { Reports } from "constants/reports";
import { observer } from "mobx-react-lite";
import { useLaptopOrAbove } from "hooks/mediaQuery";
import { useRootStore } from "hooks/useRootStore";
import { useState } from "react";
import { HeaderStore } from "modules/Header/headerStore";

export const Header = observer(() => {
  const root = useRootStore();
  const [store] = useState(new HeaderStore(root));
  const isLaptopOrAbove = useLaptopOrAbove();
  const { getInputProps, open } = useDropzone({
    ...Reports.filesRestrictions,
    onDrop: store.loadReport,
  });

  return (
    <HeaderWrapper onlyTitle={!store.withReport}>
      <HeaderTitleLink href="./">
        <HeaderTitle>{"AlfaTM Converter"}</HeaderTitle>
      </HeaderTitleLink>
      {store.withReport && isLaptopOrAbove ? (
        <>
          <Button onClick={open}>{"Загрузить другой отчёт"}</Button>
          <input {...getInputProps()} />
        </>
      ) : null}
    </HeaderWrapper>
  );
});

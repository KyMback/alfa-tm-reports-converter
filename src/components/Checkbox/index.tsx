import { CheckboxInput, CheckboxWrapper } from "components/Checkbox/styles";

interface Props {
  onChange: () => void;
  checked: boolean;
  className?: string;
}

export const Checkbox = ({ className, onChange, checked }: Props) => {
  return (
    <CheckboxWrapper checked={checked} className={className}>
      <CheckboxInput type="checkbox" onChange={onChange} checked={checked} />
    </CheckboxWrapper>
  );
};

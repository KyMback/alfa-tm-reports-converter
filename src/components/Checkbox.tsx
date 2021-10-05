interface Props {
  onChange: () => void;
  checked: boolean;
}

export const Checkbox = ({ onChange, checked }: Props) => {
  return (
    <>
      <input type="checkbox" onChange={onChange} checked={checked} />
    </>
  );
};

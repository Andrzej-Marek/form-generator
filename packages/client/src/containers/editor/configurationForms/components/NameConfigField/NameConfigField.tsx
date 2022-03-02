import { TextField } from "@components/form";
import { ChangeEvent, FC } from "react";

type OwnProps = {
  onChange: (value: string) => void;
};

type Props = OwnProps;

const NameConfigField: FC<Props> = ({ onChange }) => {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    onChange(value);
  };
  return (
    <TextField
      name="name"
      label="Name"
      size="small"
      placeholder="Field name"
      infoTooltip="You have to specify a name to have a uniq value of field"
      onChange={onChangeHandler}
    />
  );
};

export default NameConfigField;

import { TextField } from "@components/form";
import { FC } from "react";

type OwnProps = {
  onChange: (value: string) => void;
};

type Props = OwnProps;

const NameConfigField: FC<Props> = ({ onChange }) => {
  return (
    <TextField
      name="name"
      label="Name"
      size="small"
      placeholder="Field name"
      infoTooltip="You have to specify a name to have a uniq value of field"
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

export default NameConfigField;

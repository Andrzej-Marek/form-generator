import { Button } from "@components/buttons";
import { FC } from "react";

type OwnProps = {};

type Props = OwnProps;

const ButtonSection: FC<Props> = () => {
  return (
    <div className="shadow-300">
      <Button wide type="submit">
        Submit
      </Button>
    </div>
  );
};

export default ButtonSection;

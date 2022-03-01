import { Button } from "@components/buttons";
import { Header } from "@components/headers";
import Icon from "@components/icons/Icon";
import { AppLogo } from "@components/logos";
import { FC } from "react";

type OwnProps = {};

type Props = OwnProps;

const FormTemplateBuilderHeader: FC<Props> = () => {
  return (
    <Header>
      <div className="flex justify-between items-center w-full">
        <AppLogo />

        <div className="flex items-center space-x-6">
          <div className="text-gray-400 text-sm text-right">
            Last saved 2 mins ago
          </div>
          <div className="p-2 rounded-lg bg-accent-100 cursor-pointer hover:scale-110 transition-transform ease-in duration-300">
            <Icon icon="eye" className="w-4 h-4" />
          </div>
          <Button size="small" className="w-28">
            Publish
          </Button>
        </div>
      </div>
    </Header>
  );
};

export default FormTemplateBuilderHeader;

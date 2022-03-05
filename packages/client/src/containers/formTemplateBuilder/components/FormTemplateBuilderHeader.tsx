import { Button } from "@components/buttons";
import { Header } from "@components/headers";
import Icon from "@components/icons/Icon";
import { AppLogo } from "@components/logos";
import { Time } from "@package/common";
import { FC } from "react";
import { Toast } from "src/services";
import { useFormConfigContext } from "../context";

type OwnProps = {};

type Props = OwnProps;

const FormTemplateBuilderHeader: FC<Props> = () => {
  const { saveFormTemplate, formTemplate } = useFormConfigContext();

  const onSaveClickHandler = () => {
    saveFormTemplate();
    Toast.success("Successfully saved");
  };

  return (
    <Header>
      <div className="flex justify-between items-center w-full">
        <AppLogo />

        <div className="flex items-center space-x-6">
          {!!formTemplate && (
            <div className="text-gray-400 text-sm text-right">
              Last saved: {Time.fromNow(formTemplate.updatedAt)}
            </div>
          )}
          <div className="p-2 rounded-lg bg-accent-100 cursor-pointer hover:scale-110 transition-transform ease-in duration-300">
            <Icon icon="eye" className="w-4 h-4" />
          </div>
          <Button
            size="small"
            className="w-24"
            variant="outline"
            onClick={onSaveClickHandler}
          >
            Save
          </Button>
          <Button size="small" className="w-24">
            Save & Publish
          </Button>
        </div>
      </div>
    </Header>
  );
};

export default FormTemplateBuilderHeader;

import { Button } from "@components/buttons";
import { Header } from "@components/headers";
import Icon from "@components/icons/Icon";
import { AppLogo } from "@components/logos";
import { Time } from "@package/common";
import Link from "next/link";
import { FC } from "react";
import { useRouterParams } from "src/hooks/router";
import { formTemplateRoutes } from "src/routes";
import { Toast } from "src/services";
import { useFormConfigContext } from "../context";

type OwnProps = {};

type Props = OwnProps;

const FormTemplateBuilderHeader: FC<Props> = () => {
  const { formTemplateId } = useRouterParams<{ formTemplateId?: string }>();
  const { saveFormTemplate, formTemplate } = useFormConfigContext();

  const onSaveClickHandler = async () => {
    await saveFormTemplate();
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
          {!!formTemplateId && (
            <a
              href={formTemplateRoutes.preview(formTemplateId)}
              target="_blank"
              rel="noreferrer noopener"
            >
              <div className="p-2 rounded-lg bg-accent-100 cursor-pointer hover:scale-110 transition-transform ease-in duration-300">
                <Icon icon="eye" className="w-4 h-4" />
              </div>
            </a>
          )}
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

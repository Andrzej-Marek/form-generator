import FormTemplateBuilderLayout from "@layout/FormTemplateBuilderLayout";
import { FC } from "react";
import FormTemplateBuilder from "src/containers/editor/FormTemplateBuilder";

type OwnProps = {};

type Props = OwnProps;

const Editor: FC<Props> = () => {
  return (
    <FormTemplateBuilderLayout>
      <div className="m-5 p-5 rounded-md shadow-200 bg-white">
        <FormTemplateBuilder />
      </div>
    </FormTemplateBuilderLayout>
  );
};

export default Editor;

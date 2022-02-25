import FormTemplateBuilder from "@containers/editor/FormTemplateBuilder";
import FormTemplateBuilderLayout from "@containers/editor/layout/FormTemplateBuilderLayout";

const Editor = () => {
  return (
    <FormTemplateBuilderLayout>
      <div className="m-5 mt-10">
        <FormTemplateBuilder />
      </div>
    </FormTemplateBuilderLayout>
  );
};

export default Editor;

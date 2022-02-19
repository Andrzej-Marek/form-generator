import FormTemplateBuilder from "@containers/editor/FormTemplateBuilder";
import FormTemplateBuilderLayout from "@containers/editor/layout/FormTemplateBuilderLayout";

const Editor = () => {
  return (
    <FormTemplateBuilderLayout>
      <div className="m-5 p-5 rounded-md shadow-200 bg-white">
        <FormTemplateBuilder />
      </div>
    </FormTemplateBuilderLayout>
  );
};

export default Editor;

import FormTemplateBuilder from "./FormTemplateBuilder";
import FormTemplateBuilderLayout from "./layout/FormTemplateBuilderLayout";

export const FormTemplateBuilderPage = () => {
  return (
    <FormTemplateBuilderLayout>
      <div className="m-5 mt-10">
        <FormTemplateBuilder />
      </div>
    </FormTemplateBuilderLayout>
  );
};

export default FormTemplateBuilderPage;

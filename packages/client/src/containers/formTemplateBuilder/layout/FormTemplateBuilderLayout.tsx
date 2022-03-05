import { FormConfigProvider } from "@containers/formTemplateBuilder/context/formConfig/FormConfigContext";
import FormTemplateBuilderSitePanel from "@containers/formTemplateBuilder/FormTemplateBuilderSitePanel";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FormTemplateProvider } from "@containers/formTemplateBuilder/context/FormTemplateContext";
import { FormTemplateBuilderHeader } from "../components";

const FormTemplateBuilderLayout: React.FC = ({ children }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <FormConfigProvider>
        <FormTemplateProvider>
          <FormTemplateBuilderHeader />
          <div className="grid md:grid-cols-sideFormMd lg:grid-cols-sideFormLg min-h-screen">
            <div className="block bg-white h-full shadow-100">
              <FormTemplateBuilderSitePanel />
            </div>

            <div>{children}</div>
          </div>
        </FormTemplateProvider>
      </FormConfigProvider>
    </DndProvider>
  );
};

export default FormTemplateBuilderLayout;

import { FormConfigProvider } from "@containers/editor/context/FormConfigContext";
import FormTemplateBuilderSitePanel from "@containers/editor/FormTemplateBuilderSitePanel";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FormTemplateProvider } from "@containers/editor/context/FormTemplateContext";

const FormTemplateBuilderLayout: React.FC = ({ children }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid md:grid-cols-sideFormMd lg:grid-cols-sideFormLg min-h-screen">
        {/* <Header /> */}
        {/* <CartCounterButton /> */}
        <FormConfigProvider>
          <FormTemplateProvider>
            <div className="block bg-white h-full shadow-100">
              <FormTemplateBuilderSitePanel />
            </div>

            <div>{children}</div>
          </FormTemplateProvider>
        </FormConfigProvider>
      </div>
    </DndProvider>
  );
};

export default FormTemplateBuilderLayout;

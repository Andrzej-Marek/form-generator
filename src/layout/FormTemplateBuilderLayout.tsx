import FormTemplateBuilderSitePanel from "@containers/editor/FormTemplateBuilderSitePanel";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const FormTemplateBuilderLayout: React.FC = ({ children }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid md:grid-cols-sideFormMd lg:grid-cols-sideFormLg min-h-screen">
        {/* <Header /> */}
        {/* <CartCounterButton /> */}
        <div className="block bg-white h-full shadow-100">
          <FormTemplateBuilderSitePanel />
        </div>

        <div>{children}</div>
      </div>
    </DndProvider>
  );
};

export default FormTemplateBuilderLayout;

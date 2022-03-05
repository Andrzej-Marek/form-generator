import FieldActionsWrapper, {
  FieldActions,
} from "@components/form/components/FieldActionsWrapper/FieldActionsWrapper";
import { useFormConfigContext } from "@containers/formTemplateBuilder/context";
import { FC } from "react";

type OwnProps = {
  actions: FieldActions;
  sectionIndex: number;
};

type Props = OwnProps;

const FormSectionCart: FC<Props> = ({ sectionIndex, children, actions }) => {
  const { getSectionConfigByIndex } = useFormConfigContext();

  const sectionConfig = getSectionConfigByIndex(sectionIndex);

  return (
    <FieldActionsWrapper actions={actions}>
      <div className="p-5 mb-5 rounded-md shadow-400 bg-white">
        {(sectionConfig.title || sectionConfig.subTitle) && (
          <div className="mb-5">
            {sectionConfig.title && (
              <div className="text-xl font-bold">{sectionConfig.title}</div>
            )}
            {sectionConfig.subTitle && (
              <div className="text-sm text-gray-400">
                {sectionConfig.subTitle}
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    </FieldActionsWrapper>
  );
};

export default FormSectionCart;

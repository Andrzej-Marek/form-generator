import FieldActionsWrapper, {
  FieldActions,
} from "@components/form/components/FieldActionsWrapper/FieldActionsWrapper";
import { FC } from "react";
import { SectionConfig } from "src/types";
import Cart from "../Cart";

type OwnProps = {
  actions?: FieldActions;
  sectionConfig: SectionConfig;
};

type Props = OwnProps;

const FormSectionCart: FC<Props> = ({ sectionConfig, children, actions }) => {
  return (
    <FieldActionsWrapper actions={actions}>
      <Cart>
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
      </Cart>
    </FieldActionsWrapper>
  );
};

export default FormSectionCart;

import FormSectionCart from "@components/carts/FormSectionCart/FormSectionCart";
import {
  DropSpace,
  SectionDropSpace,
} from "@containers/formTemplateBuilder/components";
import { OnDrop, OnSectionDrop } from "@containers/formTemplateBuilder/context";
import { FormTemplateBuilderActions } from "@containers/formTemplateBuilder/FormTemplateBuilder";
import { FormWrapper } from "@layout/form";
import { FC, Fragment, useMemo } from "react";
import { SectionConfig } from "src/types";
import { TypeController } from ".";
import { ButtonSection } from "../components";
import { ViewTypeController } from "./TypeController";

type OwnProps = {
  config: SectionConfig;
  sectionIndex: number;
  onDrop: OnDrop;
  onSectionDrop: OnSectionDrop;
  actions: FormTemplateBuilderActions;
};

type Props = OwnProps;

const SectionController: FC<Props> = ({
  config,
  onSectionDrop,
  sectionIndex,
  actions,
  onDrop,
}) => {
  const elements = useMemo(
    () =>
      config.config.map((el, configIndex) => (
        <Fragment key={configIndex}>
          <TypeController
            typeConfig={el}
            onDrop={onDrop}
            position={{ configIndex, sectionIndex }}
            actions={actions}
          />{" "}
          {/* + 1 because we have first element outside of array */}
          <DropSpace
            onDrop={onDrop}
            position={{ configIndex: configIndex + 1, sectionIndex }}
          />
        </Fragment>
      )),
    [config]
  );

  return (
    <>
      {sectionIndex === 0 && (
        <SectionDropSpace onDrop={onSectionDrop} sectionIndex={sectionIndex} />
      )}
      <FormSectionCart
        sectionConfig={config}
        actions={{ onConfigClick: () => actions.configSection(sectionIndex) }}
      >
        <FormWrapper>
          <DropSpace
            onDrop={onDrop}
            position={{ sectionIndex, configIndex: 0 }}
          />
          {elements}
          <ButtonSection />
        </FormWrapper>
      </FormSectionCart>
      <SectionDropSpace
        onDrop={onSectionDrop}
        sectionIndex={sectionIndex + 1}
      />
    </>
  );
};

export const ViewSectionController = ({
  config,
}: Pick<OwnProps, "sectionIndex" | "config">) => {
  const elements = useMemo(
    () =>
      config.config.map((el, configIndex) => (
        <Fragment key={configIndex}>
          <ViewTypeController typeConfig={el} />
        </Fragment>
      )),
    [config]
  );

  return (
    <FormSectionCart sectionConfig={config}>
      <FormWrapper>
        {elements}
        <ButtonSection />
      </FormWrapper>
    </FormSectionCart>
  );
};

export default SectionController;

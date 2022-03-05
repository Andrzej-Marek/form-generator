import Button from "@components/buttons/Button";
import { Form, TextField } from "@components/form";
import { useFormConfigContext } from "@containers/formTemplateBuilder/context";
import { FormBody, FormWrapper } from "@layout/form";
import { FC, useMemo } from "react";
import { SectionConfig } from "src/types";

type OwnProps = {
  sectionIndex: number;
  sectionConfig: SectionConfig;
};

type Props = OwnProps;

const SectionConfigurationForm: FC<Props> = ({
  sectionConfig,
  sectionIndex,
}) => {
  const { updateSectionConfig } = useFormConfigContext();

  const onUpdateField = (
    field: keyof Omit<SectionConfig, "config" | "type">,
    value: string
  ) => {
    updateSectionConfig(field, value, sectionIndex);
  };

  const formInitialValues = useMemo(
    () => configToInitialValues(sectionConfig),
    [sectionConfig]
  );

  const resetToInitialValues = () => {
    console.log("API CALL TO BE");
  };

  return (
    <Form<SectionConfig>
      initialValues={formInitialValues}
      onSubmit={(value) => console.log({ value })}
      enableReinitialize
      // validationSchema={validationSchema}
    >
      {({ resetForm }) => (
        <FormWrapper>
          <FormBody columns={2}>
            <TextField
              name="name"
              label="Name"
              size="small"
              placeholder="Field name"
              infoTooltip="You have to specify a name to have a uniq value of field"
              onChange={(event) => onUpdateField("name", event.target.value)}
            />
            {/* <TextField
              name="value"
              label="Initial value"
              size="small"
              placeholder="Initial value"
              onChange={(event) => onUpdateField("value", event.target.value)}
            /> */}
          </FormBody>
          <TextField
            name="title"
            label="Title"
            size="small"
            placeholder="Please insert a title"
            onChange={(event) => onUpdateField("title", event.target.value)}
          />
          <TextField
            name="subTitle"
            label="SubTitle"
            size="small"
            placeholder="Please insert a subTitle"
            onChange={(event) => onUpdateField("subTitle", event.target.value)}
          />
          <Button type="submit" size="small">
            Save
          </Button>
          {/* <Button
            variant="cancelOutline"
            type="reset"
            size="small"
            onClick={() => resetForm({ values: resetToInitialValues() })}
          >
            Reset
          </Button> */}
        </FormWrapper>
      )}
    </Form>
  );
};

const configToInitialValues = (config: SectionConfig): SectionConfig => ({
  config: [],
  subTitle: config.subTitle,
  title: config.title,
  type: "section",
  name: config.name,
});

export default SectionConfigurationForm;

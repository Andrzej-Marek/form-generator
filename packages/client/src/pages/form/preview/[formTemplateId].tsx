import { Alert } from "@components/alerts";
import { Cart } from "@components/carts";
import { Form } from "@components/form";
import { ViewSectionController } from "@components/form/controllers";
import { FormTemplateLoader } from "@components/loaders";
import { FormWrapper } from "@layout/form";
import {
  modifyFieldConfig,
  parseFormTemplate,
  stringifyFormTemplate,
  useGetFormTemplateQuery,
  useSendFormResponseMutation,
} from "@package/common";
import { FormikHelpers } from "formik";
import Router from "next/router";
import { useMemo } from "react";
import { buildYupSchema } from "src/helpers/createYupSchema";
import { useRouterParams } from "src/hooks/router";
import { baseRoutes } from "src/routes";
import { Toast } from "src/services";

type FormModel = Record<string, any>;

const FormTemplate = () => {
  const [sendFormResponse] = useSendFormResponseMutation();
  const { formTemplateId } = useRouterParams<{ formTemplateId: string }>();
  const { data, loading } = useGetFormTemplateQuery({
    variables: { id: formTemplateId },
  });

  const sections = useMemo(() => {
    if (!data?.getFormTemplate.template) {
      return [];
    }
    const parsedTemplate = parseFormTemplate(data.getFormTemplate.template);

    return parsedTemplate.map((section, sectionIndex) => (
      <ViewSectionController
        key={sectionIndex}
        config={section}
        sectionIndex={sectionIndex}
      />
    ));
  }, [data]);

  const onSubmit = async (
    values: FormModel,
    helpers: FormikHelpers<FormModel>
  ) => {
    if (!data?.getFormTemplate) {
      return;
    }

    const parsed = parseFormTemplate(data.getFormTemplate.template);

    const withValues = modifyFieldConfig(parsed, (field) => {
      // TODO: Check fo types value for specific fields
      field.value = values[field.name];
      return field;
    });

    // TODO: Remove it after, we should have separate preview screen
    try {
      await sendFormResponse({
        variables: {
          input: {
            formTemplateId,
            formVersion: data!.getFormTemplate.version,
            response: stringifyFormTemplate(withValues),
          },
        },
      });
      Toast.success("Successfully sended");
      helpers.resetForm();
      Router.push(baseRoutes.home);
    } catch (error) {
      Toast.error("Failed to send a form, please try again later");
    }
  };

  const validationSchema = useMemo(
    () =>
      data?.getFormTemplate &&
      buildYupSchema(parseFormTemplate(data.getFormTemplate.template)),
    [data]
  );

  if (loading) {
    return (
      <div className="container mx-auto mt-10">
        <Cart>
          <FormTemplateLoader />
        </Cart>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="mb-4">
        <Alert variant="info" header="This is a test view">
          In test view, you can test whole flow, submit and validate field.{" "}
          <p>This is exactly what yours user will see!</p>
        </Alert>
      </div>
      <Form<FormModel>
        initialValues={{}}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <FormWrapper>{sections}</FormWrapper>
      </Form>
    </div>
  );
};

export default FormTemplate;

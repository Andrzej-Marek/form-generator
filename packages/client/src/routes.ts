export const baseRoutes = {
  home: "/",
  form: "/form",
};

export const formTemplateRoutes = {
  template: (formTemplateId: string) =>
    `${baseRoutes.form}/builder/${formTemplateId}`,
  preview: (formTemplateId: string) =>
    `${baseRoutes.form}/preview/${formTemplateId}`,
  draftBuilder: `${baseRoutes.form}/builder/draft`,
};

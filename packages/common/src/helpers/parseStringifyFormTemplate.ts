export const parseStringifyFormTemplate = (template: string) => {
  try {
    return JSON.parse(template);
  } catch (error) {
    throw new Error("Invalid form template JSON!");
  }
};

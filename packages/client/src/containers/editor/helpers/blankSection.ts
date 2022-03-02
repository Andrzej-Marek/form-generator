import { randomString } from "@lib/randomString";
import { SectionConfig } from "src/types";

export const generateBlankSection = (): SectionConfig => ({
  config: [],
  name: `section-${randomString(3)}`,
  type: "section",
});

export const blankSection: SectionConfig = {
  config: [],
  type: "section",
  name: "",
};

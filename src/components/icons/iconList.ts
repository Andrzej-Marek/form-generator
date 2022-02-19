import { AiFillTool } from "react-icons/ai";
import { IconType as IconT } from "react-icons/lib";

const ICONS = ["tool"] as const;
export type IconType = typeof ICONS[number];

export const iconList: Record<IconType, IconT> = {
  tool: AiFillTool,
};

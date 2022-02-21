import { AiFillDelete, AiFillTool } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { IconType as IconT } from "react-icons/lib";

const ICONS = ["tool", "bin", "cross"] as const;
export type IconType = typeof ICONS[number];

export const iconList: Record<IconType, IconT> = {
  tool: AiFillTool,
  bin: AiFillDelete,
  cross: ImCross,
};

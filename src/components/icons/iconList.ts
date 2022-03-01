import { AiFillDelete, AiFillTool, AiFillEye } from "react-icons/ai";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { BsInfoCircleFill, BsCardText } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { IconType as IconT } from "react-icons/lib";

const ICONS = [
  "tool",
  "bin",
  "cross",
  "infoCircle",
  "arrowLeft",
  "eye",
  "card",
] as const;
export type IconType = typeof ICONS[number];

export const iconList: Record<IconType, IconT> = {
  tool: AiFillTool,
  bin: AiFillDelete,
  cross: ImCross,
  infoCircle: BsInfoCircleFill,
  arrowLeft: MdOutlineArrowBackIos,
  eye: AiFillEye,
  card: BsCardText,
};

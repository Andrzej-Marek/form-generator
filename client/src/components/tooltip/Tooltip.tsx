import { FC, memo, ReactNode, useMemo } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

type OwnProps = {
  content: ReactNode;
};

type Props = OwnProps;

const Tooltip: FC<Props> = ({ content, children }) => {
  return (
    <Tippy content={<div className="text-center">{content}</div>}>
      <div className="inline-block w-fit">{children}</div>
    </Tippy>
  );
};

export default Tooltip;

// react-tooltip alternatives
// import { FC, memo, ReactNode, useMemo } from "react";
// import ReactTooltip from "react-tooltip";

// type OwnProps = {
//   content: ReactNode;
// };

// type Props = OwnProps;

// const Tooltip: FC<Props> = ({ content, children }) => {
//   const tooltipId = useMemo(() => Date.now().toString(), []);
//   return (
//     <>
//       <ReactTooltip id={tooltipId}>{content}</ReactTooltip>
//       <div data-tip data-for={tooltipId}>
//         {children}
//       </div>
//     </>
//   );
// };

// export default Tooltip;

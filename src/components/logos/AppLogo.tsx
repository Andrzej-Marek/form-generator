import { FC } from "react";

type OwnProps = {};

type Props = OwnProps;

const AppLogo: FC<Props> = () => {
  return (
    <a className="flex items-center">
      <img
        src="https://pazly.dev/logo.png"
        className="h-10 lg:h-13"
        alt="logo"
      />

      <span className="hidden md:inline-block ml-3 text-xl">pazly.dev</span>
    </a>
  );
};

export default AppLogo;

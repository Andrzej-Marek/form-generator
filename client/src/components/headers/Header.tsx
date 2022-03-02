import { FC } from "react";

type OwnProps = {};

type Props = OwnProps;

const Header: FC<Props> = ({ children }) => {
  return (
    <header className="body-font bg-white shadow-300 w-full z-50">
      <div className="flex flex-wrap flex-col p-3 md:flex-row items-center ">
        {/* <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
                <a
                    className="mr-5 hover:text-gray-900 cursor-pointer border-b border-transparent hover:border-indigo-600">About</a>
                <a
                    className="mr-5 hover:text-gray-900 cursor-pointer border-b border-transparent hover:border-indigo-600">Products</a>
                <a className="mr-5 hover:text-gray-900 cursor-pointer border-b border-transparent hover:border-indigo-600">Investor
                    Relations</a>
                <a
                    className="hover:text-gray-900 cursor-pointer border-b border-transparent hover:border-indigo-600">Contact</a>
            </nav>
            <a
                className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center lg:items-center lg:justify-center mb-4 md:mb-0">
                <img src="https://pazly.dev/logo.png" style="height: 40px; margin-top: 10px; margin-bottom: 10px;"
                    alt="logo">

                <span className="ml-3 text-xl">pazly.dev</span>
            </a>
            <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                <a href="https://www.buymeacoffee.com/pazlydev" className="bg-indigo-700 hover:bg-indigo-500 text-white ml-4 py-2 px-3 rounded-lg">
                    Donate
                </a>
            </div> */}
        {children}
      </div>
    </header>
  );
};

export default Header;

import Head from "next/head";
import { FC } from "react";

interface OwnProps {}

type Props = OwnProps;

const GlobalHead: FC<Props> = () => {
  return (
    <Head>
      <title>Form Wheel</title>
      <meta name="description" content="Form Wheel, what is your next form?" />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default GlobalHead;

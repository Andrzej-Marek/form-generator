import { useGetFormTemplateQuery } from "@package/common";
import type { NextPage } from "next";
import Login from "src/containers/Login";

const Home: NextPage = () => {
  const { data, loading } = useGetFormTemplateQuery({
    variables: { id: "674a1578-cc1b-4778-aadc-539bec68b3ef" },
  });

  console.log({ data, loading });

  return (
    <main className="flex-1">
      <br />
      <br />
      <br />
      <Login />
      <div className="grid grid-cols-3">
        <div>HELLO</div>
        <div>HELLO</div>
        <div>HELLO</div>
      </div>

      <div className="grid md:grid-cols-sideFormMd lg:grid-cols-sideFormLg">
        {/* <Header /> */}
        {/* <CartCounterButton /> */}
        <div>Site panel2</div>

        <div>HELLO</div>
        {/* <MobileNavigation /> */}
      </div>
    </main>
  );
};

export default Home;

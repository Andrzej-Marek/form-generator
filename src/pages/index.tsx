import type { NextPage } from "next";
import Login from "src/containers/Login";

const Home: NextPage = () => {
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

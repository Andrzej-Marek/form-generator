import { Button } from "@components/buttons";
import type { NextPage } from "next";
import Router from "next/router";
import Login from "src/containers/Login";
import { formTemplateRoutes } from "src/routes";

const Home: NextPage = () => {
  const CURRENT_WORKING_FORM_ID = "22b4f03b-1423-4377-a1ad-617e5d14d6f9";
  return (
    <main className="flex-1">
      <Button
        onClick={() =>
          Router.push(formTemplateRoutes.template(CURRENT_WORKING_FORM_ID))
        }
      >
        Form builder
      </Button>
      <Button onClick={() => Router.push(formTemplateRoutes.draftBuilder)}>
        Form draft
      </Button>

      <Login />
    </main>
  );
};

export default Home;

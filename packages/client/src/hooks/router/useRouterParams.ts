import { useRouter } from "next/router";

export const useRouterParams = <T extends object>(): T => {
  const router = useRouter();

  return router.query as T;
};

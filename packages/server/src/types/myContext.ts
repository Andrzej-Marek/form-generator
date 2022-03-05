import { Request, Response } from 'express';
import { MySession } from './session';

type RequestSession = Request & {
  session?: MySession;
};

export type MyContext = {
  req: RequestSession;
  res: Response;
};

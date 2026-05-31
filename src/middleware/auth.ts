import type { NextFunction, Request, Response } from "express";

const auth = () => {
  return async (req: Request,res: Response, next: NextFunction) => {
    console.log("hello there, hobvoni", req.headers);

    next();
  };
};

export default auth;

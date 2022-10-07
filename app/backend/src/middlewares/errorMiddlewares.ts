import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

const errorHandling: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err);
  return res.status(500).json({ message: 'Internal server error' });
};

export default errorHandling;

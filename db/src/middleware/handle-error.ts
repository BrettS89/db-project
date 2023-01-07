import Err from '../utilities/errors';
import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof Err) {
    return res.status(err.code || 500).send({ error: err.message });
  }

  res.status(500).send({
    error: { error: 'Something went wrong' },
  });
};


export default errorHandler;

import type { Request, Response, NextFunction } from 'express';

export default async function requireAccessKey(req: Request, res: Response, next: NextFunction): Promise<unknown> {
   if ('accesskey' in req.headers === false && 'accessKey' in req.query === false && 'accessKey' in req.body === false) {
    return res.status(401).json({ error: 'Unauthorized!' });
  }

  const accessKey = req.headers.accesskey || req.query.accessKey || req.body.accessKey;

  if (accessKey !== '123456') {
    return res.status(401).json({ error: 'Unauthorized!' });
  }

  next();
}

import express from 'express';
import Joi from 'joi';
import controllers from '../controllers';
import requireAccessKey from '../middlewares/requireAccessKey';
import { validateParams, validateQuery, validateBody  } from '../middlewares/validate';

const router = express.Router();

const getSchema = Joi.object({
  id: Joi.string().guid({ version: 'uuidv4' }).required(),
});

router.get('/:id', validateParams(getSchema), async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const response = await controllers.Projects.get(req.params.id);

    res.status(200).json({
      error: null,
      data: {
        ...response,
      }
    }).end();
  } catch (err) {
    next(err);
  }
});

const listSchema = Joi.object({
  ids: Joi.array().items(Joi.string().guid({ version: 'uuidv4' })).optional(),
  first: Joi.number().default(10).optional(),
  after: Joi.number().default(0).optional(),
  group: Joi.string().max(64).optional(),
  name: Joi.string().max(64).optional(),
});

router.get('/', validateQuery(listSchema), async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const response = await controllers.Projects.list({ first: 10, after: 0, ...req.query });

    res.status(200).json({
      error: null,
      data: {
        ...response,
      }
    }).end();
  } catch (err) {
    next(err);
  }
});

const putSchema = Joi.object({
  name: Joi.string().max(64).optional(),
  description: Joi.string().max(256).optional(),
  url: Joi.string().uri().optional(),
  release: Joi.object({
    tag: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.string().optional(),
  }).optional(),
  commit: Joi.object({
    hash: Joi.string().required(),
    author: Joi.string().required(),
    message: Joi.string().required(),
    branch: Joi.string().required(),
  }).optional(),
});

router.put('/:id', requireAccessKey, validateBody(putSchema), async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const response = await controllers.Projects.update(req.params.id, req.body);

    res.status(200).json({
      error: null,
      data: {
        ...response,
      }
    }).end();
  } catch (err) {
    next(err);
  }
});

export default router;

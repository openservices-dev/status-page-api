import express from 'express';
import Joi from 'joi';
import controllers from '../../controllers';
import requireAccessKey from '../../middlewares/requireAccessKey';
import { validateParams, validateQuery, validateBody  } from '../../middlewares/validate';

const router = express.Router();

const getSchema = Joi.object({
  projectId: Joi.string().guid({ version: 'uuidv4' }).required(),
  id: Joi.string().guid({ version: 'uuidv4' }).required(),
});

router.get('/:projectId/issues/:id', validateParams(getSchema), async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const response = await controllers.projects.Issues.get(req.params.projectId, req.params.id);

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
  first: Joi.number().default(10).optional(),
  after: Joi.number().default(0).optional(),
});

router.get('/:projectId/issues', validateQuery(listSchema), async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    res.status(200).json({
      error: null,
      data: {
        issues: [],
      }
    }).end();
  } catch (err) {
    next(err);
  }
});

const putSchema = Joi.object({
  name: Joi.string().max(64).optional(),
  description: Joi.string().max(256).optional(),
  status: Joi.string().valid('OPEN', 'RESOLVED', 'CLOSED').optional(),
});

router.put('/:projectId/issues/:id', requireAccessKey, validateBody(putSchema), async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const response = await controllers.projects.Issues.updateIssue(req.params.projectId, req.params.id, req.body);

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

const postSchema = Joi.object({
  name: Joi.string().max(64).required(),
  description: Joi.string().max(256).required(),
});

router.post('/:projectId/issues', requireAccessKey, validateBody(postSchema), async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const response = await controllers.projects.Issues.addIssue(req.params.projectId, req.body);

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

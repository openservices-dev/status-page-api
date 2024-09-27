import express from 'express';
import projects from './projects';
import issues from './projects/issues';

const router = express.Router();

router.use('/projects', projects);
router.use('/projects', issues);

export default router;

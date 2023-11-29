import { Router } from 'express';
import controllers from './user.controllers';

const router = Router();

router.post('/', controllers.createOne);

router.get('/:id', controllers.getOne);
router.patch('/:id', controllers.updateOne);
router.delete('/:id', controllers.removeOne);

export default router;

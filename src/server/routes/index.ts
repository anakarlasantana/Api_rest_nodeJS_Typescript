import {Router} from 'express';
import {StatusCodes} from 'http-status-codes'
import { CidadesController } from '../controllers/cidades';

const router = Router();

router.get('/', (_, res) => {
  return res.json('Olá, DEV!')
})

// Get
router.get('/cidades', CidadesController.getAllValidation,CidadesController.getAll);
router.get('/cidades/:id', CidadesController.getByIdValidation,CidadesController.getById);
// Post
router.post('/cidades', CidadesController.createValidation,CidadesController.create);
// Put
router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById);
// Delete
router.delete('/cidades/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById);


router.post('/post', (req, res) => {
  //console.log(req.body);
  return res.status(StatusCodes.ACCEPTED).json(req.body)
  
})


export { router };
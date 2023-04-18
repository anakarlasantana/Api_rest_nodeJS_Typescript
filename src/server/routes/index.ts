import {Router} from 'express';
import {StatusCodes} from 'http-status-codes'
import { CidadesController } from '../controllers/cidades';

const router = Router();

router.get('/', (_, res) => {
  return res.json('Olá, DEV!')
})

router.post('/cidades', 
CidadesController.createValidation,
CidadesController.create);

router.post('/post', (req, res) => {
  //console.log(req.body);
  return res.status(StatusCodes.ACCEPTED).json(req.body)
  
})


export { router };
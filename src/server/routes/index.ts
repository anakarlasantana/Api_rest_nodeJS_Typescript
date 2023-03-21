import {Router} from 'express';
import {StatusCodes} from 'http-status-codes'

const router = Router();

router.get('/', (_, res) => {
  return res.json('Olá, DEV!')
})

router.post('/post', (req, res) => {
  console.log(req.body);
  return res.status(StatusCodes.ACCEPTED).json(req.body)
  
})


export { router };
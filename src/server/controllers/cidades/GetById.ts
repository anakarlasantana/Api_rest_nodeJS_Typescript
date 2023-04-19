import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";

//* Esse arquivo vai servir para trazer todas as cidades de acordo com o id de cada uma;
interface IParamProps {
  id?: number;
}

//validação de buscar id > 0;
export const getByIdValidation = validation(getSchema => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0), 
  })),
}));


// Método de requisição
export const getById = async (req: Request<IParamProps>, res: Response) => { 

  console.log(req.params);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado!');
}
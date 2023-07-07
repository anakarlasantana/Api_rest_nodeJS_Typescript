import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { CidadesProvider } from "../../database/providers/cidades";

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
  
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.'
      }
    });
  }

  const result = await CidadesProvider.getById(req.params.id);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.OK).json(result);
};
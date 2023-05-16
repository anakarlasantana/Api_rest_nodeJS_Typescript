import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";

//* Esse arquivo vai servir para trazer todas as cidades de acordo com algumas propriedades;
interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0), //as páginas são opcionais e mais que 0, ou seja, o usuário não pode pedir uma página menos que 1.
    limit: yup.number().optional().moreThan(0),
    filter: yup.string().optional(),
  })),
}));



export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => { // OS {} demosntram as posições das propriedades de Request (coloca o cursor sobre o nome para vizualizar melhor)

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', 1);

  return res.status(StatusCodes.OK).json([
    {
      id: 1,
      nome: 'Caxias do Sul',
    }
  ]);
};

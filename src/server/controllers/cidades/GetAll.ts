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

  console.log(req.query);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado!');
}
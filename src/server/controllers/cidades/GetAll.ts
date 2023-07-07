import { Request, Response } from "express";
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";

import { validation } from "../../shared/middlewares";
import { CidadesProvider } from "../../database/providers/cidades";

//* Esse arquivo vai servir para trazer todas as cidades de acordo com algumas propriedades;
interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0), //as páginas são opcionais e mais que 0, ou seja, o usuário não pode pedir uma página menos que 1.
    limit: yup.number().optional().moreThan(0),
    filter: yup.string().optional(),
    id: yup.number().integer().optional().default(0),
  })),
}));



export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => { // OS {} demosntram as posições das propriedades de Request (coloca o cursor sobre o nome para vizualizar melhor)

  const result = await CidadesProvider.getAll(req.query.page || 1, req.query.limit || 7, req.query.filter || '', Number(req.query.id || 0));
  const count = await CidadesProvider.count(req.query.filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message }
    });
  }

  res.setHeader('access-control-expose-headers', 'x-total-count');

  res.setHeader('x-total-count', count);

  return res.status(StatusCodes.OK).json(result);
};

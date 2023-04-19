import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";

interface ICidades {
  nome: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<ICidades>(yup.object().shape({
    nome: yup.string().required().min(3),
  })),
}));


export const create = async (req: Request<{}, {}, ICidades>, res: Response) => {

  console.log(req.body);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado!');
}
import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { ICidades } from "../../database/models";

interface IBodyProps extends Omit<ICidades, 'id'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3).max(150),
  })),
}));


export const create = async (req: Request<{}, {}, ICidades>, res: Response) => {

  console.log(req.body);

  return res.status(StatusCodes.CREATED).json(1);

  
}
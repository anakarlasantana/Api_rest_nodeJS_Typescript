import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ObjectSchema, Schema, ValidationError, object } from 'yup';

type TProperty = 'body' | 'header' | 'params' | 'query';

type TGetSchema = <T>(schema: ObjectSchema<any>) => ObjectSchema<any>

type TAllSchemas = Record<TProperty, ObjectSchema<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {

  const schemas = getAllSchemas(schema => schema);

  console.log('schemas:', schemas);

  const errorsResult: Record<string, Record<string, string>> = {};


  Object.entries(schemas).forEach(([key, schema]) => {

    try {
      schema.validateSync(req[key as TProperty], { abortEarly: false });

    } catch (err) {
      const yupError = err as ValidationError;
      const errors: Record<string, string> = {};

      yupError.inner.forEach(error => {
        if (error.path === undefined) return;
        //mostra o caminho do erro
        errors[error.path] = error.message;
      });

      errorsResult[key] = errors;

    }
  })

  if (Object.entries(errorsResult).length === 0) {
    return next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });

  }

};
import { ETableNames } from '../../ETableNames';
import { ICidades } from '../../models/Cidade';
import { Knex } from '../../knex';


export const getById = async (id: number): Promise<ICidades | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .select('*') // Esse asterisco significa quer trazer consultar todos os atributos da tabela - ex: Pode especificar qual atributo quer: .select('id'); .select('nome') etc //
      .where('id', '=', id) // Onde o id for igual o id que mandou // 
      .first();

    if (result) return result;

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};
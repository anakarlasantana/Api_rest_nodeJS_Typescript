import { ETableNames } from '../../ETableNames';
import { ICidades } from '../../models';
import { Knex } from '../../knex';


export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<ICidades[] | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .select('*')
      .where('id', Number(id))
      .orWhere('nome', 'like', `%${filter}%`) // Esse filter é o que o usuário digita no inpu, então ele vai filtrando de acordo com a digitação. //
      .offset((page - 1) * limit) // limitar o que ele quer receber (0p à 10p)
      .limit(limit); // quantidade total páginas

    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await Knex(ETableNames.cidade)
        .select('*')
        .where('id', '=', id)
        .first(); 

      if (resultById) return [...result, resultById];
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
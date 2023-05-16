import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

 describe('Cidades - GetAll',  () => {

  it('Buscar todos os registros', async () => {

    const testeOfGetAll = await testServer
    .post('/cidades')
    .send({nome: 'Fortaleza', estado: "Ceará"})

    expect(testeOfGetAll.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscarRegistros = await testServer
    .get('/cidades')
    .send()

    expect(Number(resBuscarRegistros.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscarRegistros.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscarRegistros.body.length).toBeGreaterThan(0);

  })
 })
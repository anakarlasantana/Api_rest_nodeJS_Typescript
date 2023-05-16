import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

 describe('Cidades - GetById',  () => {

  it('Buscar registro por id', async () => {

    const testeOfGetById = await testServer
    .post('/cidades')
    .send({nome: 'Fortaleza', estado: "Ceará"})

    expect(testeOfGetById.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscarRegistros = await testServer
    .get(`/cidades/${testeOfGetById.body}`)
    .send()

    expect(resBuscarRegistros.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscarRegistros.body).toHaveProperty('nome');

  })

  it('Tentar buscar registro que não existe', async () => {
    const testeOfGetById = await testServer
    .get('/cidades/99999')
    .send()

    expect(testeOfGetById.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(testeOfGetById.body).toHaveProperty('errors.default')

  })
 })
import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

 describe('Cidades - UpdateById',  () => {

  it('Atualizar registro', async () => {

    const testeOfUpdateById = await testServer
    .post('/cidades')
    .send({nome: 'Fortaleza', estado: "Ceará"})

    expect(testeOfUpdateById.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscarRegistros = await testServer
    .get(`/cidades/${testeOfUpdateById.body}`)
    .send({ nome: 'Fortaleza'})

    expect(resBuscarRegistros.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscarRegistros.body).toHaveProperty('nome');

  })

  it('Tentar atualizar registro que não existe', async () => {
    
    const testeOfUpdateById = await testServer
    .get('/cidades/99999')
    .send({ nome: 'Fortaleza'})

    expect(testeOfUpdateById.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(testeOfUpdateById.body).toHaveProperty('errors.default')

  })
 })
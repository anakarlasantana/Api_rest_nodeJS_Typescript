import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

 describe('Cidades - DeleteById',  () => {

  it('Apagar registro', async () => {

    const testeOfDeleteById = await testServer
    .post('/cidades')
    .send({nome: 'Fortaleza', estado: "Ceará"})

    expect(testeOfDeleteById.statusCode).toEqual(StatusCodes.CREATED);

    const resApagada = await testServer
    .delete(`/cidades/${testeOfDeleteById.body}`)
    .send();

    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  })
  
  it('Tentar apagar registro que não existe', async () => {
    const testeOfDeleteById = await testServer
    .delete('/cidades/99999')
    .send()

    expect(testeOfDeleteById.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(testeOfDeleteById.body).toHaveProperty('errors.default')

  })
 })
import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

 describe('Cidades - Create',  () => {

  it('Cria registro', async () => {
    const testeOfCreate = await testServer
    .post('/cidades')
    .send({nome: 'Fortaleza'})

    expect(testeOfCreate.statusCode).toEqual(StatusCodes.CREATED)

  })
 })
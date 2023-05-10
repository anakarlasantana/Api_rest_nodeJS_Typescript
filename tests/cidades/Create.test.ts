import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

 describe('Cidades - Create',  () => {

  it('Cria registro', async () => {
    const testeOfCreate = await testServer
    .post('/cidades')
    .send({nome: 'Fortaleza', "estado": "Ceará"})

    expect(testeOfCreate.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof testeOfCreate.body).toEqual("object");

  })
  
  it('Cria registro', async () => {
    const testeOfCreate = await testServer
    .post('/cidades')
    .send({nome: 'Fo', estado: 'Ceará'})

    expect(testeOfCreate.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(testeOfCreate.body).toHaveProperty('errors.body.nome')

  })
 })
import express from 'express';


const server = express();

interface Teste {

}

server.get('/', (req, res) => {
  return res.send('Olá, DEV!')
})

export { server };
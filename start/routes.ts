/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

const favoritos = [
  { id: 1, nome: 'google', url: 'http://www.google.com', importante: true },
  // Adicione outros favoritos conforme necessário
]

Route.get('/', async () => {
  return { app: 'favio-back' }
})

Route.get('/favoritos', async () => {
  return [{ id: 1, nome: 'google', url: 'http://www.google.com', importante: true }]
})

// Procurar favorito pelo ID
Route.get('/favoritos/:id', async ({ params, response }) => {
  let favoritoEncontrado = favoritos.find((favorito) => favorito.id == params.id)
  if (favoritoEncontrado == undefined) {
    return response.status(404).send({ mensagem: 'Favorito não encontrado' })
  }
  return favoritoEncontrado
})

// Procurar favorito pelo nome
Route.get('/favoritos/nome/:nome', async ({ params, response }) => {
  let favoritoEncontrado = favoritos.find((favorito) => favorito.nome == params.nome)
  if (!favoritoEncontrado) {
    return response.status(404).send({ mensagem: 'Favorito não encontrado' })
  }
  return favoritoEncontrado
})

// Rota POST para criar um novo favorito
Route.post('/favoritos', async ({ request, response }) => {
  const { nome, url, importante } = request.body()
  if (nome == undefined || url == undefined || importante == undefined) {
    return response.status(400)
  }
  const newFavorito = { id: favoritos.length + 1, nome, url, importante }
  favoritos.push(newFavorito)
  return response.status(201).send(newFavorito)
})

// Rota DELETE para deletar um favorito existente
Route.delete('/favoritos/:id', async ({ params, response }) => {
  const favoritoId = parseInt(params.id, 10)
  const index = favoritos.findIndex((favorito) => favorito.id === favoritoId)
  if (index === -1) {
    return response.status(404).send({ mensagem: 'Favorito não encontrado' })
  }
  // Remover o favorito do array
  const deletedFavorito = favoritos.splice(index, 1)[0]

  return response.status(200).send(deletedFavorito)
})

// Rota DELETE para deletar um favorito que não existe
Route.delete('/favoritos/inexistente/:id', async ({ params, response }) => {
  const favoritoId = parseInt(params.id, 10)
  const index = favoritos.findIndex((favorito) => favorito.id === favoritoId)
  if (index === -1) {
    return response.status(404).send({ mensagem: 'Favorito não encontrado para deletar' })
  }
  // Remover o favorito do array
  const deletedFavorito = favoritos.splice(index, 1)[0]

  return response.status(404).send(deletedFavorito)
})

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

Route.get('/favoritos/:id', async ({ params, response }) => {
  const favoritoEncontrado = favoritos.find((favorito) => favorito.id === params.id)
  if (!favoritoEncontrado) {
    return response.status(404).send({ mensagem: 'Favorito não encontrado' })
  }
  return favoritoEncontrado
})

Route.get('/favoritos/nome/:nome', async ({ params, response }) => {
  const favoritoEncontrado = favoritos.find((favorito) => favorito.nome === params.nome)
  if (!favoritoEncontrado) {
    return response.status(404).send({ mensagem: 'Favorito não encontrado' })
  }
  return favoritoEncontrado
})

Route.post('/favoritos', async ({ request, response }) => {
  const { nome, url, importante } = request.body()
  if (!nome || !url || importante === undefined) {
    return response.status(400).send({ mensagem: 'Parâmetros inválidos' })
  }
  const newFavorito = { id: favoritos.length + 1, nome, url, importante }
  favoritos.push(newFavorito)
  return response.status(201).send(newFavorito)
})

Route.delete('/favoritos/:id', async ({ params, response }) => {
  const favoritoId = params.id as number
  const index = favoritos.findIndex((favorito) => favorito.id === favoritoId)
  if (index === -1) {
    return response.status(404).send({ mensagem: 'Favorito não encontrado' })
  }
  // Remover o favorito do array
  favoritos.splice(index, 1)
  return response.status(204)
})

Route.delete('/favoritos/inexistente/:id', async ({ params, response }) => {
  const favoritoId = params.id as number
  const index = favoritos.findIndex((favorito) => favorito.id === favoritoId)
  if (index === -1) {
    return response.status(404).send({ mensagem: 'Favorito não encontrado para deletar' })
  }
  // Remover o favorito do array
  const deletedFavorito = favoritos.splice(index, 1)[0]
  return response.status(200).send(deletedFavorito)
})

Route.put('/favoritos/:id', async ({ params, request, response }) => {
  const favoritoId = params.id as number
  const index = favoritos.findIndex((favorito) => favorito.id === favoritoId)

  if (index === -1) {
    return response.status(404).send({ mensagem: 'Favorito não encontrado' })
  }

  const { nome, url, importante } = request.body()
  if (!nome || !url || importante === undefined) {
    return response.status(400).send({ mensagem: 'Parâmetros inválidos' })
  }

  // Atualizar o favorito no array
  favoritos[index] = { id: favoritoId, nome, url, importante }

  return response.status(200).send(favoritos[index])
})

Route.resource('favoritao', 'FavoritosController').apiOnly()

Route.resource('users', 'UsersController').apiOnly()

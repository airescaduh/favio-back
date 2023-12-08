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
  return [{ id: 1, nome: 'google', url: 'hhtp://www.google.com', importante: true }]
})

Route.get('/favoritos/:id', async ({ params, response }) => {
  //retornar o objeto caso exista, senão retornar objeto vazio {}
  //função callback:
  let favoritoEncontrado = favoritos.find((favorito) => favorito.id == params.id)
  if favoritoEncontrado==undefined
    return response.status(404)
  return favoritoEncontrado 
})
// proxima aula: carry string, é isso

//procurar favorito pelo nome
Route.get('/favoritos/:nome', async ({ params }) => {
  let favoritoEncontrado = favoritos.find((favorito) => favorito.nome == params.nome)
  return { id: 1, nome: params.nome, url: 'hhtp://www.google.com', importante: true }
})


//rota post para criar um novo favorito
Route.post('/favoritos', async ({request, response}) => {
  const{nome, url, importante} = request.body()
  if(nome==undefined|| url==undefined || importante==undefined) return response.status(400)
  const newFavorito = {id:favoritos.length+1, nome, url, importante}
  favoritos.push(newFavorito)
  return response.status(201).send(newFavorito)
})
import { test } from '@japa/runner'

//node ace make:test functional <nome do arquivo>

test.group('List favoritos', () => {
  // Write your test here

  test('exibir favoritos', async ({ client }) => {
    const resposta = await client.get('/favoritos')

    resposta.assertStatus(200)
    resposta.assertBodyContains([])
  })
  //TDD

  test('exibir favoritos com ID', async ({ client }) => {
    const resposta = await client.get('/favoritos/1')
    resposta.assertStatus(404)
  })
  

  test('favorito nao encontrado', async ({ client }) => {
    const resposta = await client.get('/favoritos/idnaoexiste')
    resposta.assertStatus(404)
  })
})

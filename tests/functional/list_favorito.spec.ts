import { test } from '@japa/runner'

test.group('List favoritos', () => {
  // Write your test here

  test('exibir favoritos', async ({ client }) => {
    const resposta = await client.get('/favoritos')

    resposta.assertStatus(200)
    resposta.assertBodyContains([])
  })
})

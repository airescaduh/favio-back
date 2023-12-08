import { test } from '@japa/runner'

test.group('Deletar favoritos', () => {
  // Write your test here

  test('deletar favoritos existente', async ({ client }) => {
    //deletar favorito com id = 1
    const resposta = await client.delete('/favoritos/1')
    resposta.assertStatus(200)
  })

  test('deletar favoritos inexistente', async ({ client }) => {
    // const resposta = await client.delete('/favoritos/5')
    // // resposta.assertStatus(200)
  })
})

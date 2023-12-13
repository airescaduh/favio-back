import { test } from '@japa/runner'

test.group('Deletar favoritos', () => {
  // Write your test here

  test('deletar favoritos existente', async ({ client }) => {
    // Deletar favorito com id = 1
    const resposta = await client.delete('/favoritos/1')
    resposta.assertStatus(200)
  })

  test('favorito nao encontrado', async ({ client }) => {
    const resposta = await client.delete('/favoritos/idnaoexiste') // Alterado para método DELETE
    resposta.assertStatus(404) // Corrigido para esperar um status 404
    resposta.assertBodyContains({ mensagem: 'Favorito não encontrado' })
  })
})

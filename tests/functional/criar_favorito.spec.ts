import { test } from '@japa/runner'

test.group('Criar favorito', () => {
  test('criar favorito', async ({ client }) => {
    const resposta = await client.post('/favoritos').json({
      nome: 'IFRN',
      url: 'http://www.ifrn.edu.br',
      importante: false,
    })

    resposta.assertStatus(201)

    if (!resposta.body().nome || resposta.body().nome !== 'IFRN') {
      throw new Error(
        'Falha na verificação do campo nome. Resposta: ' + JSON.stringify(resposta.body())
      )
    }
  })

  test('criar favorito com campo faltante', async ({ client }) => {
    const resposta = await client.post('/favoritos').json({
      nome: 'IFRN',
      importante: false,
    })

    resposta.assertStatus(400)

    const mensagemEsperada = 'Parâmetros inválidos'
    if (!resposta.body().mensagem || resposta.body().mensagem !== mensagemEsperada) {
      throw new Error(
        `Falha na verificação da mensagem de erro. Esperado: "${mensagemEsperada}". Resposta: ${JSON.stringify(
          resposta.body()
        )}`
      )
    }
  })
})

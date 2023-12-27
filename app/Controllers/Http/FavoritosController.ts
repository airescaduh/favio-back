import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Favorito from 'App/Models/Favorito'

export default class FavoritosController {
  public async index({}: HttpContextContract) {
    return Favorito.all()
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const { nome, cpf, senha, url, importante } = request.body()

      // Verificar se campos obrigatórios estão presentes
      if (!nome || !cpf || !senha || !url || importante === undefined) {
        return response.status(400).send({ mensagem: 'Campos obrigatórios não preenchidos' })
      }

      const newFavorito = await Favorito.create({ nome, cpf, senha, url, importante })
      return response.status(201).send(newFavorito)
    } catch (error) {
      return response.status(500).send({ mensagem: 'Erro ao criar favorito', error: error.message })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      let favoritoEncontrado = await Favorito.findByOrFail('id', params.id)
      return favoritoEncontrado
    } catch (error) {
      return response.status(404).send({ error: 'Favorito não encontrado' })
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    const { nome, cpf, senha, url, importante } = request.body()
    let favoritoEncontrado = await Favorito.findByOrFail('id', params.id)
    if (!favoritoEncontrado) return response.status(404)

    favoritoEncontrado.nome = nome
    favoritoEncontrado.cpf = cpf
    favoritoEncontrado.senha = senha
    favoritoEncontrado.url = url
    favoritoEncontrado.importante = importante

    await favoritoEncontrado.save()
    return response.status(200).send(favoritoEncontrado)
  }

  public async destroy({ params, response }: HttpContextContract) {
    let favoritoEncontrado = await Favorito.findByOrFail('id', params.id)
    if (!favoritoEncontrado) return response.status(404)

    favoritoEncontrado.delete()
    return response.status(204)
  }
}

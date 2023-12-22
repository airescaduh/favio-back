import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Favorito from 'App/Models/Favorito'

export default class FavoritosController {
  public async index({}: HttpContextContract) {
    return Favorito.all()
  }

  public async create({}: HttpContextContract) {}

  public async store({request,response}: HttpContextContract) {
    const {name,url,importante} = request.body()
    const newFavorito={name,url,importante}
    Favorito.create{newFavorito}
    return response.status(201).send(newFavorito)
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}

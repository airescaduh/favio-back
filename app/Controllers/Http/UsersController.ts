import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const data = request.only(['username', 'password', 'email'])
    const user = await User.create(data)

    return user
  }

  public async show({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return user
  }

  public async update({ request, params }: HttpContextContract) {
    const data = request.only(['username', 'password', 'email'])
    const user = await User.findOrFail(params.id)

    user.merge(data)
    await user.save()

    return user
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()

    return { message: 'User deleted successfully' }
  }
}

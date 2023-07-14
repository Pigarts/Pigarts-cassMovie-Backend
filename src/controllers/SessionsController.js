const knex = require("../database/knex")
const AppError = require("../Utils/AppError")
const {compare} = require("bcryptjs")
const authConfig = require("../configs/auth")
const {sign} = require("jsonwebtoken")



class SessionsController {
    async create(request, response) {
        const {email, password} = request.body;
        const user = await knex("users").where('email', email).first()

        if(!user) {
            throw new AppError("email ou senha invalido", 401)
        }

        const checkPassword = await compare(password, user.password)

        if(!checkPassword) {
            throw new AppError("email ou senha invalido", 401)
        }

        const {secret, expiresIn} = authConfig.jwt
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })
        return response.json({token, user})
    }
}

module.exports = SessionsController
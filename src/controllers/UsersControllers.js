const AppError = require("../Utils/AppError")
const knex = require("../database/knex");
const { hash, compare } = require("bcryptjs");
const sqliteConnection = require("../database/sqlite");



class UsersController {
    async create(request, response) {
        const {name, email, password, confirmPassword, avatar} = request.body;
        if(!name) {
            throw new AppError("nome é obrigatorio")
        }
        
        if(!email) {
            throw new AppError("email é obrigatorio")
        }

        const checkUserExists = await knex('users').select('*').where('email', email).first();
        if(checkUserExists){
            throw new AppError("este email ja foi cadastrado ")
        }
        
        if(!password) {
            throw new AppError("senha é obrigatoria")
        }

        const confirmedPassword = password == confirmPassword
        if(!confirmedPassword) {
            throw new AppError("as senhas não conferem")
        }
        const hashedPassword = await hash(password,8);

        const user = {
            name, email, password: hashedPassword, avatar
        }
        await knex("users").insert(user);

        response.status(201).json()
    }

    async update(request, response) {
        const { name, email, password, old_password, avatar } = request.body;
        const { id } = request.params; 
        const user = await knex('users').select('*').where('id', id).first();
      
        const updatedEmail = await knex('users').select('*').where('email', email).first();
      
        if (updatedEmail && updatedEmail.id !== user.id) {
          throw new AppError("Email já cadastrado.");
        }
      
        if (password && !old_password) {
          throw new AppError("Informe a senha antiga.");
        }
      
        if (password && old_password) {
          const checkOldPassword = await compare(old_password, user.password);
      
          if (!checkOldPassword) {
            throw new AppError("Senha antiga incorreta.");
          }
          user.password = await hash(password, 8);
        }
      
        const updateFields = {
          updated_at: knex.fn.now(),
          ...(name && { name }),
          ...(email && { email }),
          ...(password && { password: user.password }),
          ...(avatar && { avatar })
        };
      
        await knex("users").update(updateFields).where("id", id);
        
        return response.status(200).json();
      }

    async delete(request, response) {
        const {id} = request.params
        await knex("users").where({id}).delete ();
        return response.json("usuario deletado");
    }
    
}

module.exports = UsersController 
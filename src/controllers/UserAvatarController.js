const knex = require("../database/knex");
const diskStorage = require("../providers/diskstorage");
const AppError = require("../Utils/AppError");

class UserAvatarController {
    async update(request, response) {
        const user_id = request.user.id;
        const avatarFileName = request.file.filename
        const DiskStorage = new diskStorage()

        const user = await knex("users").where({id: user_id}).first();
        if(!user) {
            throw new AppError("usuario não autenticado",401);
        }
        if(user.avatar) {
            await DiskStorage.deleteFile(user.avatar);
        }
        const fileName = await DiskStorage.savefile(avatarFileName); console.log("user saveFile")
        user.avatar = fileName;
        await knex("users").update(user).where({id: user_id});
        
        return response.json(user);
    }
}

module.exports = UserAvatarController;;
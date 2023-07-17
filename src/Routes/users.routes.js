const { Router } = require("express");
const ensureAuth = require("../middlewares/ensureAuth")
const UsersController = require("../controllers/UsersControllers")
const UserAvatarController = require("../controllers/UserAvatarContoller")
const uploadsConfig = require("../configs/upload")
const multer = require("multer")

const usersRoutes = Router();
const UPLOAD = multer(uploadsConfig.MULTER)
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();


usersRoutes.post ("/", usersController.create);
usersRoutes.put ("/", ensureAuth, usersController.update);
usersRoutes.delete ("/", ensureAuth, usersController.delete);
usersRoutes.patch ("/avatar", ensureAuth, UPLOAD.single("avatar"), userAvatarController.update)

module.exports = usersRoutes;
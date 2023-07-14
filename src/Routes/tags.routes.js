const { Router } = require("express")
const ensureAuth = require("../middlewares/ensureAuth")


const TagsController = require("../controllers/TagsController")

const tagsRoutes = Router();

const tagsController = new TagsController();

tagsRoutes.get("/", ensureAuth, tagsController.index);


module.exports = tagsRoutes  

const { Router } = require("express")
const ensureAuth = require("../middlewares/ensureAuth")

const NotesController = require("../controllers/NotesControllers")

const notesRoutes = Router();

const notesController = new NotesController();

notesRoutes.use(ensureAuth)

notesRoutes.post("/", notesController.create);
notesRoutes.put("/", notesController.update);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);
notesRoutes.get("/", notesController.index);

module.exports = notesRoutes   

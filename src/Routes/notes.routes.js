const { Router } = require("express")

const NotesController = require("../controllers/NotesControllers")

const notesRoutes = Router();

const notesController = new NotesController();

notesRoutes.post("/:user_id", notesController.create);
notesRoutes.put("/", notesController.update);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);
notesRoutes.get("/", notesController.index);

module.exports = notesRoutes   

const knex = require("../database/knex");
const AppError = require("../Utils/AppError")



class NotesController {
    async create(request, response) {
    const {title, description, rating, tags } = request.body;
    const user_id = request.user.id;

    const [movie_note_id] = await knex("movie_notes").insert({
        title,
        description,
        rating,
        user_id
    });

    if(tags && tags.length > 0) {

        const tagsInsert = tags.map(name => {
            return {    
                movie_note_id,
                user_id,
                name
            }
        });
        
        await knex("movie_tags").insert(tagsInsert);
    }
        
    response.json();
    }

    async update(request, response) {
        const {title, description, rating } = request.body;
        const {movie_note_id} = request.query;

        const checkNoteExist = await knex("movie_notes").where("id", movie_note_id).first();

        console.log(checkNoteExist)

        if (!checkNoteExist) {
            throw new AppError("Nota não encontrada.");
        }

        const updateFields = {
            updated_at: knex.fn.now(),
            ...(title && { title }),
            ...(description && { description }),
            ...(rating && { rating })
          };

        await knex("movie_notes").update(updateFields).where("id", movie_note_id);

        return response.status(200).json();
    }

    async show(request, response) {
        const {id} = request.params;
        const note = await knex("movie_notes").where({id}).first();
        const tags = await knex("movie_tags").where({movie_note_id: id});
       

        return response.json({
            ...note, tags
        });
    }

    async delete(request, response) {
        const {id} = request.params;
        await knex("movie_notes").where({id}).delete();
        return response.json("Nota apagada.");
    }

    async index(request, response) {
        const {title } = request.query;
        const user_id = request.user.id;

        let notes

        notes = await knex("movie_notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title").groupBy("movie_notes.id")
        
        
        
        const userTags = await knex("movie_tags").where({ user_id })
        const noteWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.movie_note_id === note.id)
            return {
                ...note, tags:noteTags
            }
        });
        

        return response.json( noteWithTags );
    }
}
module.exports = NotesController
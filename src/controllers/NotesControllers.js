const knex = require("../database/knex");
const AppError = require("../Utils/AppError")



class NotesController {
    async create(request, response) {
    const {title, description, rating, tags } = request.body;
    const {user_id} = request.params;

    const [movie_note_id] = await knex("movie_notes").insert({
        title,
        description,
        rating,
        user_id
    });

    const tagsInsert = tags.map(name => {
        return {
            movie_note_id,
            user_id,
            name
        }
    });

    await knex("movie_tags").insert(tagsInsert);

    response.json();
    }

    async update(request, response) {
        const {title, description, rating, addTags } = request.body;
        const {movie_note_id, user_id} = request.query;

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
        const {id} = request.params
        await knex("movie_notes").where({id}).delete();
        return response.json("Nota apagada.");
    }

    async index(request, response) {
        const {title, user_id, tags } = request.query;

        let notes

        if(tags) {
            const filterTags = tags.split(",").map(tag => tag.trim());
            notes = await knex("movie_tags")
            .select([
             "movie_notes.id",
             "movie_notes.title",
             "movie_notes.user_id"])
            .where("movie_notes.user_id", user_id)
            .whereLike("movie_notes.title", `%${title}%`)
            .whereIn("name", filterTags)
            .innerJoin("movie_notes", "movie_notes.id", "movie_tags.movie_note_id")
        }
        else {
            notes = await knex("movie_notes")
            .where({ user_id })
            .whereLike("title", `%${title}%`)
            .orderBy("title");
        }

        const userTags = await knex("movie_tags").where({ user_id })
        const noteWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.movie_note_id === note.id)
            return {
                ...note, tag:noteTags
            }
        });
        console.log()
        return response.json({ noteWithTags });
    }
}

module.exports = NotesController
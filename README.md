Portuguese:

Este projeto faz parte de um exercício do programa Explorer da Rocketseat.

Instruções:
- Use "npm run dev" para iniciar o servidor de desenvolvimento.
- Use "npx knex migrate:latest" para criar automaticamente as tabelas no banco de dados.

USUÁRIOS:

- Para cadastrar um usuário, utilize o Insomnia e acesse a URL http://localhost:3333/users com o método POST. Envie as seguintes informações no corpo da requisição no formato JSON:

{

  "name": "",

  "email": "",

  "password": "",

  "confirmPassword": "",

  "avatar": ""

}

  O campo "avatar" pode ser deixado em branco.

- Para atualizar informações como nome, email, senha e avatar de um usuário já existente, utilize a URL http://localhost:3333/users/x (substitua o "x" pelo ID do usuário a ser atualizado) e envie as seguintes informações no corpo da requisição no formato JSON:

{

  "name": "",

  "email": "",

  "password": "",

  "old_password": "",

  "avatar": ""

}

  Apenas para alterar a senha do usuário, é necessário informar a senha atual no campo "old_password".

- Para deletar um usuário, utilize a URL http://localhost:3333/users/x (substitua o "x" pelo ID do usuário a ser deletado).

NOTAS:

- Para cadastrar uma nota, utilize a URL http://localhost:3333/note/x (substitua o "x" pelo ID do usuário ao qual a nota deve ser atribuída) e envie as seguintes informações no corpo da requisição no formato JSON:

{
  "title": "",

  "description": "",

  "rating": "",

  "tags": [""]

}

  No campo "tags", utilize o formato: "tags": ["tag1", "tag2", "tag3"] para atribuir várias tags a uma nota.

- Para exibir uma nota específica, utilize a URL http://localhost:3333/note/x (substitua o "x" pelo ID da nota a ser exibida).

- Para atualizar o título, descrição e rating de uma nota, utilize a URL http://localhost:3333/notes/?movie_note_id= (atribua a "?movie_note_id=" o ID da nota a ser atualizada).

- Para buscar notas de um usuário específico, utilize a URL http://localhost:3333/notes/?user_id=1&title=1&tags=1 (atribua a "?user_id=" o ID do usuário, "&title=" um possível título de nota e "&tags=" uma possível tag).

- Para deletar uma nota, utilize a URL http://localhost:3333/notes/X (substitua X pelo ID da nota a ser apagada).

TAGS:

- Para exibir todas as tags de um usuário e o ID da nota a que essas tags estão vinculadas, utilize a URL http://localhost:3333/tags/X (substitua X pelo ID do usuário).

English:

This project is part of an exercise from Rocketseat's Explorer program.

Instructions:
- Use "npm run dev" to start the development server.
- Use "npx knex migrate:latest" to automatically create the tables in the database.

USERS:

- To register a user, use Insomnia and access the URL http://localhost:3333/users with the POST method. Send the following information in the request body in JSON format:

{
  "name": "",

  "email": "",

  "password": "",

  "confirmPassword": "",

  "avatar": ""

}

  The "avatar" field can be left empty.

- To update information such as name, email, password, and avatar of an existing user, use the URL http://localhost:3333/users/x (replace "x" with the user's ID to be updated) and send the following information in the request body in JSON format:

{
  "name": "",

  "email": "",

  "password": "",

  "old_password": "",

  "avatar": ""

}

  Only when changing the user's password, it is necessary to provide the current password in the "old_password" field.

- To delete a user, use the URL http://localhost:3333/users/x (replace "x" with the user's ID to be deleted).

NOTES:

- To register a note, use the URL http://localhost:3333/note/x (replace "x" with the user's ID to which the note should be assigned) and send the following information in the request body in JSON format:

{
  "title": "",

  "description": "",

  "rating": "",

  "tags": [""]

}

  In the "tags", use the format: "tags": ["tag1", "tag2", "tag3"] to assign multiple tags to a note.

- To display a specific note, use the URL http://localhost:3333/note/x (replace "x" with the note's ID to be displayed).

- To update the title, description, and rating of a note, use the URL http://localhost:3333/notes/?movie_note_id= (assign the "?movie_note_id=" the ID of the note to be updated).

- To search for notes from a specific user, use the URL http://localhost:3333/notes/?user_id=1&title=1&tags=1 (assign "?user_id=" the user's ID, "&title=" a possible note title, and "&tags=" a possible tag).

- To delete a note, use the URL http://localhost:3333/notes/X (replace X with the ID of the note to be deleted).

TAGS:

- To display all tags of a user and the ID of the note to which these tags are linked, use the URL http://localhost:3333/tags/X (replace X with the user's ID).


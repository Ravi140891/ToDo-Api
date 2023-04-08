The project structure consists of three main files:

index.js: This is the entry point of the application. It initializes a Hapi server and defines two routes: userRoutes and todoRoutes.

db.js: This file establishes a connection to the PostgreSQL database and exports an instance of Knex and the Objection Model class.

routes/: This directory contains two route files - users.js and todoRoutes.js. These files define routes for handling CRUD operations for users and their to-do lists respectively.

The project uses Hapi.js as the web framework, and Objection.js as the ORM to interact with the PostgreSQL database.

In users.js, there are two routes:

/signup: This is a POST route that allows a user to create an account by providing their name, email, and password. The handler function first retrieves these details from the request payload, inserts them into the database, and returns the newly created user as a response.

/login: This is a POST route that allows a user to log in to their account by providing their email and password. The handler function first retrieves these details from the request payload, fetches the corresponding user from the database using Objection's findOne() method, and compares the password hash stored in the database with the one provided by the user. If the passwords match, a JSON Web Token (JWT) is created and returned along with the user object.

In todoRoutes.js, there are four routes:

/todos: This is a GET route that retrieves all to-do items for a user. The userId is obtained from the decoded JWT token in the request's auth.credentials property. The handler function then queries the database for all to-do items belonging to that user and returns them in the response.

/todos: This is a POST route that allows a user to create a new to-do item. The userId is obtained from the decoded JWT token in the request's auth.credentials property, and the to-do item details are retrieved from the request payload. The handler function then inserts the to-do item into the database and returns it as a response.

/todos/{id}: This is a PUT route that allows a user to update a specific to-do item. The userId is obtained from the decoded JWT token in the request's auth.credentials property, and the to-do item ID is obtained from the request params. The handler function then updates the corresponding to-do item in the database and returns it as a response.

/todos/{id}: This is a DELETE route that allows a user to delete a specific to-do item. The userId is obtained from the decoded JWT token in the request's auth.credentials property, and the to-do item ID is obtained from the request params. The handler function then deletes the corresponding to-do item from the database and returns a 204 No Content response.

Unhandled rejections are caught using the process.on() method to ensure that the application does not terminate unexpectedly.

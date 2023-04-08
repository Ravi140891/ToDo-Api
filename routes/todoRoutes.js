const Todo = require("../models/Todo");

const todoRoutes = [
  {
    method: "GET",
    path: "/todos",
    handler: async (request, h) => {
      try {
        const { userId } = request.auth.credentials;
        const todos = await Todo.query().where({ user_id: userId });
        return h.response(todos).code(200);
      } catch (err) {
        console.error(err);
        return h.response({ message: "Internal server error" }).code(500);
      }
    },
  },
  {
    method: "POST",
    path: "/todos",
    handler: async (request, h) => {
      try {
        const { userId } = request.auth.credentials;
        const { category_id, name, deadline } = request.payload;
        const todo = await Todo.query().insert({
          user_id: userId,
          category_id,
          name,
          deadline,
        });
        return h.response(todo).code(201);
      } catch (err) {
        console.error(err);
        return h.response({ message: "Internal server error" }).code(500);
      }
    },
    options: {
      payload: {
        parse: true,
      },
    },
  },
  {
    method: "PUT",
    path: "/todos/{id}",
    handler: async (request, h) => {
      try {
        const { userId } = request.auth.credentials;
        const { id } = request.params;
        const { category_id, name, deadline, completed } = request.payload;
        const todo = await Todo.query()
          .where({ id, user_id: userId })
          .update({ category_id, name, deadline, completed })
          .returning("*");
        if (todo.length === 0) {
          return h.response({ message: "Todo not found" }).code(404);
        }
        return h.response(todo[0]).code(200);
      } catch (err) {
        console.error(err);
        return h.response({ message: "Internal server error" }).code(500);
      }
    },
    options: {
      payload: {
        parse: true,
      },
    },
  },
  {
    method: "DELETE",
    path: "/todos/{id}",
    handler: async (request, h) => {
      try {
        const { userId } = request.auth.credentials;
        const { id } = request.params;
        const todo = await Todo.query().delete().where({ id, user_id: userId });
        if (todo === 0) {
          return h.response({ message: "Todo not found" }).code(404);
        }
        return h.response().code(204);
      } catch (err) {
        console.error(err);
        return h.response({ message: "Internal server error" }).code(500);
      }
    },
  },
  {
    method: "PATCH",
    path: "/todos/{id}",
    handler: async (request, h) => {
      try {
        const { userId } = request.auth.credentials;
        const { id } = request.params;
        const { category_id, name, deadline, completed } = request.payload;
        const todo = await Todo.query()
          .where({ id, user_id: userId })
          .patch({ category_id, name, deadline, completed })
          .returning("*");
        if (!todo) {
          return h.response({ message: "Not Found" }).code(404);
        }
        return h.response(todo).code(200);
      } catch (err) {
        console.error(err);
        return h.response({ message: "Internal server error" }).code(500);
      }
    },
    options: {
      payload: {
        parse: true,
      },
    },
  },
];

module.exports = todoRoutes;

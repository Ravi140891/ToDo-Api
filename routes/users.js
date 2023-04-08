const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { knex } = require("../db");

User.knex(knex);

const userRoutes = [
  {
    method: "POST",
    path: "/signup",
    handler: async (request, h) => {
      try {
        const { name, email, password } = request.payload;
        const user = await User.query().insert({ name, email, password });
        return h.response(user).code(201);
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
    method: "POST",
    path: "/login",
    handler: async (request, h) => {
      try {
        const { email, password } = request.payload;
        const user = await User.query().findOne({ email });
        if (!user) {
          return h.response({ message: "Invalid credentials" }).code(401);
        }
        const isValidPassword = await user.verifyPassword(password);
        if (!isValidPassword) {
          return h.response({ message: "Invalid credentials" }).code(401);
        }
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          "secretKey",
          { expiresIn: "1h" }
        );
        return h.response({ token, user }).code(200);
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

module.exports = userRoutes;

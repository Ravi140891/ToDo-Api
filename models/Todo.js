const { Model } = require("objection");

class Todo extends Model {
  static get tableName() {
    return "todos";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["user_id", "name", "deadline"],
      properties: {
        id: { type: "integer" },
        user_id: { type: "integer" },
        category_id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        deadline: { type: "string", format: "date-time" },
        completed: { type: "boolean" },
      },
    };
  }
}

module.exports = Todo;

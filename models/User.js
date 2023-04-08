const { Model } = require("objection");
const bcrypt = require("bcrypt");

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email", "password"],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", minLength: 1, maxLength: 255 },
        password: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }

  async $beforeInsert() {
    this.password = await User.hashPassword(this.password);
  }

  async verifyPassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  static async hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  static async create(userData) {
    const hashedPassword = await this.hashPassword(userData.password);
    return this.query().insert({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });
  }
}

module.exports = User;

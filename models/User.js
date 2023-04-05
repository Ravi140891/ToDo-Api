const pool = require("../db");
const bcrypt = require("bcrypt");

class User {
  static async create(name, email, password) {
    const client = await pool.connect();
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await client.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );
    return rows[0];
  }

  static async findByEmail(email) {
    const client = await pool.connect();
    const { rows } = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  }

  static async verifyPassword(user, password) {
    return await bcrypt.compare(password, user.password);
  }
}

module.exports = User;

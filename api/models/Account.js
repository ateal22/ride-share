const { Model } = require("objection");
const { hash, compare } = require("bcrypt");

const SALT_ROUNDS = 10;

class Account extends Model {
  static get tableName() {
    return "Account";
  }

  // Encrypt the password before storing it in the database.
  // SHOULD ALSO DO THIS ON UPDATE!

  // eslint-disable-next-line no-unused-vars
  async $beforeInsert(queryContext) {
    this.password = await hash(this.password, SALT_ROUNDS);
  }

  async verifyPassword(plainTextPassword) {
    console.log(`compare(${plainTextPassword}, ${this.password})`);
    return compare(plainTextPassword, this.password);
  }
}

module.exports = Account;

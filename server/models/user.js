const { executeQuery } = require("../database");

class userModel {
  static saveUser(user) {
    let query = `INSERT INTO users 
                (id, firstname, lastname, login, password) 
                VALUES (NULL, "${user.firstname}", "${user.lastname}", "${user.login}", "${user.password}")`;

    executeQuery(query);
  }

  static async getUserID(user) {
    let query = `SELECT id FROM users  
                WHERE login = "${user.login}"`;

    let result = await executeQuery(query);
    if (result.length === 0) {
      return "No such user";
    }
    return result[0].id;
  }

  static async getHashedPassword(login) {
    let query = `SELECT password FROM users  
                WHERE login = "${login}"`;

    let result = await executeQuery(query);
    if (result.length === 0) {
      return "No such user";
    }
    return result[0].password;
  }

  static async getUserByID(id, columns = ["*"]) {
    let query = `SELECT ${columns.join(", ")} FROM users  
                WHERE id = "${id}"`;

    let result = await executeQuery(query);

    if (result.length === 0) {
      return "No such user";
    }
    return JSON.parse(JSON.stringify(result[0]));
  }

  static async findUsersByLogin(login) {
    let query = `SELECT id, firstname, lastname FROM users  
                WHERE login LIKE "${login}%"`;

    let result = await executeQuery(query);

    if (result.length === 0) {
      return JSON.parse(JSON.stringify(result));
    }
    return JSON.parse(JSON.stringify(result));
  }
}

module.exports = {
  userModel,
};

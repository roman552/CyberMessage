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
                WHERE login = "${user.login}" AND password = "${user.password}"`;

    let result = await executeQuery(query);

    if (result.length === 0) {
      return "No such user";
    }
    return result[0].id;
  }
}

// get user by id

// get user's contacts (?)

module.exports = {
  userModel,
};

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

  static async getUserByID(id) {
    let query = `SELECT * FROM users  
                WHERE id = "${id}"`;

    let result = await executeQuery(query);

    if (result.length === 0) {
      return "No such user";
    }
    return JSON.parse(JSON.stringify(result[0]));
  }

  static async getUserByLogin(login) {
    let query = `SELECT id, firstname, lastname FROM users  
                WHERE login LIKE "${login}%"`;

    let result = await executeQuery(query);

    if (result.length === 0) {
      return JSON.parse(JSON.stringify(result));
    }
    return JSON.parse(JSON.stringify(result));
  }

  static async getUserContactsByID(id) {
    let query = `SELECT users.id, users.firstname, users.lastname 
                FROM contacts inner join users 
                on contacts.user2ID = users.id 
                WHERE contacts.user1ID = ${id}`;

    let result = await executeQuery(query);
    if (result.length === 0) {
      return "No contacts";
    }
    return JSON.parse(JSON.stringify(result));
  }
}

module.exports = {
  userModel,
};

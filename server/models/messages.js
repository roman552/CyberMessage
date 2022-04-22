const { executeQuery } = require("../database");

class MessagesModel {
  static async findAll(userID, friendID, columns = ["*"]) {
    let query = `SELECT ${columns.join(",")} 
                 FROM messages
                 WHERE (senderID = ${userID} AND receiverID = ${friendID}) 
                 OR (senderID = ${friendID} AND receiverID = ${userID})`;

    let result = await executeQuery(query);

    return JSON.parse(JSON.stringify(result));
  }
}

module.exports = {
  MessagesModel,
};

const { executeQuery } = require("../database");

class MessagesModel {
  static async saveMessage(senderID, receiverID, messageText) {
    let query = `INSERT INTO messages (id, senderID, receiverID, message) 
                 VALUES (NULL,${senderID},${receiverID},"${messageText.replace(
      /"/g,
      '\\"'
    )}")`;

    let res = await executeQuery(query);
    return res.insertId;
  }
  static async findAll(userID, friendID, columns = ["*"]) {
    let query = `SELECT ${columns.join(",")} 
                 FROM messages
                 WHERE (senderID = ${userID} AND receiverID = ${friendID}) 
                 OR (senderID = ${friendID} AND receiverID = ${userID})`;

    let result = await executeQuery(query);

    return JSON.parse(JSON.stringify(result));
  }
  static async getMessageByID(messageID, columns = ["*"]) {
    let query = `SELECT ${columns.join(",")} 
                 FROM messages
                 WHERE id = ${messageID}`;

    let result = await executeQuery(query);

    return JSON.parse(JSON.stringify(result[0]));
  }
}

module.exports = {
  MessagesModel,
};

const { executeQuery } = require("../database");

class contactsModel {
  static async saveContactRequest(requesterID, friendID) {
    let query = `INSERT INTO contacts (id, user1ID, user2ID) 
                VALUES (NULL, '${requesterID}', '${friendID}')`;

    let result = await executeQuery(query).catch((err) => {return "ERROR"});
    return result;
  }
  static async getAllAcceptedContacts(userID) {
    let query = `SELECT users.id, users.firstname, users.lastname 
                 FROM contacts inner join users 
                 on contacts.user2ID = users.id 
                 WHERE contacts.user1ID = ${userID} AND contacts.isAccepted = 1`;

    let result = await executeQuery(query);
    if (result.length === 0) {
      return [];
    }
    return JSON.parse(JSON.stringify(result));
  }
  static async getAllUnacceptedContacts(userID) {
    let query = `SELECT users.id, users.firstname, users.lastname 
                 FROM contacts inner join users 
                 on contacts.user1ID = users.id 
                 WHERE contacts.user2ID = "${userID}" AND contacts.isAccepted = 0`;

    let result = await executeQuery(query);
    if (result.length === 0) {
      return [];
    }
    return JSON.parse(JSON.stringify(result));
  }

  static async acceptContactRequset(userID, requesterID) {
    let query = `UPDATE contacts 
                 SET isAccepted = 1
                 WHERE user1ID = ${requesterID} AND user2ID = ${userID};
    
                 INSERT INTO contacts (id, user1ID, user2ID, isAccepted) 
                 VALUES (NULL, '${userID}', '${requesterID}', 1)`;

    await executeQuery(query);
  }

  static async declineContactRequset(userID, requesterID) {
    let query = `DELETE FROM contacts 
                 WHERE user1ID = ${requesterID} AND user2ID = ${userID};`;

    await executeQuery(query);
  }
}

module.exports = {
  contactsModel,
};

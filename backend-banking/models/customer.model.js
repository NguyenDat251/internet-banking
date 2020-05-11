const bcrypt = require('bcryptjs');
const db = require('../utils/db');

module.exports = {
  add: entity => {
    // entity = {
    //   "username": "admin",
    //   "password": "admin",
    //   "identity_number": "025895863",
    //   "phone_number": "0704468256",
    //   "firstname": "linh",
    //   "lastname": "nguyen van",
    //   "date_of_birth": "1998-11-12",
    //   "email_address": "linh1612340@gmail.com"
    // }
    entity["firstname"] = entity["firstname"].toUpperCase();
    entity["lastname"] = entity["lastname"].toUpperCase();

    const hash = bcrypt.hashSync(entity.password, 8);
    entity["hashed_password"] = hash;
    delete entity["password"];
    return db.add(entity, 'customer');
  },

  searchByUserName: userName => db.load(`select * from customer where username = '${userName}'`),
};
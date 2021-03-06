const bcrypt = require('bcryptjs');
const db = require('../utils/db');
const randomstring = require('randomstring');

module.exports = {
  add: entity => {
    // entity = {
    //   "username": "admin",
    //   "password": "admin",
    // }

    const hash = bcrypt.hashSync(entity.password, 8);
    entity["hashed_password"] = hash;

    entity["refresh_secret"] = randomstring.generate(20);
    delete entity["password"];
    return db.add(entity, 'admin');
  },

  searchByUserName: userName => db.load(`select * from admin where username = '${userName}'`),
};

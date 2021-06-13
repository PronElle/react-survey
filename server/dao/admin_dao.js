'use strict';

const Admin = require('../entity/admin');
const db = require('../db');
const bcrypt = require('bcrypt');

const createAdminObject = (row) => {
  return new Admin(row.id, row.name, row.email, row.hash);
}

exports.getAdmin = (email, password) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM admins WHERE email = ?';
    db.get(query, [email], (err, row) => {
      if (err)
        reject(err); // DB error
      else if (row === undefined)
        resolve(undefined); // admin not found
      else {
        bcrypt.compare(password, row.hash).then( matches => {
          if (matches) // password matches
            resolve(createAdminObject(row));
          else
            resolve(false); // password not matching
        });
      }
    });
  });
}

exports.getAdminById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM admins WHERE id = ?';
    db.get(query, [id], (err, row) => {
      if (err)
        reject(err);
      else if (row === undefined)
        resolve({ error: 'Admin not found.' });
      else {
        const admin = createAdminObject(row);
        resolve(admin);
      }
    });
  });
};
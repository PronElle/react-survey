'use strict';

const Survey = require('../entity/survey');
const db = require('../db');

const createSurveyEntity = (row) => {
    return new Survey(row.id, row.title, row.answers, row.admin);
}

exports.createSurvey = (survey) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO surveys(title, answers, admin) VALUES(?,?,?)';
        db.run(query, [survey.title, survey.answers, survey.admin],  function (err) {
            if(err)
                reject(err);
            else
                resolve(this.lastID);
        });
    })
}

exports.getSurveys = (admin) => {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * from surveys';
        if(admin)
           query += ' WHERE admin = ?';
        
        db.all(query, [admin], (err, rows) => {
            if(err) 
               reject(err)
            else {
                let surveys = rows.map( row => createSurveyEntity(row));
                resolve(surveys);
            }
        })
    });
}




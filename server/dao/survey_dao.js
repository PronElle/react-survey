'use strict';

const Survey = require('../entity/survey');
const db = require('../db');

const createSurveyObject = (row) => {
    return new Survey(row.id, row.title, row.answers, row.admin);
}

exports.createSurvey = (survey) => {

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
                let surveys = rows.map( row => createSurveyObject(row));
                resolve(surveys);
            }
        })
    });
}




'use strict';

const Question = require('../entity/question');
const db = require('../db');

const createQuestionObject = (row) => {
    // TODO: to be implemented
}

exports.createQuestion = (question) => {
  // TODO: to be implemented
}

exports.getQuestions = (survey) => {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * from questions WHERE survey = ?';
        
        db.all(query, [survey], (err, rows) => {
            if(err) 
               reject(err)
            else {
                let questions = rows.map( row => createQuestionObject(row));
                resolve(questions);
            }
        })
    });
}

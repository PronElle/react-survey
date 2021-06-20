'use strict';

const Question = require('../entity/question');
const db = require('../db');

const createQuestionEntity = (row) => {
  return new Question(row.id, row.content, row.options, row.min, row.max, row.survey);
}

exports.createQuestion = (question) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO questions (id, content, options, min, max, survey) SELECT ?,?,?,?,?,MAX(id) FROM surveys'
        db.run(query, [question.id, question.content, question.options, question.min, question.max],  
            function (err) {
                if(err)
                    reject(err);
                else
                    resolve(this.lastID);
        });
    })
}

exports.getQuestions = (surveyid) => {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM questions WHERE survey = ?';
        
        db.all(query, [surveyid], (err, rows) => {
            if(err) 
               reject(err)
            else {
                let questions = rows.map( row => createQuestionEntity(row));
                resolve(questions);
            }
        })
    });
}

'use strict';

const Question = require('../entity/question');
const db = require('../db');

const createQuestionEntity = (row) => {
  return new Question(row.id, row.content, row.options, row.min, row.max, row.survey);
}

exports.createQuestions = (questions) => {
    return new Promise((resolve, reject) => {
        const placeholders = questions.map(() => "(?, ?, ?, ?, ?, ?)").join(', ');
        const query = 'INSERT INTO questions (id, content, options, min, max, survey) VALUES ' + placeholders;
        
        db.run(query, questions.map(q => [q.id, q.content, q.options, q.min, q.max, q.survey]).flat(),  
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

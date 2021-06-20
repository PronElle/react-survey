'use strict';

const Reply = require('../entity/reply');
const db = require('../db');

const createReplyEntity = (row) => {
    return new Reply(row.id, row.name, row.answers, row.survey);
}


exports.createReply = (reply) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO replies(name, answers, survey) VALUES(?,?,?)'
        db.run(query, [reply.name, reply.answers, reply.survey],  
            function (err) {
                if(err)
                    reject(err);
                else
                    resolve(this.lastID);
        });
    })
}

exports.getReplies = (surveyid) => {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM replies WHERE survey = ?';
        
        db.all(query, [surveyid], (err, rows) => {
            if(err) 
               reject(err)
            else {
                let replies = rows.map( row => createReplyEntity(row));
                resolve(replies);
            }
        })
    });  
}

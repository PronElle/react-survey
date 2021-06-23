/** --- item models --- */
import SurveyModel from '../models/SurveyModel';
import QuestionModel from '../models/QuestionModel';
import ReplyModel from '../models/ReplyModel';

const BASEURL = '/api';

/** --- Auth APIs --- */

async function login(credentials) {
  let response = await fetch(BASEURL + '/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  if(response.ok) {
    const user = await response.json();
    return user.name;
  }
  else {
    try {
      const errDetail = await response.json();
      throw errDetail.message;
    }
    catch(err) {
      throw err;
    }
  }
}
  
async function logout() {
    await fetch(BASEURL + '/sessions/current', { method: 'DELETE' });
}
  
async function getUserInfo() {
  const response = await fetch(BASEURL + '/sessions/current');
  const userInfo = await response.json();
  
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo;  // an object with the error coming from the server
  }
}

/** --- Survey APIs --- */
async function getSurveys(){
   const url = BASEURL + '/surveys';
   const response = await fetch(url);
   const surveysJson = await response.json();

   if(response.ok)
     return surveysJson.map(s => new SurveyModel(s.id, s.title, s.answers, s.creator));
   else
     throw surveysJson; 
}

async function createSurvey(title){
  const survey = {
    title: title,
    answers: 0,
  }

  const response = await fetch(BASEURL + '/surveys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(survey)
  });  

  return response.ok ? null : { 'err': 'POST error' };
}


/** --- Question APIs ---*/
async function getQuestions(surveyid){
  const url = BASEURL + '/questions?surveyid=' + surveyid;
  
  const response = await fetch(url);
  const questionsJson = await response.json();

  if(response.ok){
    return questionsJson.map(q => new QuestionModel(q.id, q.content, q.options ? JSON.parse(q.options) : undefined, q.min, q.max, q.survey));
  } else
    throw questionsJson; 
}


async function createQuestions(questions){
   for(let q of questions){
    q.options = JSON.stringify(q.options);
    const response = await fetch(BASEURL + '/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(q)     
     });
     
     if (! response.ok)
        return {'err': 'PUT error'};
   }

   return null;
}

/**--- Reply APIs --- */

async function getReplies(surveyid){
  const url = BASEURL + '/replies?surveyid=' + surveyid;
  
  const response = await fetch(url);
  const repliesJson = await response.json();

  if(response.ok){
    return repliesJson.map(r => new ReplyModel(r.id, r.name, r.answers ? JSON.parse(r.answers) : undefined, r.survey));
  } else
    throw repliesJson; 
}


async function addReply (reply){
  reply.answers = JSON.stringify(reply.answers);
  const response = await fetch(BASEURL + '/replies/' + reply.survey, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reply)
    });  

  return response.ok ? null : { 'err': 'POST error' };
}



const API = { login, logout, getUserInfo, getSurveys, createSurvey, getQuestions, createQuestions, addReply, getReplies };

export default API;
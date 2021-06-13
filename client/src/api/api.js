import SurveyModel from '../models/SurveyModel';

/* --- Auth APIs --- */

async function login(credentials) {
  let response = await fetch('/sessions', {
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
    await fetch('/sessions/current', { method: 'DELETE' });
}
  
async function getUserInfo() {
  const response = await fetch('/sessions/current');
  const userInfo = await response.json();
  
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo;  // an object with the error coming from the server
  }
}

/* --- Survey APIs --- */
async function getSurveys(admin){
   const url = '/surveys';
   const response = await fetch(url);
   const surveysJson = await response.json();

   if(response.ok)
     return surveysJson.map(s => new SurveyModel(s.id, s.title, s.answers, s.creator));
   else
     throw surveysJson; 
}

const API = { login, logout, getUserInfo, getSurveys };
export default API;
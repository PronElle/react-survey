/* --- Auth APIs --- */

async function login(credentials) {
  let response = await fetch('/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  console.log(response);
  
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

const API = { login, logout, getUserInfo};
export default API;
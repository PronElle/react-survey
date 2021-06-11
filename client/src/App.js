import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Col } from 'react-bootstrap';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { AdminContext } from './AdminContext';

// components
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import  SurveyList from './components/SurveyList';
import SurveyForm from './components/SurveyForm';

// API
import API from './api/api';

const SURVEYS = [
  {
  "id": 0,
  "creator": "john",
  "title": "Sei d'accordo che gli informatici siano i migliori ?",
  "answers": 15,
  },
  {
    "id": 1,
    "creator": "john",
    "title": "Approvi l'abolizione di fisica I ? ",
    "answers": 3 
  },
  {
    "id": 2,
    "creator": "john",
    "title": "che ne so",
    "answers": 0 
    },
    {
      "id": 3,
      "creator": "john",
      "title": "foo survey on foo",
      "answers": 0 
    },
];


const QUESTIONS = [
 {
   "survey_id": 0,
   "question": "domanda ?",
   "options": [{"optionText":"5"},{"optionText":"3"},{"optionText":"2"}],
   "open":false,
   "required":false,
 },
 {
  "survey_id": 0,
  "question": "domanda1 ?",
  "options": [{"optionText":"88"},{"optionText":"33"},{"optionText":"23"}],
  "open":false,
  "required":false,
  },
  {
    "survey_id": 1,
    "question" :"how build the app ?",
    "options": ["vinayak", "sarthak", "somil", "devesh"],
    "open":false,
    "required":true,
  }
];

function App() {
  const [surveys, setSurveys] = useState(SURVEYS);
  const [questions, setQuestions] = useState(QUESTIONS);

  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // auth 
    // auth after first mount 
    useEffect(() => {
      const checkAuth = async () => {
        try {
          await API.getUserInfo();
          setLoggedIn(true);
        } catch (err) {
          setLoading(false); // not logged but loaded
        }
      };
      checkAuth();
    }, []);


  // mount
  // useEffect(...)

  // add question

  // delete question
 
  /**
   * logs user in and sets proper states
   * @param {*} credentials 
   */
  const login = async (credentials) => {
    try {
      const user = await API.login(credentials);
      setLoggedIn(true);
      setMessage( `Welcome, ${user}!`);
    } catch (err) {
      setMessage(err);
    }
  }

   /**
   * logs user out and clears states
   */
  const logout = async () => {
    await API.logout();
    setLoggedIn(false);
    setMessage('');
  }

  const context = {
    loggedIn: loggedIn,
    message: message,
    setMessage: setMessage,
    loading: loading
  }

  return (
    <AdminContext.Provider value={context}>
      <Container fluid>
        <NavBar logout={logout}/>
        <Switch>
          <Route path="/login" render={() => {
              return loggedIn ? <Redirect to="/surveys" /> : <LoginForm login={login} />
          }}/>

          <Route path='/surveys'>
            <Col className="mx-auto below-nav">
              <h1>{loggedIn ? "Your Surveys" : "Available surveys"}</h1>
              <SurveyList surveys = {surveys} />
            </Col>
          </Route>

          <Route path='/survey/:id' render={ ({match}) => {
                    // eslint-disable-next-line
              return surveys.find(survey => survey.id == match.params.id) ?
                   <SurveyForm questions={questions.filter(q => q.survey_id == match.params.id)} setQuestions={setQuestions}/> : <Redirect to='/surveys'/>
          }}/>
        

          <Route>
            <Redirect to='/surveys'/>
          </Route>

        </Switch>
      </Container>
    </AdminContext.Provider>
  );
}

export default withRouter(App);

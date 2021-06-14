import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Col, Button } from 'react-bootstrap';
import { withRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import { AdminContext } from './AdminContext';

// components
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import  SurveyList from './components/SurveyList';
import SurveyForm from './components/SurveyForm';
import AddSurveyForm from './components/AddSurveyForm';

// API
import API from './api/api';



const QUESTIONS = [
 {
   "survey_id": 1,
   "text": "What is 3 + 2 ?",
   "options": [{"optionText":"It's 5", "id": 0},{"optionText":"supercalifragilisichespiralidoso", "id": 2},{"optionText":"2", "id": 3}],
   "open":false,
   "required":false,
 },
 {
  "survey_id": 1,
  "text": "What is 3 time 11 ? ",
  "options": [{"optionText":"88", "id": 4},{"optionText":"33", "id": 5},{"optionText":"23", "id": 6}],
  "open":false,
  "required":false,
  },
  {
    "survey_id": 1,
    "text": "What is 3 + 2 ?",
    "options": [{"optionText":"It's 5", "id": 0},{"optionText":"supercalifragilisichespiralidoso", "id": 2},{"optionText":"2", "id": 3}],
    "open":false,
    "required":false,
  },
  {
   "survey_id": 1,
   "text": "What is 3 time 11 ? ",
   "options": [{"optionText":"88", "id": 0},{"optionText":"33", "id": 1},{"optionText":"23", "id": 2}],
   "open":false,
   "required":false,
   }, {
    "survey_id": 1,
    "text": "What is 3 + 2 ?",
    "options": [{"optionText":"It's 5", "id": 0},{"optionText":"supercalifragilisichespiralidoso", "id": 2},{"optionText":"2", "id": 3}],
    "open":false,
    "required":true,
  },
  {
   "survey_id": 1,
   "text": "What is 3 time 11 ? ",
   "options": [{"optionText":"88", "id": 0},{"optionText":"33", "id": 1},{"optionText":"23", "id": 2}],
   "open":false,
   "required":false,
   },
   {
    "survey_id": 1,
    "text": "What is 3 + 2 ?",
    "options": [{"optionText":"It's 5", "id": 0},{"optionText":"supercalifragilisichespiralidoso", "id": 2},{"optionText":"2", "id": 3}],
    "open":false,
    "required":false,
  },
  {
   "survey_id": 1,
   "text": "What is 3 time 11 ? ",
   "options": [{"optionText":"88", "id": 0},{"optionText":"33", "id": 1},{"optionText":"23", "id": 2}],
   "open":false,
   "required":false,
   },
  {
    "survey_id": 2,
    "text" :"what do you think is this app built for ?",
    "options": undefined,
    "open":true,
    "required":true,
  },
  {
    "survey_id": 2,
    "text": "What is 3 + 2 ?",
    "options": [{"optionText":"It's 5", "id": 0},{"optionText":"supercalifragilisichespiralidoso", "id": 2},{"optionText":"2", "id": 3}],
    "open":false,
    "required":false,
  },
];


function App() {
  const [surveys, setSurveys] = useState([]);
  const [questions, setQuestions] = useState(QUESTIONS);
  const [records, setRecords] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // auth 
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.getUserInfo();
        setLoggedIn(true);
      } catch (err) {
    //    setLoading(false); // not logged but loaded
      }
    };
    checkAuth();
  }, []);


  // mount
  useEffect(() => {
    API.getSurveys()
        .then( survs => {
          setSurveys(survs);
          setLoading(false);
        })
  }, [loggedIn, surveys.length]);

  // add question

  // delete question

  // add option

  // add record
 
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
            {loggedIn && <Link to="/add"><Button variant="primary" size="lg" className="fixed-right-bottom">New Survey</Button></Link>}

          </Route>

          <Route path='/survey/:id' render={ ({match}) => {
            if(!loading){
                    // eslint-disable-next-line 
              return surveys.find(survey => survey.id == match.params.id) ?
                   <SurveyForm questions={questions.filter(q => q.survey_id == match.params.id)} setQuestions={setQuestions}/> : <Redirect to='/surveys'/>
            }
          }}/>

          <Route path='/add'>
            <AddSurveyForm />
          </Route>
        

          <Route>
            <Redirect to='/surveys'/>
          </Route>

        </Switch>
      </Container>
    </AdminContext.Provider>
  );
}

export default withRouter(App);

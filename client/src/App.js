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
   "content": "What is 3 time 11 ? ",
   "options": [{"text":"88", "id": 128},{"text":"33", "id": 1},{"text":"23", "id": 2}],
   "min": 1,
   "max": 1,
   }, {
    "survey_id": 1,
    "content": "What is 3 + 2 ?",
    "options": [{"text":"It's 5", "id": 3},{"text":"supercalifragilisichespiralidoso", "id": 4},{"text":"2", "id": 5}],
    "min": 1,
    "max": 2,
  },
  {
   "survey_id": 1,
   "content": "What is 3 time 11 ? ",
   "options": [{"text":"88", "id": 6},{"text":"33", "id": 7},{"text":"23", "id": 8}],
   "min": 0,
   "max": 1,
   },
  {
    "survey_id": 2,
    "content" :"what do you think is this app built for ?",
    "options": undefined,
    "min": 1,
   "max": 1,
  },
  {
    "survey_id": 2,
    "content": "What is 3 + 2 ?",
    "options": [{"text":"It's 5", "id": 199},{"text":"supercalifragilisichespiralidoso", "id": 2},{"text":"2", "id": 3}],
    "min": 0,
   "max": 1,
  },
];


function App() {
  const [surveys, setSurveys] = useState([]);
  const [questions, setQuestions] = useState([]);
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
        });
  }, [loggedIn, surveys.length]);

  // add new Survey (and its questions)
  const addSurvey = (title, _questions) => {
    API.createSurvey(title)
       .then(() => API.getSurveys().then(survs => setSurveys(survs)));
    API.createQuestions(_questions);
  }

  // add  a new record
  const addRecord = (name, surveyid, answers) => {
    // API.addRecord(...)
    // update survey (num of peopel answering)
  }
 
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
            {loggedIn && <Link to="/add"><Button variant="primary" size="lg" className="fixed-right-bottom-circular">+</Button></Link>}

          </Route>

          <Route path='/survey/:id' render={ ({match}) => {
            if(!loading){
                    // eslint-disable-next-line 
              const survey = surveys.find(survey => survey.id == match.params.id); 
              return survey ?
                   <SurveyForm surveyid={survey.id} questions={questions} setQuestions={setQuestions}
                               title={survey.title}/> : <Redirect to='/surveys'/>
            }
          }}/>

          <Route path='/add'>
            <AddSurveyForm addSurvey={addSurvey}/>
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

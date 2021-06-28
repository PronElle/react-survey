import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Col, Button } from 'react-bootstrap';
import { withRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
// admin context
import { AdminContext } from './context/AdminContext';

// components
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import  SurveyList from './components/SurveyList';
import SurveyForm from './components/SurveyForm';
import AddSurveyForm from './components/AddSurveyForm';
import AnswersSlideShow from './components/AnswersSlideShow';

// API
import API from './api/api';


function App() {
  const [surveys, setSurveys] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // auth 
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.getUserInfo();
        setLoggedIn(true);
      } catch (err) {}
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
        .catch(err => setLoading(false));
  }, [loggedIn]);


  // add new Survey (and its questions)
  const addSurvey = async (title, _questions) => {
    try {
      const surveyid = await API.createSurvey(title);
      API.createQuestions(_questions, surveyid);
      API.getSurveys().then(survs => setSurveys(survs));
    } catch(err){
      setMessage(err);
    }
  }

  // add  a new Reply to the db and updates the 
  // number of answerer for that specific survey
  const addReply = (reply) => {
     API.addReply(reply);
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
            <Col className="text-center below-nav">
              <h1>{loggedIn ? "Your Surveys" : "Available surveys"}</h1>
              <SurveyList surveys = {surveys} />
            </Col>
            {loggedIn && <Link to="/add"><Button variant="primary" size="lg" className="fixed-right-bottom-circular">+</Button></Link>}

          </Route>

          <Route path='/survey/:id' render={ ({match}) => {
            if(!loading){
                // eslint-disable-next-line 
              const survey = surveys.find(survey => survey.id == match.params.id); 
              return !survey ? <Redirect to='/surveys'/> : 
                     loggedIn ? <AnswersSlideShow title={survey.title} surveyid={survey.id} questions={questions} setQuestions={setQuestions}/> 
                                :
                                <SurveyForm surveyid={survey.id} questions={questions} setQuestions={setQuestions} title={survey.title} addReply={addReply}/> 
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

'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const {check, validationResult} = require('express-validator'); // validation middleware

 /* --- Authentication related imports ---- */
 const passport = require('passport');
 const passportLocal = require('passport-local');
 const session = require('express-session'); // session middleware

/* --- DAOs  --- */
const adminDao = require('./dao/admin_dao');
const surveyDao = require('./dao/survey_dao');
const questionDao = require('./dao/question_dao');
const replyDao = require('./dao/reply_dao');

// init express
const port = 3001;
const app = express();

app.use(morgan('dev'));
app.use(express.json());

 /* --- Basic Passport configuration ---- */
passport.use(new passportLocal.Strategy((username, password, done) => {
    // verification callback for authentication
    adminDao.getAdmin(username, password).then(admin => {
      if (admin)
        done(null, admin);
      else
        done(null, false, { message: 'Wrong username or password' });
    }).catch(err => {
      done(err);
    });
}));

passport.serializeUser((admin, done) => {
  done(null, admin.id);
});
  
// starting from the data in the session, extract current (logged-in) user
passport.deserializeUser((id, done) => {
  adminDao.getAdminById(id)
    .then(admin => {
      done(null, admin); 
    }).catch(err => {
      done(err, null);
    });
});


const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'not authenticated' });
}

// initialize and configure HTTP sessions
app.use(session({
  secret: 'this is my secret',
  resave: false,
  saveUninitialized: false
}));

// tell passport to use session cookies
app.use(passport.initialize());
app.use(passport.session());


/* ------ Survey server-side ------ */

app.get('/surveys', (req, res) => {
  surveyDao.getSurveys(req.user?.id)
           .then(surveys => res.json(surveys))
           .catch(err => res.status(500).json(err));
})


app.post('/surveys', [
   check('title').isLength({'min': 1}) 
 ], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
  }

  const survey = req.body;
  survey['admin'] = req.user.id;
  surveyDao.createSurvey(survey)
           .then(() => res.status(250).end())
           .catch(error => res.status(550).json(error));
});


/* ------ Question server-side ----- */
app.get('/questions', (req, res) => {
  questionDao.getQuestions(req.query.surveyid)
           .then(questions => res.json(questions))
           .catch(err => res.status(500).json(err));
})

app.post('/questions', [
  check('content').isLength({'min': 1})
  // altri check 
], (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
     return res.status(422).json({ errors: errors.array() });
 }

 const question = req.body;
 questionDao.createQuestion(question)
          .then(() => res.status(250).end())
          .catch(error => res.status(550).json(error));
});



/* --- Reply server-side ---- */
app.get('/replies', isLoggedIn, (req, res) => {
  replyDao.getReplies(req.query.surveyid)
           .then(replies => res.json(replies))
           .catch(err => res.status(500).json(err));
});


app.post('/replies/:id', [
  check('name').isLength({'min': 1})
  // altri check 
], (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
     return res.status(422).json({ errors: errors.array() });
 }

 const reply = req.body;
 replyDao.createReply(reply)
          .then(() => res.status(250).end())
          .catch(error => res.status(550).json(error));
});





/* --- Login server-side ---- */

// login
app.post('/sessions', function(req, res, next) {
  passport.authenticate('local', (err, admin, info) => {
    if (err)
      return next(err);
      if (!admin) {
        // display wrong login messages
        return res.status(401).json(info);
      }
      // success, perform the login
      req.login(admin, (err) => {
        if (err)
          return next(err);
        
        // req.admin contains the authenticated admin, we send all the admin info back
        // this is coming from adminDao.getAdmin()
        return res.json(req.user);
      });
  })(req, res, next);
});


// GET /sessions/current
app.get('/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.status(200).json(req.user);}
  else
    res.status(401).json({error: 'Unauthenticated user!'});;
});


// DELETE /sessions/current 
// logout
app.delete('/sessions/current', (req, res) => {
  req.logout();
  res.end();
});



// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
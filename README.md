# Exam #1: "Survey"
## Student: s287646 Pronesti Massimiliano 

## React Client Application Routes

- Route `/`: page content and purpose
- Route `/something/:param`: page content and purpose, param specification
- ...

## API Server

- POST `/api/login`
  - request parameters and request body content
  - response body content
- GET `/api/something`
  - request parameters
  - response body content
- POST `/api/something`
  - request parameters and request body content
  - response body content
- ...

## Database Tables

- Table `admins` 
  * id 
  * email
  * name
  * hash

- Table `surveys` 
  * id
  * title
  * answers (number of people who filled the survey)
  * admin [foreign key]

- Table `questions` 
  * id
  * content 
  * options (NULL if open ended) 
  * min  (0 to 10)
  * max  (1 to 10)
  * survey [foreign key]

- Table `replies` 
  * id
  * name (the name of the answerer)
  * answers (the list of replies) 
  * survey [foreign key]

- Trigger `trig_reply_ins`: auto update of answers count for each survey
## Main React Components


- `SurveyForm` (in `SurveyForm.js`): allows the user to answer a survey. Detects mandatory unanswered questions marking their borders. Records the reply in the db. It's composed of `MCQuestion`s and `OpenEndedQuestion`s . 

- `AddSurveyForm` (in `AddSurveyForm.js`): allows the administrator to create a new survey, adding and deleting questions, choosing between open-ended and multiple choice questions and defining options for them (10 at most).
Only stores the survey and the questions in the db when the creation process is *successfully* completed.  

- `AnswersSlideShow` (in `AnswersSlideShow.js`) : allows the admin to display received answers to his survyes. It's made of `SurveyForm`s displayed in readonly-mode in a react `Carousel`.

- `SurveyList` (in `SurveyList.js`): represents the list of `SurveyRow`s displayed in the main page of both administrator and unauthenticated user.

- `SurveyRow` (in `SurveyRow.js`) : represents the survey entry in the main page of both administrator and unauthenticated user. Redirects to the reply form or the answers slideshow when the displayed button is pressed. 

- `LoginForm` (in `LoginForm.js`): allows the admin to login to his account. 


## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

| Username                | Passoword | Surveys |
|-------------------------|-----------|---------|
| john.doe@polito.it      | password  |         |
| tony.stark@starkcorp.us | password  |         |

import React from 'react';
import {useContext, useState, useRef, useEffect} from 'react';
import { Form, Button, Container, ListGroup} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import { AdminContext } from '../context/AdminContext';
import MCQuestion from './MCQuestion';
import OpenEndedQuestion from './OpenEndedQuestion';

import API from '../api/api';

// props dovrebbe contenere una modalità (write, read)
function SurveyForm(props){
    const { surveyid, questions, setQuestions, title } = props;
    const [name, setName]  = useState(''); // name of user
    const [answers, setAnswers] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false)

    const scrollRef = useRef(null)

    const scrollTop = () => scrollRef.current.scrollIntoView() ;

    const checkAnswersOnRequested = () => {
        console.log(answers);
        return questions.filter( q => {
            if(q.min > 0 && !(q.id in answers)) return true;
            
            if (q.min > 0 && q.id in answers){
                return answers[q.id].length < q.min && answers[q.id].length > q.max ;
            } 
            return false;
        }).length === 0;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        let valid = true;

        // validation
        if( name.trim() === ''){
            setErrorMessage('You must add your name to submit the survey');
            valid = false;    
        }

        if(!checkAnswersOnRequested()){
            setErrorMessage('mandatory questions must be answered to submit the survey');
            valid = false;
        }

        if(valid) {
            const reply = {
               name : name , 
               survey: surveyid, 
               answers: answers
            }
            props.addReply(reply);
            setSubmitted(true);
        } else {
            scrollTop();   
        }
    }

    useEffect(() => {
        API.getQuestions(surveyid)
            .then( qs => {
            setQuestions(qs);
        })
    }, [surveyid]);

    const onAnswer = (questionid, ans) => {
        var Answers = answers;
        Answers[questionid] = ans;

        setAnswers(Answers);
    }

    const context = useContext(AdminContext);

    return (
        !context.loggedIn && 
      <Container fluid>
       {submitted && <Redirect to='/surveys'></Redirect>}

        <Form ref={scrollRef} className="below-nav mx-auto questions ">
            
            <ListGroup.Item className="survey-header round-border">
                <Form.Control size="lg"  className="survey-title" placeholder="Untitled Survey" disabled value={props.title}/> 
                <Form.Group  controlid='survey'>
                <Form.Control  type='text' placeholder="Your name" value={name}  onChange={ev => setName(ev.target.value)} isInvalid={errorMessage !== ''}/>
            </Form.Group> 
            </ListGroup.Item>
            
            

            {
                questions.map( question => 
                <Form.Group className="question round-border" >
                    {
                        question.options ? 
                        <MCQuestion question={question} onAnswer={onAnswer}/>
                        :
                        <OpenEndedQuestion question={question} onAnswer={onAnswer}/>
                    }
                </Form.Group>  
                )

            }
            
            <Button variant="primary" className="btn-form" onClick={ev => handleSubmit(ev)}>
                Submit
            </Button>
               
        </Form>
    </Container>
   );
}


export default SurveyForm;
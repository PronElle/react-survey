import React from 'react';
import {useContext, useState, useRef, useEffect} from 'react';
import { Form, Button, Container, ListGroup} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import { AdminContext } from '../AdminContext';
import MCQuestion from './MCQuestion';
import OpenEndedQuestion from './OpenEndedQuestion';

import API from '../api/api';

// props dovrebbe contenere una modalità (write, read)
function SurveyForm(props){
    const { surveyid, questions, setQuestions} = props;

    const [name, setName]  = useState(''); // name of user
    const [answers, setAnswers] = useState(Array(questions.length).fill([])); // se me le passano da fuori, quelle,  sennò []

    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false)

    const scrollRef = useRef(null)

    const scrollTop = () => scrollRef.current.scrollIntoView() ;

    const checkAnswersOnRequested = () => {
        console.log(answers)
        return false;
    //    return  answers.filter( ans => ans.length < q.min || ans.length > q.max).length !== 0;
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
            // const record = {
            //    name : name , 
            //    survey: surveyid, 
            //    answers: answers
            //}
            // props.addRecord(record);
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

    // useEffect(() => {
    //     API.getRecord(surveyid)
    //         .then( record => {
    //         setRecord(record);
    //     })
    // }, [surveyid]);

    const onAnswer = (qno, ans) => {
        var Answers = [...answers];
        Answers[qno] = ans;

        setAnswers(Answers);
    }

    const context = useContext(AdminContext);

    return (
      <Container fluid>
       {submitted && <Redirect to='/surveys'></Redirect>}

        <Form ref={scrollRef} className="below-nav mx-auto questions ">
            
            <ListGroup.Item className="survey-header round-border">
                <Form.Control size="lg"  className="survey-title" placeholder="Untitled Survey" disabled value={props.title}/>  
            </ListGroup.Item>
            
            <Form.Group  controlid='survey'>
                <Form.Control  type='text' placeholder="Your name" value={name}  onChange={ev => setName(ev.target.value)} isInvalid={errorMessage !== ''}/>
            </Form.Group>

            {
                questions.map( question => 
                <Form.Group className="question round-border" >
                    {
                        question.options ? 
                        <MCQuestion question={question}/>
                        :
                        <OpenEndedQuestion question={question}/>
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
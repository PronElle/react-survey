import React from 'react';
import {useContext, useState, useRef, useEffect} from 'react';
import { Form, Button, Container, ListGroup} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import { AdminContext } from '../context/AdminContext';
import MCQuestion from './MCQuestion';
import OpenEndedQuestion from './OpenEndedQuestion';
 import SurveyHeader from './SurveyHeader';

import API from '../api/api';

function SurveyForm(props){
    const { surveyid, questions, setQuestions } = props;
    const [name, setName]  = useState(props.name ? props.name : ''); // name of user
    const [answers, setAnswers] = useState(props.answers ? props.answers : {});
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading ] = useState(true);
    const [unans, setUnans] = useState([]);

    const scrollRef = useRef(null)

    const scrollTop = () => scrollRef.current.scrollIntoView() ;

    const checkAnswersOnRequested = () => {
        var unanswered = questions.filter( q => {
            if(q.min > 0 && !answers[q.id]) return true;

            if (q.min > 0 && q.id in answers)
                return answers[q.id].length < q.min || (q.options && answers[q.id].length > q.max) ;
            
            return false;
        });
        setUnans(unanswered);
        return unanswered.length === 0;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if(context.loggedIn){ // if I'm in SHOW mode
            setSubmitted(true);
            return;
        }
        
        // validation
        let valid = true;
        if( name.trim() === ''){
            setErrorMessage('You must add your name to submit the survey');
            valid = false;    
        }

        if(!checkAnswersOnRequested()){
            setErrorMessage('mandatory questions must be answered to submit the survey');
            valid = false;
        }

        if(valid) {
            const reply = { name : name, survey: surveyid, answers: answers }
            props.addReply(reply);
            setSubmitted(true);
        } else 
            scrollTop();   
    }
    
    useEffect(() => {
        API.getQuestions(surveyid)
            .then( qs => {
            setQuestions(qs);
            setLoading(false);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [surveyid]);

    const onAnswer = (questionid, ans) => {
        var Answers = answers;
        if(ans.length !== 0)
            Answers[questionid] = ans;
        else // only storing given answers
            delete Answers[questionid];
        setAnswers(Answers);
    }

    const ansAt = (qid) => {
        return answers[qid] || [];
    }

    const context = useContext(AdminContext);

    return ( 
      <Container fluid>
       {submitted && <Redirect to='/surveys'></Redirect>}

        <Form ref={scrollRef} className="below-nav mx-auto questions ">
            {/* <SurveyHeader title={props.title} name={name} setName={setName} disabled={props.disabled} fillMode/> */}
            
            <ListGroup.Item className="survey-header round-border">
                <Form.Control size="lg"  className="survey-title" placeholder="Untitled Survey" disabled value={props.title}/> 
                
                <Form.Group  controlid='survey'>
                    <Form.Control  type='text' placeholder="Your name" value={name}  onChange={ev => setName(ev.target.value)} isInvalid={name === '' && errorMessage !== ''} disabled={props.disabled}/>
                </Form.Group> 
                {errorMessage &&  <span className="small error-msg">{errorMessage}</span>}
            </ListGroup.Item>
            
            {
                !loading && questions.map( question => 
                <Form.Group className={unans.includes(question) ? "question round-border invalid" : "question round-border"}>
                    {
                        question.options ? 
                        <MCQuestion answers={() => ansAt(question.id)} question={question} onAnswer={onAnswer} disabled={props.disabled}/>
                        :
                        <OpenEndedQuestion answers={() => ansAt(question.id)} question={question} onAnswer={onAnswer} disabled={props.disabled}/>
                    }
                </Form.Group>  
                )

            }
             
            <Button variant="primary" size="lg" className="btn-form" onClick={ev => handleSubmit(ev)}>
              { context.loggedIn ? "Close" : "Submit"}
            </Button>
            
        </Form>
    </Container>
   );
}


export default SurveyForm;
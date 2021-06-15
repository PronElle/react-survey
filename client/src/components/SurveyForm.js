import React from 'react';
import {useContext, useState, useRef} from 'react';
import { AdminContext } from '../AdminContext';
import { Form, Button, Container} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

// props dovrebbe contenere una modalità (write, read)
function SurveyForm(props){
    const [name, setName]  = useState('');
    const [answers, setAnswers] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false)

    const scrollRef = useRef(null)

    const scrollTop = () => scrollRef.current.scrollIntoView() ;

    const handleSubmit = (event) => {
        event.preventDefault();
        
        let valid = true;

        // validation
        if( name.trim() === ''){
            setErrorMessage('You must add your name to submit the survey');
            valid = false;    
        }

        // if min number of answers not respected for some ans
        // then valid = false;

        if(valid) {
            // API.recordAnswer(...)
            setSubmitted(true);
        } else {
            scrollTop();   
        }
    }

    const onAnswer = (qno, ans) => {
        console.log(ans, qno);
        var Answers = [...answers];
        Answers[qno] = ans;

        setAnswers(Answers);
        console.log(answers);
    }

    const ansAt = (qno) => {
        var Answers = [...answers];
        return Answers[qno];
    }
 
    const context = useContext(AdminContext);


    return (
      <Container fluid>
       {submitted && <Redirect to='/surveys'></Redirect>}

        <Form ref={scrollRef} className="below-nav survey-form">
            <Form.Group  controlid='survey'>
                <Form.Control  type='text' placeholder="Your name" value={name} onChange={ev => setName(ev.target.value)} isInvalid={errorMessage !== ''}/>
            </Form.Group>

            {
                props.questions.map( (question, qno) => 
                <>
                <Form.Group className="question" >
                    <Form.Label>{question.text}{question.required && ' *'}</Form.Label>

                    {
                        question.open ? 
                        <Form.Control as="textarea" maxLength="200"  rows={3} />
                        :
                        question.options.map((option, ansno) => <Form.Check custom type="checkbox" value={ansAt(ansno)} id={`custom-checkbox-${option.id}`} label={option.optionText} onChange={ev => onAnswer(qno, ansno)} />)
                    }
                </Form.Group>
                </>   
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
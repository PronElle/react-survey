import React from 'react';
import {useContext, useState} from 'react';
import { AdminContext } from '../AdminContext';
import { Form, Button, Container} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// props dovrebbe contenere una modalità (write, read)
function SurveyForm(props){
    const [name, setName]  = useState('');
    const [answers, setAnswers] = useState([]);

    const [errorMessage, setErrorMessage] = useState();
    const [submitted, setSubmitted] = useState(false)


    const handleSubmit = (event) => {
        event.preventDefault();
        
        // validation
        // if name empty or mandatory question not answered
        if( name.trim() === ''){

        }

        setSubmitted(true);
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

        <Form className="below-nav survey-form">
            <Form.Group controlid='survey'>
                <Form.Control type='text' placeholder="Your name" value={name} onChange={ev => setName(ev.target.value)}/>
            </Form.Group>

            {
                props.questions.map( (question, qno) => 
                <>
                <Form.Group className="question">
                    <Form.Label>{question.text}{question.required && ' *'}</Form.Label>

                    {
                        question.open ? 
                        <Form.Control as="textarea" maxLength="200"  rows={3}/>
                        :
                        question.options.map((option, ansno) => <Form.Check custom type="checkbox" value={ansAt(ansno)} id={`custom-checkbox-${option.id}`} label={option.optionText} onChange={ev => onAnswer(qno, ansno)}/>)
                    }
                </Form.Group>
                </>   
                )

            }
            
            <Button variant="primary" className="btn-form" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    </Container>
   );
}


export default SurveyForm;
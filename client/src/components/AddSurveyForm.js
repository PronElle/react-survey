import React from 'react'
import { useState, useEffect, useContext} from 'react';
import { Form, Card, Row, Accordion, Button } from 'react-bootstrap';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { iconDelete } from '../icons';
import QuestionForm from './QuestionForm';

function AddSurveyForm() {
    const [surveyTitle, setSurveyTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [questionModalOpen, setQuestionModalOpen] = useState(true);

    const toggleQuestionModal = () => {
        setQuestionModalOpen(!questionModalOpen);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // validation 
        // ...
        // API.createSurvey(...)
       // API.createQuestions(...)
       // API.createAnswers(...)
       // setSubmitted(true);
    }


    // protect the root
    return (
        <Row  className="below-nav" >
          <Card className="mx-auto">
            <Card.Header >
                <Form >
                    <Form.Control size="lg"  className="survey-header" placeholder="Untitled Survey" value={surveyTitle}
                                  onChange={ ev => setSurveyTitle(ev.target.value)}/>
               {/* <Row>
               {iconDelete}
               &nbsp;
                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label="required"
                    value={required}
                    onChange={() => setRequired(!required)}
                />
               </Row> */}
               
                
                </Form>
                </Card.Header>

               <QuestionForm modalOpen={questionModalOpen} toggleModal={toggleQuestionModal}/>
              
        
                </Card>
        </Row>
        

    );
}

export default AddSurveyForm;
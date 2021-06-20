import React from 'react'
import { useState, useContext} from 'react';
import { AdminContext } from '../AdminContext';
import { Form, Row, Button, ListGroup, Container, Alert } from 'react-bootstrap';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Redirect } from 'react-router-dom';

import QuestionForm from './QuestionForm';
import OpenEndedQuestion from './OpenEndedQuestion';
import MCQuestion from './MCQuestion';


function AddSurveyForm(props) {
    const [surveyTitle, setSurveyTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [questionModalOpen, setQuestionModalOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const context = useContext(AdminContext);

    const toggleQuestionModal = () => {
        setQuestionModalOpen(!questionModalOpen);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // validation
        if(surveyTitle.trim() === ''){
            setErrorMsg('Survey\'s title can\'t be empty');
        } else if (questions.length === 0)
           setErrorMsg('Survey must contain at least one question');
        else{
           setSubmitted(true);
           props.addSurvey(surveyTitle, questions);
        }
    }

    const addQuestion = (question) => {
        setQuestions([...questions, question]);
    }

    const deleteQuestion = (question) => {
        setQuestions(questions.filter(q => q.id !== question.id));
    }

    const handleDragDrop = (result) => {
        if(!result.destination) return;

        const items = Array.from(questions);
        const [reordereItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reordereItem);

        setQuestions(items);
    }

    return (
        <Container fluid>
            {!context.loading && !context.loggedIn && <Redirect to='/surveys'/>}
            {submitted && <Redirect to='/surveys'/>}
            <Row className="below-nav my-2 my-lg-0 mx-auto d-none d-sm-block" >
                <DragDropContext onDragEnd={handleDragDrop}>
                    <Droppable droppableId="questions">
                    { provided =>  
                    <ListGroup className="mx-auto questions" {...provided.droppableProps} ref={provided.innerRef}>
                        <ListGroup.Item className="survey-header round-border">
                            <Form.Control size="lg"  className="survey-title" placeholder="Untitled Survey" value={surveyTitle}
                                onChange={ ev => setSurveyTitle(ev.target.value)} isInvalid={errorMsg !== ''}/>  
                             <Form.Control.Feedback type="invalid" >{errorMsg}</Form.Control.Feedback>
                        </ListGroup.Item>


                        { questions.map( (q, i) => 
                                <Draggable key={q.id} draggableId={q.id} index={i}>
                                    { provided =>
                                    <ListGroup.Item className="question round-border" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        {
                                            q.options ? <MCQuestion question={q} deleteQuestion={deleteQuestion} disabled={true}/> : <OpenEndedQuestion question={q} deleteQuestion={deleteQuestion} disabled={true}/>
                                        }
                                    </ListGroup.Item>                                
                                    }
                                </Draggable>)
                        }
                    </ListGroup>
                    }
                    </Droppable>
                </DragDropContext>

            </Row> 

            {questionModalOpen && <QuestionForm addQuestion={addQuestion} modalOpen={questionModalOpen} toggleModal={toggleQuestionModal}/>}
            <Button variant="primary" size="lg" className="fixed-right-bottom-circular" onClick={() => toggleQuestionModal()}>&#43;</Button>
            <Button variant="primary" size="lg" onClick={ev => handleSubmit(ev)}>submit</Button> 
        </Container>
        );
}

export default AddSurveyForm;
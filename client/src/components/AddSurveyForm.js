import React from 'react'
import { useState, useContext} from 'react';
import { AdminContext } from '../AdminContext';
import { Form, Card, Row, Button, ListGroup, Container, Col } from 'react-bootstrap';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Redirect } from 'react-router-dom';

import QuestionForm from './QuestionForm';
import OpenEndedQuestion from './OpenEndedQuestion';
import MCQuestion from './MCQuestion';

function AddSurveyForm() {
    const [surveyTitle, setSurveyTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [questionModalOpen, setQuestionModalOpen] = useState(false);

    const context = useContext(AdminContext);

    const toggleQuestionModal = () => {
        setQuestionModalOpen(!questionModalOpen);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // validation
        if(surveyTitle.trim() === '' || questions.length === 0){
            // error msg
        } 
        
        // API.createSurvey(...)
       // API.createQuestions(...)
       // API.createAnswers(...)
        setSubmitted(true);
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

    // protect the root
    return (
        <Container fluid>
            {!context.loading && !context.loggedIn && <Redirect to='/surveys'/>}
            <Row className="below-nav" >
                <DragDropContext onDragEnd={handleDragDrop}>
                    <Droppable droppableId="questions">
                { provided =>  
                    <ListGroup className="mx-auto questions" {...provided.droppableProps} ref={provided.innerRef}>
                        <Card>
                            <Card.Header>
                                <Form.Control size="lg"  className="survey-header" placeholder="Untitled Survey" value={surveyTitle}
                                    onChange={ ev => setSurveyTitle(ev.target.value)}/>  
                            </Card.Header>
                        </Card>
                        { questions.map( (q, i) => 
                                <Draggable key={q.id} draggableId={q.id} index={i}>
                                    { provided =>
                                    <ListGroup.Item className="question" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
        </Container>
        );
}

export default AddSurveyForm;
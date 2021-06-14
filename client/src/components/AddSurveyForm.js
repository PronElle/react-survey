import React from 'react'
import { useState, useContext} from 'react';
import { AdminContext } from '../AdminContext';
import { Form, Card, Row, Accordion, Button, ListGroup } from 'react-bootstrap';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { iconDelete } from '../icons';
import QuestionForm from './QuestionForm';
import { Redirect } from 'react-router-dom';

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
       // setSubmitted(true);
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
        <>
        {!context.loading && !context.loggedIn && <Redirect to='/surveys'/>}
        <Row  className="below-nav" >
          <Card className="mx-auto">
            <Card.Header >
                <Form.Control size="lg"  className="survey-header" placeholder="Untitled Survey" value={surveyTitle}
                                  onChange={ ev => setSurveyTitle(ev.target.value)}/>  
            </Card.Header>
            
            <DragDropContext onDragEnd={handleDragDrop}>
                <Droppable droppableId="questions">
               { provided =>  
                <ListGroup className="questions" {...provided.droppableProps} ref={provided.innerRef}>
                    {
                        questions.map( (q, i) => 
                        <Draggable key={q.id} draggableId={q.id} index={i}>
                            { provided => 
                            <ListGroup.Item ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <div className="d-flex w-100 justify-content-between ">
                                        <div className="custom-control">
                                            <label>{q.content}</label>
                                            {
                                              q.options ?  q.options.map( opt => 
                                                    <Form.Check custom type="checkbox" label={opt}></Form.Check>)
                                              :
                                                <Form.Control as="textarea" maxLength="200"  rows={3} cols={40}/>
                                            }
                                        </div>
                                    </div>      
                            </ListGroup.Item>
                            }
                        </Draggable>
                        )
                    }
                </ListGroup>
                }
                </Droppable>
            </DragDropContext>
            </Card>
        </Row>

        {questionModalOpen && <QuestionForm addQuestion={addQuestion} modalOpen={questionModalOpen} toggleModal={toggleQuestionModal}/>}
        <Button variant="primary" size="lg" className="fixed-right-bottom-circular" onClick={() => toggleQuestionModal()}>&#43;</Button>
        </>
        
        

    );
}

export default AddSurveyForm;
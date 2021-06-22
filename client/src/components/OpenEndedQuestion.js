import React, {useContext, useState} from 'react';
import { Form } from 'react-bootstrap';
import { iconDelete, iconRequired } from '../icons';
import { AdminContext } from '../context/AdminContext';


function OpenEndedQuestion(props) {
    let { question, deleteQuestion, disabled } = props;
    let [answer, setAnswer] = useState(props.answers ? props.answers : '');
    const context = useContext(AdminContext);

    return (
        <div className="custom-control">
            <div className="d-flex justify-content-between">
                <label>{question.content}
                   <span onClick={() => deleteQuestion(question)}> {context.loggedIn && iconDelete}</span>
                </label>
                <span>{question.min >= 1 && iconRequired}</span>
            </div>
            <hr/>
            <div>
                <Form.Control as="textarea" maxLength="200"  rows={3} cols={20}  placeholder="your answer (max 200 words)" 
                disabled={disabled} 
                value = {answer}
                onChange={ ev=> {
                    setAnswer(ev.target.value);
                    props.onAnswer(question.id, ev.target.value)
                }}
                />      
            </div>
        </div>      
    );
}

export default OpenEndedQuestion;

{/* <div className="custom-control">
<Form.Label className="d-flex justify-content-between">
    <span onClick={() => deleteQuestion(question)}> {question.content}{context.loggedIn && iconDelete}</span>               
    <span>{question.min >= 1 && iconRequired}</span>
</Form.Label>
<hr/>
<Form.Control as="textarea" 
                maxLength="200"  
                rows={3} cols={20}  
                placeholder="your answer (max 200 words)" 
                disabled={disabled} 
                value = {answer}
                onChange={ ev=> { setAnswer(ev.target.value); props.onAnswer(question.id, ev.target.value)}}
    />      
</div>      */}
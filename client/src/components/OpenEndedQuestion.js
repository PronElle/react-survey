import React from 'react';
import { Form } from 'react-bootstrap';
import { iconDelete, iconRequired } from '../icons';

function OpenEndedQuestion(props) {
    let { question, deleteQuestion, disabled } = props;
    return (
        <div className="custom-control">
            <div className="d-flex justify-content-between">
                <label>{question.content}
                   <span onClick={() => deleteQuestion(question)}> {iconDelete}</span>
                </label>
                <span>{question.min >= 1 && iconRequired}</span>
            </div>
            <hr/>
            <div>
                <Form.Control as="textarea" maxLength="200"  rows={3} cols={20}  placeholder="your answer (max 200 words)" value={''} disabled={disabled}/>      
            </div>
        </div>      
    );
}

export default OpenEndedQuestion;

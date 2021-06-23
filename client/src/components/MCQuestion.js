import React, {useState, useContext} from 'react'
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { iconDelete, iconInfo } from '../icons';

import { AdminContext } from '../context/AdminContext';

function MCQuestion(props) {
    let { question, deleteQuestion, disabled, addMode } = props;
    let [answer, setAnswer] = useState(props.answers ? props.answers : []);
    const context = useContext(AdminContext);

    const handleCheckChange = (check, id) => {
        let n_checked = answer.length;
        let answerUpd = [...answer];
        
        if(!check){   // if checked, uncheck 
            answerUpd.splice(answerUpd.indexOf(id), 1);
            setAnswer(answerUpd);
            props.onAnswer(question.id, answerUpd);
        } 
        else if (n_checked < question.max){ // if unchecked, check if max respected 
            answerUpd.push(id);
            setAnswer(answerUpd);
            props.onAnswer(question.id, answerUpd);
        } 
        else if ( question.max === 1 ) {// "for better" interaction
            answerUpd = [id];
            setAnswer(answerUpd);
            props.onAnswer(question.id, answerUpd);
        }
    }

    const  MinMaxTooltip = (question) =>  (
            <Tooltip  id="min-max-tooltip" {...props}>
                min: {question.min} max: {question.max}
            </Tooltip>
    );
    

    return (
        <div className="custom-control">
            <Form.Label className="d-flex justify-content-between">
                <span onClick={() => deleteQuestion(question)}> {question.content} {context.loggedIn && addMode && iconDelete}</span>
                <OverlayTrigger placement="right" overlay={MinMaxTooltip(question)}>{iconInfo}</OverlayTrigger>
            </Form.Label>
            <hr/>
            
            {  Array.isArray(question.options) && 
            question.options.map( ({id, text}) => 
                    <Form.Check custom type="checkbox" 
                                id={id}
                                label={text} 
                                disabled={disabled}
                                checked={answer.includes(id)}
                                onChange={ev => handleCheckChange(ev.target.checked, id)} />)
            }       
        </div>    
    );
}

export default MCQuestion;
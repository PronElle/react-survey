import React, {useState, useContext} from 'react'
import { Form } from 'react-bootstrap';
import { iconDelete, iconRequired } from '../icons';

import { AdminContext } from '../context/AdminContext';

function MCQuestion(props) {
    let { question, deleteQuestion, disabled } = props;
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


    return (
        <Form  className="custom-control">
            <div className="d-flex justify-content-between">
                <label>
                   <span onClick={() => deleteQuestion(question)}> {question.content} {context.loggedIn && iconDelete}</span>
                </label>
                <span>{question.min >= 1 && iconRequired}</span>
            </div>
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
        </Form>    
    );
}

export default MCQuestion;
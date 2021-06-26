import React, {useState, useContext} from 'react'
import { Form,  Badge } from 'react-bootstrap';
import { iconDelete } from '../icons';

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

    const QuestionTitle = () => (
        <>
         <Form.Row>
            {question.content}
            <span onClick={() => deleteQuestion(question)}> {context.loggedIn && addMode && iconDelete}</span>
         </Form.Row>
         
          <div> 
            <Badge pill variant="primary">min: {question.min}</Badge>
            <Badge pill style={{'background-color': 'orange'}}>max: {question.max}</Badge>
          </div>
        </>
    );

    return (
        <div className="custom-control my-2">
            <Form.Label className="d-flex justify-content-between">     
               <QuestionTitle/>
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
import React, {useState, useContext} from 'react'
import { Form } from 'react-bootstrap';
import { iconDelete, iconRequired } from '../icons';

import { AdminContext } from '../AdminContext';

function MCQuestion(props) {
    let { question, deleteQuestion, disabled } = props;
    const [answer, setAnswer] = useState(Array(question.options.length).fill(false));
    const context = useContext(AdminContext);

    const handleCheckChange = (check, index) => {
        let n_checked = answer.filter(c => c).length;
        let answerUpd = [...answer];
        
        if(!check){   // if checked, uncheck 
            answerUpd[index] = false;
            setAnswer(answerUpd);
        } else if (n_checked < question.max){ // if unchecked, check if max respected 
            answerUpd[index] = true;
            setAnswer(answerUpd);
        } else if ( question.max === 1 ) {// "for better" interaction
            answerUpd = Array(answerUpd.length).fill(false);
            answerUpd[index] = true;
            setAnswer(answerUpd);
        }
    }

    return (
        <div className="custom-control">
            <div className="d-flex justify-content-between">
                <label>
                   <span onClick={() => deleteQuestion(question)}> {question.content} {context.loggedIn && iconDelete}</span>
                </label>
                <span>{question.min >= 1 && iconRequired}</span>
            </div>
            <hr/>
            <Form>
                {
                question.options.map( ({text, id}, i) => 
                        <Form.Check custom type="checkbox" 
                                    id={id}
                                    label={text} 
                                    disabled={disabled}
                                    checked={answer[i]}
                                    onChange={ev => handleCheckChange(ev.target.checked, i)} />)
                }       
            </Form>         
        </div>
    );
}

export default MCQuestion;
import React, {useState} from 'react'
import { Form } from 'react-bootstrap';
import { iconDelete, iconRequired } from '../icons';

function MCQuestion(props) {
    let { question, deleteQuestion, disabled } = props;
    const [checked, setChecked] = useState(Array(question.options.length).fill(false));
    
    const handleCheckChange = (index) => {
        let n_checked = checked.filter(c => c).length;
        let checkedUpd = [...checked];

        // if not checked and I can still pick one
        if ( !checked[index] && n_checked  < question.max){
            checkedUpd[index] = true;
            setChecked(checkedUpd);
        }
        // if checked, uncheck 
        if(checked[index]){
            checkedUpd[index] = false;
            setChecked(checkedUpd);
        }
    }

    return (
        <div className="custom-control">
            <div className="d-flex justify-content-between">
                <label>
                   <span onClick={() => deleteQuestion(question)}> {question.content} {iconDelete}</span>
                </label>
                <span>{question.min >= 1 && iconRequired}</span>
                 
            </div>
            
            
            <hr/>
            <Form>
                {
                question.options.map( ({id, text}, i) => 
                        <Form.Check custom type="checkbox" 
                                    id={id}
                                    label={text} 
                                    disabled={disabled}
                                    checked={checked[i]}
                                    onChange={() => handleCheckChange(i)} />)
                }       
                
            </Form>         
        </div>
    );
}

export default MCQuestion;
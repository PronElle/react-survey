import React from 'react'
import { ListGroup, Form } from 'react-bootstrap';

export default function SurveyHeader(props) {
    let { title, setTitle, name, setName, disabled, errorMsg, addMode } = props;
    return (
        <ListGroup.Item className="survey-header round-border">
            <Form.Control size="lg"  className="survey-title" placeholder="Untitled Survey" disabled={disabled} value={title}
                onChange={ ev => setTitle(ev.target.value)} isInvalid={addMode && errorMsg !== ''}/> 
                { !addMode &&  
                <Form.Group  controlid='survey'>
                    <Form.Control  type='text' placeholder="Your name" value={name}  onChange={ev => setName(ev.target.value)} isInvalid={name === '' && errorMsg!== ''} disabled={disabled}/>
                </Form.Group>
                }
            {errorMsg &&  <span className="small error-msg">{errorMsg}</span>}
        </ListGroup.Item>
    )
}

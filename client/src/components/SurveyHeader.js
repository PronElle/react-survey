import React from 'react'
import { ListGroup, Form } from 'react-bootstrap';

export default function SurveyHeader(props) {
    let { title, name, setName, disabled, fillMode, errorMsg } = props;
    return (
        <ListGroup.Item className="survey-header round-border">
            <Form.Control size="lg"  className="survey-title" placeholder="Untitled Survey" disabled={disabled} value={title}/> 
                { fillMode &&  
                <Form.Group  controlid='survey'>
                    <Form.Control  type='text' placeholder="Your name" value={name}  onChange={ev => setName(ev.target.value)} disabled={disabled}/>
                    <Form.Control.Feedback type="invalid" >{errorMsg}</Form.Control.Feedback>
                </Form.Group>
                } 
        </ListGroup.Item>
    )
}

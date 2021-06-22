import React from 'react'
import { ListGroup, Form } from 'react-bootstrap';

export default function SurveyHeader(props) {
    let { title, name, setName, disabled } = props;
    return (
        <ListGroup.Item className="survey-header round-border">
            <Form.Control size="lg"  className="survey-title" placeholder="Untitled Survey" disabled={disabled} value={title}/> 
                <Form.Group  controlid='survey'>
                    <Form.Control  type='text' placeholder="Your name" value={name}  onChange={ev => setName(ev.target.value)} disabled={disabled}/>
                </Form.Group> 
        </ListGroup.Item>
    )
}

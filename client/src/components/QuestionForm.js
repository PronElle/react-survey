import React from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { iconPlus } from '../icons';
import  uuid  from 'react-uuid';

function QuestionForm(props) {
    let { addQuestion, modalOpen, toggleModal } = props;
    
    const [content, setContent] = useState(''); // content of question
    const [openEnded, setOpenEnded ] = useState(false);
    const [options, setOptions] = useState([]); // if stays empty => open-ended
    const [errorMessage, setErrorMessage] = useState('');
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(1);

    const handleSubmit = (event) => {
        event.preventDefault();
        let valid = true;

        // validation
        if(content.trim() === ''){
            valid = false;
            setErrorMessage('Please, fill the question content');
        }       
        else if (!openEnded){
            let ans_size = options.length;
            if (ans_size === 0){
               setErrorMessage('Multiple-choice question must have at least 1 option');
               valid = false;     
            }
            
            if(min > max ||  min >  ans_size || max > ans_size ){
                setErrorMessage('min and/or max don\'t respect the constraints');
                valid = false;
            }
        }
        if(valid) { 
            toggleModal();
            const question = {
                id: uuid(),
                content: content,
                min: min,
                max: max,
                options: !openEnded ? options.map( o => ({"id": uuid(), "text": o}))
                                      : undefined,
            }
            addQuestion(question);
        }
    }

    const addOption = () => {
        if(options.length < 10){ // specifications
            var opts = [...options, "untitled option"];
            setOptions(opts);
        }
    }

    const toggleSwitch = () => {
        setOpenEnded(!openEnded);
        setMin(0); // reset min
        setErrorMessage('');
    }

    const modifyOption = (opt, i) => {
        let opts = [...options];
        opts[i] = opt;
        setOptions(opts);
    }

    return(
        <Modal show={modalOpen} onHide={toggleModal} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
            <Modal.Header closeButton className="bg-primary">
                <Modal.Title>Add question</Modal.Title>
            </Modal.Header>

            <Form>
            <Modal.Body>
                <Form.Group controlid='question'>
                    <Form.Label>Question text</Form.Label>
                    <Form.Control type='text' value={content} onChange={ev => setContent(ev.target.value)}></Form.Control>
                    <span className="small error-msg">{errorMessage}</span>
                </Form.Group>

                { !openEnded && 
                    options.map((opt, i) => 
                        <Form.Group>
                            <Form.Control type='text' placeholder="utitled option"
                             onChange={ev => modifyOption(ev.target.value, i)}/>    
                        </Form.Group>
                        )

                 }
                 <Row>
                     <Col>
                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            label="open-endend"
                            value={openEnded}
                            onChange={() => toggleSwitch()}
                        />
                    </Col>
                    
                    <Col>
                    { openEnded ? <Form.Check type="switch" id="custom-switch-req" 
                                              label="required" 
                                              onChange={() => setMin(1)}/> 
                                 :
                                 <span onClick={() => addOption()}>{iconPlus} Add Option</span>
                    }
                    </Col>
                   
                </Row>

                { !openEnded && 
                    <Row>
                        <Col>
                            <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">min</Form.Label>   
                            <Form.Control as="select" className="" id="inlineFormCustomSelectPref" custom onChange={ ev => setMin(+ev.target.value)} >
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </Form.Control>
                        </Col>

                        <Col>
                            <Form.Label className="my-1 mr-2"  htmlFor="inlineFormCustomSelectPref">max</Form.Label>  
                            <Form.Control as="select" className="" id="inlineFormCustomSelectPref" custom onChange={ ev => setMax(+ev.target.value)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </Form.Control>
                        </Col>
                    </Row>
                }
            </Modal.Body>

            <Modal.Footer>
                <Button variant='primary' onClick={ev => handleSubmit(ev)} >Save</Button>
                <Button variant='secondary' onClick={() => toggleModal()}>Cancel</Button>
            </Modal.Footer>
            </Form>
        </Modal>                            
    );
}

export default QuestionForm;
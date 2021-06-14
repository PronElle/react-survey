import React from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { iconPlus } from '../icons';

function QuestionForm(props) {
    let { questions, setQuestions, modalOpen, toggleModal } = props;
    
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
        
        if (!openEnded){
            let ans_size = options.length;
            if (min > max ||  min >  ans_size ){
            setErrorMessage('Min and Max don\'t respect the constraints');
            valid = false;
         }
        }
        
        if(valid) { 
            toggleModal();
            // crea question object (non per forza model)
            // addQuestion(question)
            console.log(options);
        }
    }

    const addOption = () => {
        if(options.length < 10){
            var opts = [...options, "untitled option"];
            setOptions(opts);
        }
    }

    const toggleSwitch = () => {
        setOpenEnded(!openEnded);
        // delete "old" options on purpose!
        if ( options.length > 0)
            setOptions([]);
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
                    <span style={{ color: 'red' }}>{errorMessage}</span>
                </Form.Group>

                {
                    !openEnded && 
                    options.map((opt, i) => 
                        <Form.Group>
                            <Form.Control type='text' placeholder="utitled option"
                             onChange={ev => modifyOption(ev.target.value, i)}/>    
                        </Form.Group>
                        )

                 }
                 <Row className="my-1 mr-sm-4" >
                <Col>
                    <span onClick={() => addOption()}>{iconPlus}</span>
                </Col>
                <Col>
                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label="open-endend"
                    value={openEnded}
                    onChange={() => toggleSwitch()}
                />
                </Col>
                {
                    !openEnded &&
                    <>
                    <Col>
                    <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">min</Form.Label>  
                    <Form.Control as="select" className="" id="inlineFormCustomSelectPref" custom onChange={ ev => setMin(ev.target.value)} >
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
                    <Form.Control as="select" className="" id="inlineFormCustomSelectPref" custom onChange={ ev => setMax(ev.target.value)}>
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
                    </>

                }

                </Row>
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
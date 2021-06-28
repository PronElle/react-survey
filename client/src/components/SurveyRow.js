import React, { useContext, useRef, useState } from 'react';
import { ListGroup, Overlay, Tooltip } from 'react-bootstrap';
import { iconReply, iconShow } from '../icons';
import { Link } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

function SurveyRow(props) {
  let { survey } = props;
  let context = useContext(AdminContext);
  const [showTooltip, setShowTooltip] = useState(false);
  const target = useRef(null);

  return (
    <ListGroup.Item as="li"  className="survey-row" variant="warning">
        <div className="d-flex w-100 justify-content-between ">
          <div className="custom-control">
            <label>{survey.title}</label>
          </div>

           <div>
               {context.loggedIn ?
                <> 
                  <small>Answers: {survey.answers} </small>
                  <Link to = {survey.answers ? '/survey/' + survey.id : '/surveys'}>
                    <span ref={target} onClick={() => setShowTooltip(!showTooltip)}> {iconShow}</span>
                    <Overlay target={target.current} show={showTooltip} placement="bottom">
                      {(props) => (
                        <Tooltip id="no-ans-tooltip" {...props}>
                            This survey didn't receive any answer yet!
                        </Tooltip>
                        )}
                    </Overlay>
                  </Link>  
                </> 
                :
                <>
                  <small>Reply </small>
                  <Link to = {'/survey/' + survey.id}><span>{iconReply}</span></Link>
                </>
              }
            </div>         
        </div>
    </ListGroup.Item>
  );
}

export default SurveyRow;
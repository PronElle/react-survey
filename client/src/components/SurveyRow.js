import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { iconReply, iconShow } from '../icons';
import { Link } from 'react-router-dom';
import { AdminContext } from '../AdminContext';

function SurveyRow(props) {
  let { survey } = props;
  let context = useContext(AdminContext);

  return (
    <ListGroup.Item  id={survey.id} className="survey-row" variant="warning">
        <div className="d-flex w-100 justify-content-between ">
          <div className="custom-control">
            <label>{survey.title}</label>
          </div>

           <div>
               {context?.loggedIn ?
                <> 
                    <small>Answers: {survey.answers} </small>
                    <Link to = {'/survey/' + survey.id}><span> {iconShow}</span></Link>  
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
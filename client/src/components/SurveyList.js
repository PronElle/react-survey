import React from 'react';
import SurveyRow from './SurveyRow';
import { ListGroup } from 'react-bootstrap';

const SurveyList = (props) => {
    return (
        <>
          {props.surveys &&
           <ListGroup as="ul"> 
            {props.surveys.map(survey => <SurveyRow  key={survey.id} survey={survey}/>)}
           </ListGroup>}
        </>
    );
}

export default SurveyList;
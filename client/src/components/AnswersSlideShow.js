import React, {useState, useEffect} from 'react';
import { Carousel } from 'react-bootstrap';
import { Redirect} from 'react-router-dom';
import SurveyForm from './SurveyForm';
import API from '../api/api';

export default function AnswersSlideShow(props) {
    const { surveyid } = props;
    const [replies, setReplies] = useState([]);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    
    useEffect(() => {
        API.getReplies(surveyid)
            .then( reps => {
            setReplies(reps); 
        })
    }, [index]);

  
    return (
      <Carousel interval={50000} activeIndex={index} onSelect={handleSelect}>
        {
            replies && replies.map( r =>  
            <Carousel.Item>
              <SurveyForm title={props.title} surveyid={props.surveyid} 
                           name={r.name} answers={r.answers} 
                           questions={props.questions}
                           setQuestions={props.setQuestions}
                           disabled={true}/>
                 <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            )
                
        }
      </Carousel>
    );
  }
  

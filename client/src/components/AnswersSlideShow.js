import React, {useState, useEffect} from 'react';
import { Carousel } from 'react-bootstrap';
import { Redirect} from 'react-router-dom';
import SurveyForm from './SurveyForm';
import API from '../api/api';
import { iconSad } from '../icons'; 

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
      replies.length ? 
      <Carousel interval={50000} activeIndex={index} onSelect={handleSelect}>
        {
            replies && replies.map( r =>  
            <Carousel.Item>
              <SurveyForm title={props.title} surveyid={props.surveyid} 
                           name={r.name} answers={r.answers} 
                           questions={props.questions}
                           setQuestions={props.setQuestions}
                           disabled={true}/>
            </Carousel.Item>
            )
                
        }
      </Carousel>
      :
      <div className="text-center below-nav">
        <div className="text-center below-nav-center">{iconSad}</div>
        
        <h1>
          Looks like nobody answered yet
        </h1>
      </div>
    );
  }
  

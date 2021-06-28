import React, {useState, useEffect} from 'react';
import { Carousel, ProgressBar } from 'react-bootstrap';
import SurveyForm from './SurveyForm';
import API from '../api/api';

export default function AnswersSlideShow(props) {
    const { title, surveyid, questions, setQuestions } = props;
    const [replies, setReplies] = useState([]);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    
    // mount and slide
    useEffect(() => {
        API.getReplies(surveyid)
            .then( reps => {
            setReplies(reps);
        })
    }, [index, surveyid]);

    const settings = {
      interval: null, // no autoscroll
      controls: replies.length > 1,
      activeIndex: index, 
      onSelect: handleSelect
    };
  
    return (
      <>
        {replies.length > 1 && <ProgressBar now={100/(replies.length - 1) * index} className="mx-auto progress-bar-top"/>}
        <Carousel  {...settings}>
          {
            replies && replies.map( r =>  
              <Carousel.Item>
                <SurveyForm title={title} surveyid={surveyid} 
                            name={r.name} answers={r.answers} 
                            questions={questions}
                            setQuestions={setQuestions}
                            disabled/>
              </Carousel.Item>
              )   
          }
        </Carousel>
      </>  
    );
  }
  

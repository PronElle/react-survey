import React, {useState, useEffect} from 'react';
import { Carousel } from 'react-bootstrap';
import SurveyForm from './SurveyForm';
import API from '../api/api';
import { iconSad } from '../icons'; 

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
      interval: null,
      controls: replies.length > 1,
      activeIndex: index, 
      onSelect: handleSelect
    };
  
    return (
        replies.length ? 
        <Carousel  {...settings}>
          {
            replies.map( r =>  
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
        :
        <div className="text-center below-nav">
          <div className="text-center below-nav-center">{iconSad}</div>
          
          <h1>
            Looks like nobody answered yet
          </h1>
        </div>
      
     
    );
  }
  

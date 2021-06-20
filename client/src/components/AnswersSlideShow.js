import React from 'react';
import { Carousel } from 'react-bootstrap';

export default function AnswersSlideShow(props) {
    const { replies } = props;

    // useEffect(() => {
    //     API.getReplies(surveyid)
    //         .then( record => {
    //         setRecord(record);
    //     })
    // }, [context.loggedIn, surveyid]);

    return (
        <Carousel className="below-nav">
            {
              replies && replies.map(r => <Carousel.Item>

              </Carousel.Item>)
            }      
        </Carousel>
    );
}

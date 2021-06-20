class QuestionModel {
  constructor(id, content, options, min, max, survey){
    this.id = id; 
    this.content = content; 
    
    this.min = min;
    this.max = max;

    if(options) // otherwise, open-ended
      this.options = options;

    this.survey = survey;
  }
}

module.exports = QuestionModel;
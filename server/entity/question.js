class Question {
    constructor(id, content, options, min, max, survey){
        this.id = id; 
        this.content = content; // question text
        this.survey = survey; // survey id
        this.min = min;
        this.max = max;
        if(options)
           this.options = options;
        
    }
}

module.exports = Question;
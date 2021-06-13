class Question {
    constructor(id, text, survey, open, options, required){
        this.id = id; 
        this.text = text; // question text
        this.survey = survey; // survey id
        this.open = open;
        if(!open)
            this.options = options;
             
        this.required = required;
    }
}

module.exports = Question;
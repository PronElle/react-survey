class SurveyModel {
    constructor(id, title, answers, creator){
        if(id) 
          this.id = id;

        this.title = title;
        this.answers = answers || 0; // number of people who answered
        this.creator = creator; // admin id
    }
}

module.exports = SurveyModel;
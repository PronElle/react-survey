class Survey{
    constructor(id, title, answers, creator){
        this.id = id;
        this.title = title;
        this.answers = answers; // number of people who answered
        this.creator = creator; // admin id
    }
}

module.exports = Survey;
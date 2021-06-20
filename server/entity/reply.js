class Reply {
    constructor(id, name, answers, survey){
        this.id = id;
        this.name = name; // name of person answering
        this.survey = survey; // survey id
        if (answers)
            this.answers = answers ;
    }
}

module.exports = Reply;
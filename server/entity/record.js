class Record {
    constructor(id, name, question, answer){
        this.id = id;
        this.name = name; // name of person answering
        this.question = question; // question id
        // if undef, people didn't respond
        this.answer = answer ? answer : undefined; 
    }

}

module.exports = Record;
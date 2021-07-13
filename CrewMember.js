const Person = require('./Person');


/**
 * Represents an individual who works on an aircraft.
 */
class CrewMember extends Person {


    constructor() {
        super('00000');
    }

}

module.exports = CrewMember;
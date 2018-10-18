(() => {
    'use strict';

    // Define a seed list of animals for temporary use 
    // before a database is implemented
    let animals = [
        { 
            id: 2,
            species: "dog",
            sound: "bark"
        },
        { 
            id: 1,
            species: "cat",
            sound: "meow"
        },
        {
            id: 5,
            species: "cow",
            sound: "moo"
        },
        { 
            id: 3,
            species: "bird",
            sound: "chirp"
        },
        {
            id: 4,
            species: "pig",
            sound: "oik"
        }
    ];
    module.exports = animals;

})();
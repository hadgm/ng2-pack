"use strict";
var uuid = require('node-uuid');
var fs = require('fs');
var heroNames = ['Mr. Nice', 'Narco', 'Bombasto', 'Celeritas', 'Magneta', 'RubberMan', 'Dynama', 'Dr IQ', 'Magma', 'Tornado'];
var createHero = function (name) { return ({
    _id: uuid.v4(),
    name: name,
    score: Math.round(Math.random() * 10)
}); };
var heroes = heroNames.map(createHero);
fs.writeFile('data.json', JSON.stringify({ heroes: heroes }));

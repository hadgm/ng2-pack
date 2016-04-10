import * as uuid from 'node-uuid';
import * as fs from 'fs';

const heroNames = ['Mr. Nice', 'Narco', 'Bombasto', 'Celeritas', 'Magneta', 'RubberMan', 'Dynama', 'Dr IQ', 'Magma', 'Tornado'];

const createHero = (name) => ({
  _id: uuid.v4(),
  name,
  score: Math.round(Math.random() * 10),
});

let heroes = heroNames.map(createHero);

fs.writeFile('data.json', JSON.stringify({heroes}));

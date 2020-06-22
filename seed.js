const seeder = require('mongoose-seed');
const db = 'mongodb://localhost/plant-journal';

seeder.connect(db, function () {
  seeder.loadModels(['./models/plant.js']);
  seeder.clearModels(['plant'], function () {
    seeder.populateModels(data, function (err, done) {
      if (err) throw err;
      if (done) console.log('Seed done.');
      seeder.disconnect();
    });
  });
});

const data = [
  {
    model: 'plant',
    documents: [
      {
        genus: 'Euphorbia',
        species: 'obesa',
        family: 'Euphorbiaceae',
        commonName: 'baseball plant',
        nativeTo: 'South Africa',
      },
      {
        genus: 'Rhipsalis',
        species: 'paradoxa',
        family: 'Cactaceae',
        commonName: 'chainlink cactus',
        nativeTo: 'Brazil',
      },
      {
        genus: 'Kumara',
        species: 'plicatilis',
        family: 'Asphodelaceae',
        commonName: 'fan aloe',
        nativeTo: 'South Africa',
      },
    ],
  },
];

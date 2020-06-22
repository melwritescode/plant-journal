const mongoose = require('mongoose');
const seeder = require('mongoose-seed');
const db = 'mongodb://localhost/plant-journal';

seeder.connect(db, function () {
  seeder.loadModels(['./models/plant.js', './models/journalEntry.js']);
  seeder.clearModels(['plant', 'journalentry'], function () {
    seeder.populateModels(data, function (err, done) {
      if (err) throw err;
      seeder.disconnect();
    });
  });
});

const plantIds = [
  mongoose.Types.ObjectId(),
  mongoose.Types.ObjectId(),
  mongoose.Types.ObjectId(),
];

const data = [
  {
    model: 'plant',
    documents: [
      {
        _id: plantIds[0],
        genus: 'Euphorbia',
        species: 'obesa',
        family: 'Euphorbiaceae',
        commonName: 'baseball plant',
        nativeTo: 'South Africa',
      },
      {
        _id: plantIds[1],
        genus: 'Rhipsalis',
        species: 'paradoxa',
        family: 'Cactaceae',
        commonName: 'chainlink cactus',
        nativeTo: 'Brazil',
      },
      {
        _id: plantIds[2],
        genus: 'Kumara',
        species: 'plicatilis',
        family: 'Asphodelaceae',
        commonName: 'fan aloe',
        nativeTo: 'South Africa',
      },
    ],
  },
  {
    model: 'journalentry',
    documents: [
      {
        title: 'Blooms on baseball plant',
        content:
          'Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic.',
        plant: plantIds[0],
      },
      {
        title: 'Repotting rootbound chainlink cactus',
        content:
          'Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress. Corn amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke.',
        plant: plantIds[1],
      },
      {
        title: 'Watered Aloe plicatilis',
        content:
          'Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.',
        plant: plantIds[2],
      },
    ],
  },
];

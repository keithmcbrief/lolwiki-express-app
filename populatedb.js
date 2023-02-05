#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var Champion = require('./models/champion');
var Role = require('./models/role');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var champions = [];
var roles = [];

function roleCreate(name, cb) {
  var role = new Role({ name: name });

  role.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Role: ' + role);
    roles.push(role);
    cb(null, role);
  });
}

function championCreate(name, title, summary, role, cb) {
  champdetail = {
    name: name,
    title: title,
    summary: summary,
  };
  if (role != false) champdetail.role = role;

  var champion = new Champion(champdetail);
  champion.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Champion: ' + Champion);
    champions.push(champion);
    cb(null, champion);
  });
}

function createChampions(cb) {
  async.parallel(
    [
      function (callback) {
        championCreate(
          'Akali',
          'The Rogue Assassin',
          'Abandoning the Kinkou Order and her title of the Fist of Shadow, Akali now strikes alone, ready to be the deadly weapon her people need. Though she holds onto all she learned from her master Shen, she has pledged to defend Ionia from its enemies, one kill at a time. Akali may strike in silence, but her message will be heard loud and clear: fear the assassin with no master.',
          [roles[2],],
          callback
        );
      },
      function (callback) {
        championCreate(
          "K'Sante",
          'The Pride of Nazumah',
          "Defiant and courageous, K'Sante battles colossal beasts and ruthless Ascended to protect his home of Nazumah, a coveted oasis amid the sands of Shurima. But after a falling-out with his former partner, K'Sante realizes that in order to become a warrior worthy of leading his city, he must temper his single-minded drive for success. Only then can he avoid falling prey to his own pride and find the wisdom he needs to defeat the vicious monsters threatening his people",
          [roles[0], roles[1]],
          callback
        );
      },
      function (callback) {
        championCreate(
          'Lucian',
          'The Purifier',
          'Lucian, a Sentinel of Light, is a grim hunter of undying spirits, pursuing them relentlessly and annihilating them with his twin relic pistols. After the wraith Thresh slew his wife, Lucian embarked on the path of vengeance—but even with her return to life, his rage is undiminished. Merciless and single-minded, Lucian will stop at nothing to protect the living from the long-dead horrors of the Black Mist.',
          [roles[3],],
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createRoles(cb) {
  async.series(
    [
      function (callback) {
        roleCreate('Tank', callback);
      },
      function (callback) {
        roleCreate('Fighter', callback);
      },
      function (callback) {
        roleCreate('Assassin', callback);
      },
      function (callback) {
        roleCreate('Marksman', callback);
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createRoles, createChampions],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);

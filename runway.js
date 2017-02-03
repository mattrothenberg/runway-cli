#!/usr/bin/env node

var program = require('commander');
var colors = require('colors');
var Spinner = require('cli-spinner').Spinner;
var spinner = new Spinner('Hot damn, those are some nice styles! Hang tight while we set up your styleguide... %s');
spinner.setSpinnerString('|/-\\');

program
  .command('new-styleguide')
  .description('Creates a new Runway styleguide, given a .CSS or .SCSS file. Optionally specify a name and syntax highlighting theme. Returns the URL to your styleguide.')
  .arguments('<stylesheet>')
  .usage('<stylesheet> [options]')
  .option('-n, --name <name>', 'The name of your styleguide')
  .option('-h, --highlighting <highlighting>',
          'The syntax highlighting theme for your styleguide',
          /^(monokai|github|solarized)$/i, 'monokai')
  .on('--help', function(){
    console.log('Default Name'.bold)
    console.log('If you omit the name flag, we\'ll choose a random name for you. You\'ve been warned.')
    console.log('');
    console.log('Available Syntax highlighting Themes *'.bold);
    console.log('monokai, github, solarized');
    console.log('');
    console.log('* If none provided, monokai is chosen as a default'.italic);
  })
  .action(newStyleguide);

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomName() {
  var fruits = ['banana', 'apple', 'orange', 'pear'];
  var adjectives = ['spunky', 'quirky', 'malevolent', 'recalcitrant'];

  var randomFruit = fruits[generateRandomNumber(0, fruits.length)];
  var randomAdjective = adjectives[generateRandomNumber(0, adjectives.length)];

  return randomAdjective + '-' + randomFruit;
}

function newStyleguide(cmd) {
  var randomStyleguideId = generateRandomNumber(1000, 2000);
  var styleguideUrl = `http://runway-app.cfapps.io/styleguide/${randomStyleguideId}`;
  var styleguideName,
      styleguideHighlighting;

  this.opts().name.length > 0 ?
    styleguideName = this.opts().name :
    styleguideName = generateRandomName();

  styleguideHighlighting = this.opts().highlighting;

  spinner.start();
  setTimeout(function() {
    spinner.stop();
    console.log('\n' + 'Success!'.green);
    console.log(`We turned ${cmd.bold} into ${styleguideName.bold}, using ${styleguideHighlighting.bold} for syntax highlighting. Check it out:`);
    console.log(styleguideUrl.underline);
  }, 2000);
}

program.parse(process.argv);

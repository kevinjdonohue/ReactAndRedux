/* eslint-disable no-console */
import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

fs.readFile('src/index.html', 'utf8', (readFileError, markup) => {
  if (readFileError) {
    return console.log(readFileError);
  }

  const $ = cheerio.load(markup);

  $('head').prepend('<link rel="stylesheet" href="styles.css">');

  fs.writeFile('dist/index.html', $.html(), 'utf8', (writeFileError) => {
    if (writeFileError) {
      return console.log(writeFileError);
    }
    console.log('index.html written to /dist'.green);
  });
});

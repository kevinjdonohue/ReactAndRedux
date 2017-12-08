/* eslint-disable no-console */
import webpack from 'webpack';
// import colors from 'colors';
import webpackConfig from '../webpack.config.prod';
// import { clearScreenDown } from 'readline';

process.env.NODE_ENV = 'production'; // ensures Babel dev config doesn't apply (hot reloading)

console.log('Generating minified bundle for production via Webpack.  This will take a moment...'.blue);

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    console.log(err.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error.red));
  }

  if (jsonStats.hasWarnings) {
    console.log('Webpack generated the following warnings: '.bold.yellow);
    jsonStats.warnings.map(warning => console.log(warning.yellow));
  }

  console.log(`Webpack stats: ${stats}`);

  console.log("Your app has been compiled in production mode and written to /dist.  It's ready to roll!"
    .green);

  return 0;
});

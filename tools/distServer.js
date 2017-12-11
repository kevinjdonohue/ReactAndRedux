/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

const app = express();

// enables gzip compression
app.use(compression());

app.use(express.static('dist'));

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = 3000;

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    open(`http://localhost:${port}`);
  }
});

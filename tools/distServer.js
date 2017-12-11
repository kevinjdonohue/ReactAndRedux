/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import open from 'open';

const app = express();

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

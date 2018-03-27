const path = require('path');

const express = require('express');
const serveStatic = require('serve-static');
const config = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);

app.use(bodyParser.json());
app.use(cors());

app.use(require('ebm-auth').initialize({
  provider: 'https://linkapp.ebm.nymous.io/',
}));

app.use('/api', require('ebm-auth/dist/express').requireAuth({
  provider: 'https://linkapp.ebm.nymous.io/',
}), require('./api'));

app.use(serveStatic('./public'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(config.app.port, (err) => {
  if (err) console.error(err);
  else console.log(`Listening on port ${config.app.port}`);
});

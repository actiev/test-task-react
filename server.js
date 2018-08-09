const express = require('express');
const bodyParser = require('body-parser');

const actions = require('./actions');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
  next();
});

app.get('/users', (req, res) => {
  res.json(actions.read());
});

app.post('/users', (req, res) => {
  const data = req.body;
  if (Object.keys(data).length === 0) {
    res.status(400).json({err: 'Server expects json content-type'});
    return;
  }
  try {
    actions.create(data.first_name, data.last_name, data.dob, data.location);
    res.status(200).end();
  } catch (err) {
    res.status(400).json({err});
  }
});

app.put('/users/:id', (req, res) => {
  const data = req.body;
  if (Object.keys(data).length === 0) {
    res.status(400).json({err: 'Server expects json content-type'});
    return;
  }
  try {
    actions.update(
      req.params.id,
      data.first_name,
      data.last_name,
      data.dob,
      data.location,
    );
    res.status(200).end();
  } catch (err) {
    res.status(400).json({err});
  }
});

app.delete('/users/:id', (req, res) => {
  try {
    actions.delete(req.params.id);
    res.status(200).end();
  } catch (err) {
    res.status(400).json({err});
  }
});

app.listen(3001, () =>
  console.log(
    'Server is running on localhost:3001. Your client app request will be proxied to this host',
  ),
);

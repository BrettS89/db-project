require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { registerModels } = require('./db');

const start = async () => {
  const app = express();

  app.use(express.json());

  await axios.post(`${process.env.LYNXDB_URI}/config`, {
    host: process.env.LYNXDB_HOST,
    port: process.env.LYNXDB_PORT,
    managerUrl: process.env.MANAGER_URL,
  });

  await registerModels();
  
  app.post('/', async(req, res) => {
    const { data } = await axios.post(`${process.env.LYNXDB_URI}/db`, {
      method: '$create',
      collection: 'tweet',
      data: req.body,
    });

    res.status(201).json(data);
  });
  
  app.get('/:id', async (req, res) => {
    const { data } = await axios.post(`${process.env.LYNXDB_URI}/db`, {
      method: '$get',
      collection: 'tweet',
      id: req.params.id,
    });

    res.status(200).json(data);
  });

  app.get('/', (req, res) => {
    res.send('we in');
  });

  const PORT = process.env.PORT;
  
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });  
};

start();

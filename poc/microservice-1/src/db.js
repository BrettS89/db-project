const axios = require('axios');

const userModel = {
  name: 'user',
  schema: {
    type: 'object',
    properties: {
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      age: { type: 'number' },
      username: { type: 'string' },
    },
  },
};

const models = [userModel];

const registerModels = async () => {
  const promises = models.map(model => {
    return axios.post(`${process.env.LYNXDB_URI}/model`, userModel);
  });

  await Promise.all(promises);
};

module.exports = {
  registerModels,
};

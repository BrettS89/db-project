const axios = require('axios');

const tweetModel = {
  name: 'tweet',
  schema: {
    type: 'object',
    properties: {
      body: { type: 'string' },
      userId: { type: 'string' },
    },
  },
  foreignKeys: [
    {
      field: 'userId',
      populateToField: 'user'
    },
  ],
};

const models = [tweetModel];

const registerModels = async () => {
  const promises = models.map(model => {
    return axios.post(`${process.env.LYNXDB_URI}/model`, tweetModel);
  });

  await Promise.all(promises);
};

module.exports = {
  registerModels,
};

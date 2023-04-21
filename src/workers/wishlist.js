const { parentPort } = require('worker_threads');
const db = require('../../database/models/index.js');

// LOAD MODELS FROM DATABASE
const { user } = db;

parentPort.on('message', async (userId) => {
  try {
    const userOwner = await user.findOne({
      where: { id: userId },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });
    parentPort.postMessage(userOwner);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    parentPort.postMessage(error);
  }
});

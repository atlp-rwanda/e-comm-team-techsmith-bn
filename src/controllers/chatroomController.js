import moment from 'moment';
import db from '../../database/models/index.js';

// CONFIGURE MOMENT
moment().format();

// LOAD MODELS FROM DB
const { chat, user, activity } = db;

const createMessage = async (message) => {
  try {
    // GET MESSAGE DETAILS
    const { loggedInUser, message: messageBody } = message;
    // DEFINE RESPONSE
    let response = {};
    // CREATE MESSAGE
    await chat
      .create({
        messageBody,
        userId: loggedInUser.id,
      })
      .then((messageResponse) => {
        const {
          dataValues: { messageBody: body, createdAt, updatedAt },
        } = messageResponse;
        response = {
          user: {
            id: loggedInUser.id,
            name: loggedInUser.name,
            email: loggedInUser.email,
          },
          messageBody: body,
          createdAt: moment(createdAt).format('MMM D, h:mm A'),
          updatedAt: moment(updatedAt).format('MMM D, h:mm A'),
        };
        return response;
      });
    // RETURN RESPONSE
    return response;
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
  }
};

const getMessages = async () => {
  try {
    const messages = await chat.findAll({
      order: [['createdAt', 'ASC']],
      attributes: ['id', 'messageBody', 'createdAt', 'updatedAt'],
      include: [
        {
          model: user,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
    const returnMessages = messages.map((message) => {
      const {
        dataValues: {
          id,
          messageBody,
          createdAt,
          updatedAt,
          user: { id: userId, name, email },
        },
      } = message;
      return {
        id,
        messageBody,
        createdAt: moment(createdAt).format('MMM D, h:mm A'),
        updatedAt: moment(updatedAt).format('MMM D, h:mm A'),
        user: {
          id: userId,
          name,
          email,
        },
      };
    });
    return returnMessages;
  } catch (error) {
    return error;
  }
};

const getActiveUsers = async () => {
  try {
    const activeUsers = await activity.findAll({
      attributes: ['id', 'room'],
      include: {
        model: user,
        as: 'user',
        attributes: ['id', 'name', 'email'],
      },
    });
    const returnUsers = activeUsers.map((activeUser) => {
      const {
        dataValues: {
          id,
          room,
          user: { id: userId, name, email },
        },
      } = activeUser;
      return {
        id,
        room,
        user: {
          id: userId,
          name,
          email,
        },
      };
    });
    return returnUsers;
  } catch (error) {
    return error;
  }
};

const removeActiveUser = async (userDisconnected) => {
  try {
    const deleteUser = await activity.destroy({
      where: { userId: userDisconnected.id },
      returning: true,
    });
    return deleteUser;
  } catch (error) {
    return error;
  }
};

const addActiveUser = async (loggedInUser) => {
  try {
    const { id, name, email } = loggedInUser;
    const userExists = await activity.findOne({
      where: { userId: id },
    });
    if (!userExists) {
      await activity.create({
        userId: id,
      });
      const returnUser = {
        id,
        room: 'Techsmiths',
        user: {
          id,
          name,
          email,
        },
      };
      return returnUser;
    }
    const returnUser = {
      id: userExists.id,
      room: userExists.room,
      user: {
        id,
        name,
        email,
      },
    };
    return returnUser;
  } catch (error) {
    return error;
  }
};

const removeTestMessages = async (userId) => {
  try {
    const response = await chat.destroy({
      where: { userId },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export {
  createMessage,
  getMessages,
  getActiveUsers,
  removeActiveUser,
  addActiveUser,
  removeTestMessages,
};

import chai from 'chai';
import {
  createMessage,
  getMessages,
  getActiveUsers,
  addActiveUser,
  removeActiveUser,
  removeTestMessages,
} from '../controllers/chatroomController';

// MESSAGE CONTENT
const message = {
  loggedInUser: {
    id: 115,
    name: 'Nishimwe 2FA',
    email: 'atlpseller@gmail.com',
    image:
      'https://res.cloudinary.com/nishimweprince/image/upload/v1681665357/ecommerce/chatbox/kyjaoshy265u2pcksyda.png',
  },
  message: 'This is a test message',
};

describe('Chatroom Controller', () => {
  
  // GET ACTIVE USERS
  describe('Get active users', () => {
    it('should return all active users', async () => {
      const users = await getActiveUsers();
      chai.expect(users).to.be.an('array');
    });
  });
  
  // ADD ACTIVE USER
  let user = {};
  describe('Add active user', () => {
    it('should add active user', async () => {
      user = await addActiveUser(message.loggedInUser);
      chai.expect(user).to.be.an('object');
    });
  });
  // REMOVE ACTIVE USER
  describe('Get remaining users', () => {
    it('should return remaining users', async () => {
      const response = await removeActiveUser(user);
      chai.expect(response).to.be.an('number');
    });
  });
  
});

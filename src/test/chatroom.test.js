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
  // GET ALL MESSAGES
  describe('Get all messages', () => {
    it('should return all messages', async () => {
      const messages = await getMessages();
      chai.expect(messages).to.be.an('array');
    });
  });
  // GET ACTIVE USERS
    describe('Get active users', () => {
        it('should return all active users', async () => {
            const users = await getActiveUsers();
            chai.expect(users).to.be.an('array');
        });
    });
    // CREATE MESSAGE
    describe('Create message', () => {
        it('should create a new message', async () => {
            const newMessage = await createMessage(message);
            chai.expect(newMessage).to.be.an('object');
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
    // CLEAN UP
    describe('Remove test messages', () => {
        it('should remove test messages', async () => {
            const response = await removeTestMessages(message.loggedInUser.id);
            chai.expect(response).to.be.an('number');
        });
    });
});

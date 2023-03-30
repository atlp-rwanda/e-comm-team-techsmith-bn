import db from '../../database/models/index.js';

const { User } = db;
class userController {
  // get allusers
  static async getUsers(req, res) {
    try {
      const user = await User.findAll();
      res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}
export default userController;

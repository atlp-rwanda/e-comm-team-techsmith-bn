import db from '../../database/models';

// - user ----
// "email": "gabs1@gmail.com",
// "password": "@Gaby12345"

const { user: User } = db;

class dis_enableController {
  static async disableUser({ params }, res) {
    try {
      const user = await User.findOne({ where: { id: params.id } });

      if (!user || user.isActive === false) {
        return res
          .status(409)
          .send({ error: 'This Account is already disabled!' });
      }

      const disabledUser = await User.update(
        { isActive: false },
        {
          where: { id: params.id },
          returning: true,
        }
      );

      if (!disabledUser) {
        return res
          .status(404)
          .send({ error: 'Account to be disabled not found!', disabledUser });
      }

      return res.status(200).send({
        message: `Account which belongs to ${user.name} was successfully disabled`,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).send({ error: e.message });
    }
  }

  static async enableUser({ params }, res) {
    try {
      const user = await User.findOne({ where: { id: params.id } });

      if (!user) {
        return res
          .status(404)
          .send({ error: 'Account to be disabled not found!' });
      }

      const enabledUser = await User.update(
        { isActive: true },
        {
          where: { id: params.id },
          returning: true,
        }
      );

      if (!enabledUser) {
        return res
          .status(404)
          .send({ error: 'Account to be disabled not found!', enabledUser });
      }

      return res.status(200).send({
        message: `Account which belongs to ${user.name} was successfully enabled`,
        enabledUser,
      });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  }
}

export default dis_enableController;

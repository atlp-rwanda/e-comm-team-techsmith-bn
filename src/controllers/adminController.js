import bcrypt from 'bcrypt';
import db from '../../database/models/index.js';
import { validateEmail, validatePassword } from '../utils/userValidation.js';

// LOAD MODELS FROM DATABASE
const { user, role: Role } = db;
const logger = require('./logger');

/* ADMIN CONTROLLER */
class adminControllers {
  // GET ALL USERS
  static async getUsers(req, res) {
    try {
      const pageAsNumber = Number.parseInt(req.query.page, 10);
      const sizeAsNumber = Number.parseInt(req.query.size, 10);

      let page = 1;
      if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
        page = pageAsNumber;
      }

      let size = 5;
      if (
        !Number.isNaN(sizeAsNumber) &&
        sizeAsNumber > 0 &&
        sizeAsNumber < 10
      ) {
        size = sizeAsNumber;
      }
      const offset = (page - 1) * size;
      const allUsers = await user.findAndCountAll({
        include: {
          model: Role,
          as: 'role',
          attributes: ['name'],
        },
        attributes: {
          exclude: ['password'],
        },
        limit: size,
        offset,
      });
      const totalPages = Math.ceil(allUsers.count / size);
      const currentPage = page > totalPages ? totalPages : page;
      const prevPage = currentPage === 1 ? null : currentPage - 1;
      const nextPage = currentPage === totalPages ? null : currentPage + 1;

      if (allUsers.rows.length === 0) {
        logger.userLogger.info(
          ' /GET statusCode: 404 : No users found on a page '
        );
        return res
          .status(404)
          .json({ message: `There is no items found on page ${page}` });
      }
      logger.userLogger.info(
        ' /GET statusCode: 200 : List of users on a page '
      );
      return res.status(200).json({
        message: `List of all ${allUsers.count} users`,
        data: {
          totalItems: allUsers.count,
          totalPages,
          pageSize: size,
          currentPage,
          prevPage,
          nextPage,
          payments: allUsers.rows,
        },
      });
    } catch (error) {
      logger.userLogger.error(` /GET statusCode: 500 :${error.message}`);
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  // DELETE USER
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const userToBeDeleted = await user.destroy({
        where: { id },
      });

      // condition
      if (!userToBeDeleted) {
        logger.userLogger.error(' /DELETE statusCode: 404 : User not found');
        return res.status(404).json({
          message: `user with id: ${id} is not found`,
        });
      }
      logger.userLogger.error(' /GET statusCode: 204 : User deleted by admin');
      return res.status(204).json({
        message: `User with id: ${id} is deleted`,
      });
    } catch (error) {
      logger.userLogger.error(
        ` /DELETE statusCode: 500 : Delete user by Admin failed ${error.message}`
      );
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  //   CREATE USER

  static async createUsers(req, res) {
    try {
      const { name, email, password, role, gender } = req.body;

      const validEmail = validateEmail(email);
      const validPassword = validatePassword(password);
      // INVALID EMAIL
      if (!validEmail || !validPassword) {
        logger.userLogger.error(' /POST statusCode: 400 : Invalid credentials');
        return res.status(400).json({
          message: 'Invalid email or password',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // check if user exist
      const userExists = await user.findOne({ where: { email } });
      if (userExists) {
        logger.userLogger.error(' /GET statusCode: 409 : User already exists');
        return res.status(409).json({
          message: 'User already exists',
          user: userExists,
        });
      }

      // LOG VALIDATION RESULTS
      /* REGISTER USER IF EMAIL AND PASSWORD ARE */

      const newUser = await user.create({
        name,
        email,
        password: hashedPassword,
        roleId: role,
        isActive: true,
        gender,
        passcodeModifiedAt: Date.now(),
        birthDate: new Date(),
        preferredLanguage: 'rw',
        preferredCurrency: 'RWF',
        physicalAddress: 'Rwanda',
      });

      const { password: userPassword, ...userDetails } = newUser.dataValues;
      logger.userLogger.info(' /POST statusCode: 201 : User created');
      return res.status(201).json({
        message: 'User created successfully',
        data: userDetails,
      });
    } catch (error) {
      logger.userLogger.error(
        ` /POST statusCode: 500  : Create user failed ${error.message}`
      );
      return res.status(500).json({ message: error.message });
    }
  }

  // UPDATE USER
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, gender } = req.body;

      const userUpdated = await user.update(
        { name, gender },
        {
          where: { id },
          returning: true,
          attributes: { exclude: ['password'] },
        },
        { new: true }
      );

      if (!userUpdated) {
        logger.userLogger.error(' /PUT statusCode: 404 : User not found');
        return res.status(404).json({
          message: `user with id: ${id} is not found`,
        });
      }
      logger.userLogger.info(' /PUT statusCode: 200 : User updated');
      return res.status(200).json({
        message: `User with id:${id} is updated successfully`,
        data: userUpdated,
      });
    } catch (error) {
      logger.userLogger.error(
        ` /PUT statusCode: 500 : User not updated ${error.message}`
      );
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}
export default adminControllers;

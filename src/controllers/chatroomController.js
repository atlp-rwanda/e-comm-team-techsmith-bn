import dotenv from 'dotenv';
import { Op } from 'sequelize';
import db from '../../database/models/index.js';
import { getPagination, getPagingData } from '../utils/pagination.js';

// CONFIG DOTENV
dotenv.config();

// IMPORT MODELS
const { chat, room, user, participant } = db;

class chatController {
  static async createRoom(req, res) {
    const { name } = req.body;
    try {
      const roomExists = await room.findOne({
        where: {
          name,
        },
      });
      if (!roomExists) {
        const createRoom = await room.create({
          name,
        });
        return res.status(201).json({
          message: 'Room created',
          data: createRoom,
        });
      }
      return res.status(200).json({
        message: 'Room already exists',
        data: roomExists,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  static async createChat(messageBody, roomId, userId) {
    try {
      const createChat = await chat.create(
        {
          messageBody,
          roomId,
          userId,
        },
        {
          include: [
            {
              model: room,
              as: 'room',
              attributes: ['id', 'name'],
            },
            {
              model: user,
              as: 'sender',
              attributes: ['id', 'name'],
            },
          ],
        }
      );
      return createChat;
    } catch (error) {
      return error;
    }
  }

  static async getChat(roomId) {
    try {
      const getChat = await chat.findAll({
        where: {
          roomId,
        },
        include: [
          {
            model: room,
            as: 'room',
          },
          {
            model: user,
            as: 'sender',
            attributes: ['id', 'name'],
          },
        ],
      });
      return getChat;
    } catch (error) {
      return error;
    }
  }

  static async getRoomsList(req, res) {
    const { userId } = req.params;
    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);

    try {
      const getRooms = await participant.findAndCountAll({
        where: { userId },
        limit,
        offset,
        include: [
          {
            model: room,
            as: 'room',
            attributes: ['id', 'name'],
            include: [
              {
                model: participant,
                as: 'participants',
                attributes: ['id', 'userId', 'roomId'],
                include: [
                  {
                    model: user,
                    as: 'user',
                    attributes: ['id', 'name'],
                  },
                ],
              },
            ],
          },
          {
            model: user,
            as: 'user',
            attributes: ['id', 'name'],
          },
        ],
      });
      if (!getRooms) {
        return res.status(404).json({
          message: 'No rooms found',
        });
      }
      return res.status(200).json({
        message: 'Rooms retrieved successfully',
        data: getPagingData(getRooms, page, limit),
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  static async createParticipant(req, res) {
    const { userId, roomId } = req.body;
    try {
      const createParticipant = await participant.create({
        userId,
        roomId,
      });
      return res.status(201).json({
        message: 'Participant created',
        data: createParticipant,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  static async searchRoom(name, page, size) {
    const { limit, offset } = getPagination(page, size);

    try {
      let searchResults = [];
      let totalCount = 0;

      const searchRooms = await room.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
        include: [
          {
            model: participant,
            as: 'participants',
            attributes: ['id', 'userId', 'roomId'],
          },
        ],
        limit,
        offset,
      });

      if (!searchRooms.rows || searchRooms.rows.length === 0) {
        const searchUsers = await user.findAndCountAll({
          where: {
            name: {
              [Op.like]: `%${name}%`,
            },
          },
          limit,
          offset,
          attributes: ['id', 'name', 'email'],
        });
        totalCount += searchUsers.count;
        searchResults = [...searchResults, ...searchUsers.rows];
      }

      searchResults = [...searchResults, ...searchRooms.rows];
      totalCount += searchRooms.count;
      return { searchResults, totalPages: Math.ceil(totalCount / limit) };
    } catch (error) {
      return error;
    }
  }

  static async createRoomWithParticipants(req, res) {
    const { name } = req.body;
    const { creatorId, recipientId } = req.query;

    try {
      const t = await db.sequelize.transaction();
      const roomExists = await room.findOne({
        where: {
          name,
        },
      });

      if (roomExists) {
        const createSender = await participant.create({
          roomId: roomExists.id,
          userId: creatorId,
        });
        return res.status(200).json({
          message: 'Room already exists',
          data: {
            room: roomExists,
            sender: createSender,
          },
        });
      }

      if (!roomExists) {
        const createRoom = await room.create(
          {
            name,
          },
          { transaction: t }
        );
        const createSender = await participant.create(
          {
            roomId: createRoom.id,
            userId: creatorId,
          },
          { transaction: t }
        );

        const createRecipient = await participant.create(
          {
            roomId: createRoom.id,
            userId: recipientId,
          },
          {
            transaction: t,
          }
        );
        await t.commit();
        return res.status(201).json({
          message: 'Room and participant created',
          data: {
            room: createRoom,
            sender: createSender,
            recipient: createRecipient,
          },
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default chatController;

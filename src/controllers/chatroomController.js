import dotenv from 'dotenv';
import { Op, Sequelize } from 'sequelize';
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

    const participantExists = await participant.findOne({
      where: {
        userId,
        roomId,
      },
    });

    if (participantExists) {
      return res.status(200).json({
        message: 'Participant already exists',
        data: participantExists,
      });
    }

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

      return getPagingData(searchUsers, page, limit);
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

      if (roomExists && name.length > 0) {
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

      if (roomExists && name.length === 0) {
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

  static async searchGroup(name, page, size) {
    const { limit, offset } = getPagination(page, size);

    try {
      const searchGroups = await room.findAndCountAll({
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

      const payload = searchGroups.rows.filter(
        (group) => group.participants.length > 2
      );

      return payload;
    } catch (error) {
      return error;
    }
  }

  static async getGroupsList(req, res) {
    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);

    try {
      const getGroups = await room.findAndCountAll({
        where: {
          [Op.and]: [
            {
              name: {
                [Op.ne]: null,
              },
            },
            Sequelize.where(
              Sequelize.fn('char_length', Sequelize.col('room.name')),
              '>',
              0
            ),
          ],
        },
        limit,
        offset,
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
      });

      if (!getGroups) {
        return res.status(200).json({
          data: [],
          message: 'No groups found',
        });
      }
      return res.status(200).json({
        message: 'Groups retrieved successfully',
        data: getPagingData(getGroups, page, limit),
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  static async createGroup(req, res) {
    const { name, participants } = req.body;

    try {
      const t = await db.sequelize.transaction();

      const createGroup = await room.create(
        {
          name,
        },
        { transaction: t }
      );
      const payload = participants.map((groupParticipant) => ({
        roomId: createGroup.id,
        userId: groupParticipant,
      }));

      const createParticipants = await Promise.all(
        payload.map(async (groupParticipant) => {
          const newParticipant = await participant.create(groupParticipant, {
            transaction: t,
          });
          return newParticipant;
        })
      );

      await t.commit();

      console.log(createGroup, createParticipants);

      return res.status(201).json({
        message: 'Group created',
        data: {
          group: createGroup,
          participants: createParticipants,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default chatController;

import dotenv from 'dotenv';
import db from '../../database/models/index.js';
import validateProductInput from '../utils/productValidation.js';
import getExpiryDateAndId from '../utils/getIdAndDate.js';
import validateProductSearchInput from '../utils/productSearch.js';

const Sequelize = require('sequelize');
const logger = require('./logger');

const { Op } = Sequelize;
// CONFIG DOTENV
dotenv.config();

// IMPORT MODEL PRODUCT
const { product, user } = db;

class ProductController {
  static async addProduct(req, res) {
    const {
      name,
      quantity,
      price,
      categoryId,
      image,
      description,
      expiryDate,
      condition,
    } = req.body;
    const { id } = res.locals;

    /* eslint-disable no-console */
    try {
      const duplicateProduct = await product.findOne({
        where: { name, userId: id },
      });
      const { error } = validateProductInput(req.body);
      if (error) {
        logger.productLogger.error(
          `/POST statusCode: 400 : ${error.details[0].message}`
        );
        return res.status(400).json({ message: error.details[0].message });
      }
      if (duplicateProduct) {
        logger.productLogger.error('/POST statusCode: 409 : Duplicate found');
        return res.status(409).json({
          message: 'The product already exist, You can update its details only',
          data: duplicateProduct,
        });
      }
      // ELSE CREATE NEW PRODUCT
      const newProduct = await product.create({
        userId: id,
        name,
        quantity,
        price,
        categoryId,
        description,
        expiryDate,
        image,
        condition,
        include: {
          model: user,
          as: 'user',
          attributes: ['name', 'email'],
        },
        isAvailable: true,
      });
      logger.productLogger.info(
        '/POST statusCode: 201 : user succesfully created product'
      );
      return res.status(201).json({
        ok: true,
        message: 'Product created successfully',
        data: newProduct,
      });
    } catch (error) {
      logger.productLogger.error(`/POST statCode: 500 : ${error.message}`);
      return res.status(500).json({
        status: 'Adding product failed',
        message: error.message,
      });
    }
  }

  static async findAllproducts(req, res) {
    const pageAsNumber = Number.parseInt(req.query.page, 10);
    const sizeAsNumber = Number.parseInt(req.query.size, 10);

    let page = 1;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
      page = pageAsNumber;
    }

    let size = 20;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
      size = sizeAsNumber;
    }
    const offset = (page - 1) * size;
    try {
      const products = await product.findAndCountAll({
        include: {
          model: user,
          as: 'user',
          attributes: ['name', 'email'],
        },
        limit: size,
        offset,
      });
      const totalPages = Math.ceil(products.count / size);
      const currentPage = page > totalPages ? totalPages : page;
      const prevPage = currentPage === 1 ? null : currentPage - 1;
      const nextPage = currentPage === totalPages ? null : currentPage + 1;

      if (products.rows.length === 0) {
        logger.productLogger.error(
          '/GET statusCode: 404 : No  item found on page'
        );
        return res
          .status(404)
          .json({ message: `There is no items found on page ${page}` });
      }
      if (products.length <= 0) {
        logger.productLogger.info(
          '/GET statusCode: 200 : Zero product found in collection'
        );
        return res.status(200).json({
          ok: false,
          message: 'You have no product in your collection',
        });
      }
      logger.productLogger.info('/GET statusCode: 200 : All Products fetched ');
      return res.status(200).json({
        ok: true,
        message: ` ${products.count} products found`,
        data: {
          totalItems: products.count,
          totalPages,
          pageSize: size,
          currentPage,
          prevPage,
          nextPage,
          products: products.rows,
        },
      });
    } catch (error) {
      logger.productLogger.error(
        `/GET statusCode: 500 : Fetching product failed : ${error.message}`
      );
      return res.status(500).json({
        status: 'Getting product failure',
        message: error.message,
      });
    }
  }

  // A SELLER SEE ALL HIS PRODUCTS
  static async myCollectionProducts(req, res) {
    const pageAsNumber = Number.parseInt(req.query.page, 10);
    const sizeAsNumber = Number.parseInt(req.query.size, 10);

    let page = 1;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
      page = pageAsNumber;
    }

    let size = 20;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
      size = sizeAsNumber;
    }
    const offset = (page - 1) * size;
    try {
      const { id } = res.locals;
      const products = await product.findAndCountAll({
        where: { userId: id },
        include: [
          {
            model: user,
            as: 'user',
            attributes: ['name'],
          },
        ],
        limit: size,
        offset,
      });
      const totalPages = Math.ceil(products.count / size);
      const currentPage = page > totalPages ? totalPages : page;
      const prevPage = currentPage === 1 ? null : currentPage - 1;
      const nextPage = currentPage === totalPages ? null : currentPage + 1;

      if (products.rows.length === 0) {
        logger.productLogger.error(
          '/GET statusCode: 404 :Item not found on page'
        );
        return res
          .status(404)
          .json({ message: `There is no items found on page ${page}` });
      }
      if (products.length <= 0) {
        logger.productLogger.info(
          '/GET statusCode: 200 : Zero product found in collection'
        );
        return res.status(200).json({
          ok: false,
          message: 'You have no product in your collection',
        });
      }
      logger.productLogger.info('/GET statusCode: 200 : All Products fetched ');
      return res.status(200).json({
        ok: true,
        message: `There are ${products.count} products found`,
        data: {
          totalItems: products.count,
          totalPages,
          pageSize: size,
          currentPage,
          prevPage,
          nextPage,
          products: products.rows,
        },
      });
    } catch (error) {
      logger.productLogger.error(
        `/GET statusCode: 500 : Fetching product in collection failed : ${error.message}`
      );
      return res.status(500).json({
        status: 'Getting product failed',
        message: error.message,
      });
    }
  }

  // USER CAN GET ALL AVAILABLE PRODUCTS
  static async allAvailableProducts(req, res) {
    const pageAsNumber = Number.parseInt(req.query.page, 10);
    const sizeAsNumber = Number.parseInt(req.query.size, 10);

    let page = 1;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
      page = pageAsNumber;
    }

    let size = 20;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
      size = sizeAsNumber;
    }
    const offset = (page - 1) * size;
    try {
      const availableProducts = await product.findAndCountAll({
        where: { isAvailable: true },
        include: [
          {
            model: user,
            as: 'user',
            attributes: ['name'],
          },
        ],
        limit: size,
        offset,
      });
      const totalPages = Math.ceil(availableProducts.count / size);
      const currentPage = page > totalPages ? totalPages : page;
      const prevPage = currentPage === 1 ? null : currentPage - 1;
      const nextPage = currentPage === totalPages ? null : currentPage + 1;

      if (availableProducts.rows.length === 0) {
        logger.productLogger.error(
          '/GET statusCode: 404 :Item not found on page'
        );
        return res
          .status(404)
          .json({ message: `There is no items found on page ${page}` });
      }
      if (availableProducts < 1) {
        logger.productLogger.info(
          '/GET statusCode: 200 : All products are sold'
        );
        return res.status(200).json({
          message: 'All products are sold',
        });
      }
      logger.productLogger.info(
        '/GET statusCode: 200 : Available  Products fetched '
      );
      return res.status(200).json({
        ok: true,
        message: `There are ${availableProducts.count} Available products in the stock`,
        data: {
          totalItems: availableProducts.count,
          totalPages,
          pageSize: size,
          currentPage,
          prevPage,
          nextPage,
          availableProducts: availableProducts.rows,
        },
      });
    } catch (error) {
      logger.productLogger.error(
        `/GET statusCode: 500 : Fetching available products failed : ${error.message}`
      );
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  // BUYER CAN GET SPECIFIC ITEM FROM AVAILABLE
  static async buyerGetProduct(req, res) {
    const { id } = req.params;
    try {
      const availableProduct = await product.findOne({
        where: { isAvailable: true, id },
      });
      if (availableProduct) {
        logger.productLogger.info(
          '/GET statusCode: 200 : Search of specific product is successful '
        );
        return res.status(200).json({
          status: `successfully retrived product of id ${id}`,
          message: availableProduct,
        });
      }
      logger.productLogger.info(
        '/GET statusCode: 404 : Id of searched product does not found'
      );
      return res.status(404).json({
        status: 'fail',
        message: `The product with this id ${id} doesn't exist`,
      });
    } catch (error) {
      logger.productLogger.error(
        `/GET statusCode: 500 : Searching a product failed : ${error.message}`
      );
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  // A  SELLER CAN SEE AVAILABLE PRODUCTS IN HIS COOOLECTION
  static async availableProducts(req, res) {
    const { id } = res.locals;
    try {
      const availableProducts = await product.findAll({
        where: {
          isAvailable: true,
          userId: id,
        },
        include: [
          {
            model: user,
            as: 'user',
            attributes: ['name'],
          },
        ],
      });
      if (availableProducts.length < 1) {
        logger.productLogger.info(
          '/GET statusCode: 200 : All products are sold'
        );
        return res.status(200).json({
          message: 'All products are sold',
        });
      }
      logger.productLogger.info(
        '/GET statusCode: 200 : Available  Products in collection fetched '
      );
      return res.status(200).json({
        ok: true,
        message: 'Available products in your collection:',
        data: availableProducts,
      });
    } catch (error) {
      logger.productLogger.error(
        `/GET statusCode: 500 : Fetching available products in collection failed : ${error.message}`
      );
      return res.status(500).json({
        message: 'Server error',
      });
    }
  }

  static async expirationOfProducts(req, res) {
    try {
      const currentDate = new Date();
      const products = await product.findAll();
      let foundUser;

      const expiredProducts = getExpiryDateAndId(products).filter(
        (prod) => new Date(prod.expiryDate) < new Date(currentDate)
      );
      expiredProducts.forEach(async (p) => {
        foundUser = await user.findOne({
          where: { id: p.userId },
        });

        logger.userLogger.info(
          `/POST statusCode: 200 : Email sent successfully to ${foundUser.email}`
        );
      });
      /* eslint-disable */
            for (let i = 0; i < expiredProducts.length; i++) {
                await product.update({ isAvailable: false }, { where: { id: expiredProducts[i].id } });
            }
            logger.productLogger.info(`/GET statusCode: 200 : Product expiration check completed`);
            return res.status(200).json({
                ok: true,
                message: 'Product expiration check completed',
                exprired_Products: expiredProducts,
            });
        } catch (error) {
            logger.productLogger.error(`/GET statusCode: 500 : Getting expired product failed: ${error.message}`);
            return res.status(500).json({
                status: 'Getting product failure',
                message: error.message,
            });
        }
    }

    // GET ONE FROM MINE
    static async getOneFromMine(req, res) {
        try {
            const pId = req.params.id;
            // Getting logged in user's id
            const loggedInUserId = res.locals.id;

            // GETTING ONLY YOUR PRODUCT
            const fetchMyProducts = await product.findAll({
                where: {
                    userId: loggedInUserId,
                    id: pId,
                },
            });

            const { dataValues } = fetchMyProducts[0];
            const retrivedProduct = {
                categoryId: dataValues.categoryId,
                name: dataValues.name,
                image: dataValues.image,
                price: dataValues.price,
                condition: dataValues.condition,
                description: dataValues.description,
                expiryDate: dataValues.expiryDate,
                createdAt: dataValues.createdAt,
                updatedAt: dataValues.updatedAt,
                isAvailable: dataValues.isAvailable,
            };

            const myProducts = fetchMyProducts.map(({ id }) => ({
                id: parseInt(id),
                userId: loggedInUserId,
                retrivedProduct,
            }));

            // CHECKING IF loggedInUser OWN A PRODUCT
            const productExist = myProducts.some((e) => e.id == pId);

            if (productExist) {
                const getProduct = await product.findOne({
                    where: { id: pId, isAvailable: true },
                });
                if (getProduct) {
                    logger.productLogger.info('/GET statusCode: 200 : Fetch a product from mine is successful ');
                    return res.status(200).json({
                        message: 'Product successfully retrieved',
                        data: myProducts,
                    });
                }
                logger.productLogger.error('/GET statusCode: 404 :Item not found  in stock');
                return res.status(404).json({
                    message: ' Product is not available',
                });
            }
            logger.productLogger.error('/GET statusCode: 404 :Item not found in a seller collection ');
            return res.status(404).json({
                message: "The product doesn't exists in your collection!",
            });
        } catch (error) {
            logger.productLogger.error(`/GET statusCode: 500 : get a product in my collection failed: ${error.message}`);
            return res
                .status(500)
                .json({ message: " The product doesn't exists in your collection!" });
        }
    }

    // DELETE A SEPCIFIC PRODUCT
    static async deleteProduct(req, res) {
        try {
            const { pId } = req.params;
            // Getting logged in user's id
            const loggedInUserId = res.locals.id;

            // GETTING ONLY YOUR PRODUCT
            const fetchMyProducts = await product.findAll({
                where: {
                    userId: loggedInUserId,
                },
                attributes: ['id'],
            });

            const myProducts = fetchMyProducts.map(({ id }) => ({
                id: parseInt(id),
            }));

            // CHECKING IF loggedInUser OWN A PRODUCT
            const productExist = myProducts.some((e) => e.id == pId);

            if (!productExist) {
                logger.productLogger.error('/DELETE statusCode: 404 :Item not found in a seller collection ');
                return res.status(404).json({
                    message: "The product doesn't exists in your collection!",
                });
            }
            // DELETING THE PRODUCT
            const deleteProduct = await product.destroy({ where: { id: pId } });

            // CHECK IF PRODUCT IS DELETED
            if (deleteProduct) {
                logger.productLogger.info(`/DELETE statusCode: 200 : product with id=${id} deleted successful by owner`);
                return res.status(200).json({
                    ok: true,
                    message: 'Product successfully deleted',
                });
            }
            logger.productLogger.info('/DELETE statusCode: 400 : Wrong input, product not deleted');
            return res.status(400).json({
                ok: false,
                message: 'Not deleted!',
            });
        } catch (error) {
            logger.productLogger.error(` / DELETE statusCode: 500: Delete a product by owner failed: $ { error.message }
                            `);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    static async updateProduct(req, res) {
        const {
            name,
            price,
            categoryId,
            image,
            description,
            expiryDate,
            condition,
        } = req.body;
        try {
            // GET PRODUCT ID FROM THE PARAMS
            const { id } = req.params;
            // GET LOGGED IN USER ID FROM LOCAL RESPONSES
            const { id: loggedInUserId } = res.locals;
            // CHECK IF PRODUCT EXISTS
            const productExist = await product.findOne({ where: { id } });
            if (!productExist) {
                logger.productLogger.error('/PUT statusCode: 404 :Item not found in a seller collection ');
                return res.status(404).json({
                    message: "The product doesn't exists in your collection!",
                });
            }

            // CHECK IF LOGGED IN USER OWNS THE PRODUCT
            if (productExist.userId !== loggedInUserId) {
                logger.productLogger.error('/PUT statusCode: 401 :Unauthorised user tries to edit an item details ');
                return res.status(401).json({
                    message: 'You are not authorized to edit this product! It belongs to another user',
                });
            }
            // VALIDATE INPUTS
            const { error } = validateProductInput(req.body);
            if (error) {
                logger.productLogger.error(` / PUT statusCode: 400: validation failed: $ { error.details[0].message }
                            `);
                return res.status(400).json({ message: error.details[0].message });
            }
            // IF INPUTS ARE VALIDATED, UPDATE PRODUCT
            const updateProduct = await product.update({
                name,
                price,
                categoryId,
                image,
                description,
                expiryDate,
                condition,
            }, {
                where: { id },
                returning: true,
                include: {
                    model: user,
                    as: 'user',
                    attributes: ['name', 'email'],
                },
            });

            // CHECKING IF UPDATED
            if (updateProduct) {
                logger.productLogger.error(`/ PUT statusCode: 200: Product details edited successfully`);
                return res.status(200).json({
                    ok: true,
                    message: 'Product details successfully updated!',
                });
            }
        } catch (error) {
            logger.productLogger.error(`/ PUT statusCode: 500: Edit product details failed: ${ error.details[0].message }`);
            return res.status(500).json({
                ok: false,
                message: error.message,
            });
        }
    }

    // GET A SPECIFIC PRODUCT
    static async findProductById(req, res) {
        try {
            const { id } = req.params;
            const productExist = await product.findOne({
                where: { id },
                include: [{
                    model: user,
                    as: 'user',
                    attributes: ['name', 'email'],
                }, ],
            });
            if (!productExist) {
                logger.productLogger.error('/GET statusCode: 404 :Item not found in database');
                return res.status(404).json({
                    message: 'Product not found!',
                });
            }
            logger.productLogger.info('/GET statusCode: 200 : a product found');
            return res.status(200).json({
                ok: true,
                message: 'Product found!',
                data: productExist,
            });
        } catch (error) {
            logger.productLogger.error(` / GET statusCode: 500: Fetching one product by ID failed: ${error.message }`);
            return res.status(500).json({
                ok: false,
                message: error.message,
            });
        }
    }

    static async getProduct(req, res) {
        const { name, price, categoryIds } = req.body;

        const { errors } = validateProductSearchInput(req.body);

        if (errors) {
            return res.status(400).json({ message: errors.details[0].message });
        }

        const token = req.headers.cookie;

        if (!token) {
            try {
                if (name === null && price === null && categoryIds === null) {
                    const products = await product.findAll({
                        include: {
                            model: user,
                            as: 'user',
                            attributes: ['name'],
                        },
                    });

                    if (products.length <= 0) {
                        res.status(404).json({
                            status: 'None',
                            message: 'no product found',
                        });
                    } else {
                        res.status(200).json({
                            status: 'lIST OF PRODUCTS',
                            message: ` ${products.length} products found`,
                            data: products,
                        });
                    }
                } else {
                    const products = await product.findAll({
                        where: {
                            [Op.or]: [{
                                    name: {
                                        [Op.like]: `%${name}%`,
                                    },
                                },
                                { categoryId: categoryIds },
                                { price },
                            ],
                        },
                    });

                    if (products.length <= 0) {
                        res.status(404).json({
                            status: 'None',
                            message: 'no product found',
                        });
                    } else {
                        res.status(200).json({
                            status: 'lIST OF PRODUCTS',
                            message: ` ${products.length} products found`,
                            data: products,
                        });
                    }
                }
            } catch (error) {
                res
                    .status(500)
                    .json({ status: 'Getting product failure', message: error.message });
            }
        } else {
            try {
                if (name === null && price === null && categoryIds === null) {
                    const products = await product.findAll({ where: { userId: req.id } });

                    if (products.length <= 0) {
                        res.status(404).json({
                            status: 'None',
                            message: 'no product found',
                        });
                    } else {
                        res.status(200).json({
                            status: 'lIST OF PRODUCTS',
                            message: ` ${products.length} products found`,
                            data: products,
                        });
                    }
                } else {
                    const products = await product.findAll({
                        where: {
                            userId: req.id,
                            [Op.or]: [{
                                    name: {
                                        [Op.like]: `%${name}%`,
                                    },
                                },
                                { categoryId: categoryIds },
                                { price },
                            ],
                        },
                    });

                    if (products.length <= 0) {
                        res.status(404).json({
                            status: 'None',
                            message: 'no product found',
                        });
                    } else {
                        res.status(200).json({
                            status: 'lIST OF PRODUCTS',
                            message: ` ${products.length} products found`,
                            data: products,
                        });
                    }
                }
            } catch (error) {
                res
                    .status(500)
                    .json({ status: 'Getting product failure', message: error });
            }
        }
    }
}

export default ProductController;
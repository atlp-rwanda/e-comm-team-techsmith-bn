import dotenv from 'dotenv';
import db from '../../database/models/index.js';
import validateProductInput from '../utils/productValidation.js';
import getExpiryDateAndId from '../utils/getIdAndDate.js';
import validateProductSearchInput from '../utils/productSearch.js';

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'ds04ivdrj',
  secure: true,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// UPLOAD OPTIONS

const Sequelize = require('sequelize');

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
      const imageUploads = await Promise.all(
        image.map(async (file, index) => {
          try {
            const result = await cloudinary.uploader.upload(file, {
              folder: 'ecommerce-product-uploads/products',
              public_id: `${name}_${index}_${Date.now()}`,
              use_filename: true,
              unique_filename: false,
              resource_type: 'image',
              max_bytes: 10000000, // 10MB
              allowed_formats: ['jpeg', 'png', 'jpg', 'webp'],
            });
            return result.url;
          } catch (error) {
            return res.status(400).json({
              message: error.messsage,
            });
          }
        })
      );
      const duplicateProduct = await product.findOne({
        where: { name, userId: id },
      });
      const { error } = validateProductInput(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      if (duplicateProduct) {
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
        image: imageUploads,
        condition,
        include: {
          model: user,
          as: 'user',
          attributes: ['name', 'email'],
        },
        isAvailable: true,
      });
      return res.status(201).json({
        ok: true,
        message: 'Product created successfully',
        data: newProduct,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async findAllproducts(req, res) {
    try {
      const products = await product.findAll({
        include: {
          model: user,
          as: 'user',
          attributes: ['name', 'email'],
        },
      });
      if (products.length <= 0) {
        return res.status(200).json({
          ok: false,
          message: 'You have no product in your collection',
        });
      }
      return res.status(200).json({
        ok: true,
        message: ` ${products.length} products found`,
        data: products,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'Getting product failure',
        message: error.message,
      });
    }
  }

  // A SELLER SEE ALL HIS PRODUCTS
  static async myCollectionProducts(req, res) {
    try {
      const { id } = res.locals;
      const products = await product.findAll({
        where: { userId: id },
        include: [
          {
            model: user,
            as: 'user',
            attributes: ['name'],
          },
        ],
      });
      if (products.length <= 0) {
        return res.status(200).json({
          ok: false,
          message: 'You have no product in your collection',
        });
      }
      return res.status(200).json({
        ok: true,
        message: ` ${products.length} products found`,
        data: products,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'Getting product failed',
        message: error.message,
      });
    }
  }

  // USER CAN GET ALL AVAILABLE PRODUCTS
  static async allAvailableProducts(req, res) {
    try {
      const availableProducts = await product.findAll({
        where: { isAvailable: true },
        include: [
          {
            model: user,
            as: 'user',
            attributes: ['name'],
          },
        ],
      });
      if (availableProducts < 1) {
        return res.status(200).json({
          message: 'All products are sold',
        });
      }
      return res.status(200).json({
        ok: true,
        message: 'Available products in the stock',
        data: availableProducts,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
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
        return res.status(200).json({
          status: `successfully retrived product of id ${id}`,
          message: availableProduct,
        });
      }
      return res.status(404).json({
        status: 'fail',
        message: `The product with this id ${id} doesn't exist`,
      });
    } catch (error) {
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
        return res.status(200).json({
          message: 'All products are sold',
        });
      }
      return res.status(200).json({
        ok: true,
        message: 'Available products in your collection:',
        data: availableProducts,
      });
    } catch (error) {
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

        console.log(`Email sent successfully to ${foundUser.email}`);
      });
      /* eslint-disable */
            for (let i = 0; i < expiredProducts.length; i++) {
                await product.update({ isAvailable: false }, { where: { id: expiredProducts[i].id } });
            }
            return res.status(200).json({
                ok: true,
                message: 'Product expiration check completed',
                exprired_Products: expiredProducts,
            });
        } catch (error) {
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
                    id: pId
                }

            });

            const dataValues = fetchMyProducts[0].dataValues;
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
                isAvailable: dataValues.isAvailable
            }

            const myProducts = fetchMyProducts.map(({ id }) => ({
                id: parseInt(id),
                userId: loggedInUserId,
                retrivedProduct,


            }));

            // CHECKING IF loggedInUser OWN A PRODUCT
            const productExist = myProducts.some((e) => e.id == pId);

            if (productExist) {
                const getProduct = await product.findOne({ where: { id: pId, isAvailable: true } });
                if (getProduct) {
                    return res.status(200).json({
                        message: 'Product successfully retrieved',
                        data: myProducts,
                    });
                }
                return res.status(404).json({
                    message: ' Product is not available',
                });

            } else {
                return res.status(404).json({
                    message: "The product doesn't exists in your collection!",
                });

            }



        } catch (error) {
            return res.status(500).json({ message: " The product doesn't exists in your collection!" });
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
                return res.status(404).json({
                    message: "The product doesn't exists in your collection!",
                });
            }
            // DELETING THE PRODUCT
            const deleteProduct = await product.destroy({ where: { id: pId } });

            // CHECK IF PRODUCT IS DELETED
            if (deleteProduct) {
                return res.status(200).json({
                    ok: true,
                    message: 'Product successfully deleted',
                });
            }
            return res.status(400).json({
                ok: false,
                message: 'Not deleted!',
            });
        } catch (error) {
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
                return res.status(404).json({
                    message: "The product doesn't exists in your collection!",
                });
            }
            // CHECK IF LOGGED IN USER OWNS THE PRODUCT
            if (productExist.userId !== loggedInUserId) {
                return res.status(401).json({
                    message: 'You are not authorized to edit this product! It belongs to another user',
                });
            };
            //VALIDATE INPUTS
            const { error } = validateProductInput(req.body);
            if (error) {
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
                }
            }, );

            // CHECKING IF UPDATED
            if (updateProduct) {
                return res.status(200).json({
                    ok: true,
                    message: 'Product details successfully updated!',
                });
            }
        } catch (error) {
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
                }]
            });
            if (!productExist) {
                return res.status(404).json({
                    message: 'Product not found!',
                });
            }
            return res.status(200).json({
                ok: true,
                message: 'Product found!',
                data: productExist,
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: error.message,
            });
        }
    };




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
                                        [Op.like]: `%${name}%`
                                    }
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
                                        [Op.like]: `%${name}%`
                                    }
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
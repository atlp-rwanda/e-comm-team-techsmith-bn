import dotenv from 'dotenv';
import db from '../../database/models/index.js';
import validateProductInput from '../utils/productValidation.js';

// CONFIG DOTENV
dotenv.config();

// IMPORT MODEL PRODUCT
const { product, user } = db;
const logger = require('./logger');

class productController {
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
      sellerId,
    } = req.body;
    try {
      const duplicateProduct = await product.findOne({
        where: { name },
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
        userId: sellerId,
        name,
        quantity,
        price,
        categoryId,
        description,
        isAvailable: true,
        expiryDate,
        image,
        condition,
        include: {
          model: user,
          as: 'user',
          attributes: ['name', 'email'],
        },
      });
      logger.productLogger.info(
        '/POST statusCode: 201 : Admin succesfully created product'
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
    try {
      const products = await product.findAll({
        include: {
          model: user,
          as: 'user',
          attributes: ['name', 'email'],
        },
      });
      if (products.length <= 0) {
        logger.productLogger.info(
          '/GET statusCode: 200 : Zero product found in collection'
        );
        return res.status(200).json({
          ok: false,
          message: 'There are no products in the stock',
        });
      }
      logger.productLogger.info(
        '/GET statusCode: 200 : All Products fetched by Admin'
      );
      return res.status(200).json({
        ok: true,
        message: ` ${products.length} products found`,
        data: products,
      });
    } catch (error) {
      logger.productLogger.error(
        `/GET statusCode: 500 : Fetching product by Admin failed : ${error.message}`
      );
      return res.status(500).json({
        status: 'Getting product failure',
        message: error.message,
      });
    }
  }

  // DELETE A SEPCIFIC PRODUCT
  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      // CHECK IF A PRODUCT EXIST IN STOCK
      const productExist = await product.findOne({ where: { id } });

      if (!productExist) {
        logger.productLogger.error(
          '/DELETE statusCode: 404 :Item not found in stock '
        );
        return res.status(404).json({
          message: 'The product no longer exists in the stock!',
        });
      }
      // DELETING THE PRODUCT
      const deleteProduct = await product.destroy({ where: { id } });

      // CHECK IF PRODUCT IS DELETED
      if (deleteProduct) {
        logger.productLogger.info(
          `/DELETE statusCode: 200 : product with id=${id} deleted successful by Admin`
        );
        return res.status(200).json({
          ok: true,
          message: 'Product successfully deleted',
        });
      }
      logger.productLogger.info(
        '/DELETE statusCode: 400 : Wrong input, product not deleted'
      );
      return res.status(400).json({
        ok: false,
        message: 'Not deleted!',
      });
    } catch (error) {
      logger.productLogger.error(
        ` / DELETE statusCode: 500 : Delete a product by Admin failed: ${error.message}`
      );
      return res.status(500).json({ message: error.message });
    }
  }

  static async updateProduct(req, res) {
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
    try {
      // GET PRODUCT ID FROM THE PARAMS
      const { id } = req.params;

      // CHECK IF PRODUCT EXISTS
      const productExist = await product.findOne({ where: { id } });
      if (!productExist) {
        logger.productLogger.error(
          '/PUT statusCode: 404 :Item not found in stock '
        );
        return res.status(404).json({
          message: "The product doesn't exists in your collection!",
        });
      }

      // VALIDATE INPUTS
      const { error } = validateProductInput(req.body);
      if (error) {
        logger.productLogger
          .error(` / PUT statusCode: 400: validation failed: $ { error.details[0].message }
                            `);
        return res.status(400).json({ message: error.details[0].message });
      }
      // IF INPUTS ARE VALIDATED, UPDATE PRODUCT
      const updateProduct = await product.update(
        {
          name,
          quantity,
          price,
          categoryId,
          image,
          description,
          expiryDate,
          condition,
        },
        {
          where: { id },
          returning: true,
          include: {
            model: user,
            as: 'user',
            attributes: ['name', 'email'],
          },
        }
      );

      // CHECKING IF UPDATED
      if (updateProduct) {
        logger.productLogger.error(
          ` / PUT statusCode: 200: Product details with id=${id} edited successfully by Admin `
        );
        return res.status(200).json({
          ok: true,
          message: 'Product details successfully updated!',
        });
      }
    } catch (error) {
      logger.productLogger.error(
        ` / PUT statusCode: 500: Edit product details failed: ${error.details[0].message} `
      );
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
        include: [
          {
            model: user,
            as: 'user',
            attributes: ['name', 'email'],
          },
        ],
      });
      if (!productExist) {
        logger.productLogger.error(
          '/GET statusCode: 404 :Item not found in database'
        );
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
      logger.productLogger
        .error(` / GET statusCode: 500: Fetching one product by ID failed: $ { error.message }
                            `);
      return res.status(500).json({
        ok: false,
        message: error.message,
      });
    }
  }
}

export default productController;

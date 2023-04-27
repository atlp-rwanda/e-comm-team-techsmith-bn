import dotenv from 'dotenv';
import db from '../../database/models/index.js';
import validateProductInput from '../utils/productValidation.js';

// CONFIG DOTENV
dotenv.config();

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'ds04ivdrj',
  secure: true,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// IMPORT MODEL PRODUCT
const { product, user } = db;
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
      const imageUploads = await Promise.all(
        image.map(async (file, index) => {
          try {
            const result = await cloudinary.uploader.upload(file, {
              folder: 'ecommerce-product-uploads/products',
              public_id: `${name}_${index}_${Date.now()}`,
              use_filename: true,
              unique_filename: false,
              resource_type: 'image',
              max_bytes: 10000000, // 10MB MAXIMUM
              allowed_formats: ['jpeg', 'png', 'jpg', 'webp'],
            });
            return result.url;
          } catch (error) {
            return res.status(400).json({ message: error.message });
          }
        })
      );

      const duplicateProduct = await product.findOne({
        where: { name },
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
        userId: sellerId,
        name,
        quantity,
        price,
        categoryId,
        description,
        isAvailable: true,
        expiryDate,
        image: imageUploads,
        condition,
        include: {
          model: user,
          as: 'user',
          attributes: ['name', 'email'],
        },
      });
      return res.status(201).json({
        ok: true,
        message: 'Product created successfully',
        data: newProduct,
      });
    } catch (error) {
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
        return res.status(200).json({
          ok: false,
          message: 'There are no products in the stock',
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

  // DELETE A SEPCIFIC PRODUCT
  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      // CHECK IF A PRODUCT EXIST IN STOCK
      const productExist = await product.findOne({ where: { id } });

      if (!productExist) {
        return res.status(404).json({
          message: 'The product no longer exists in the stock!',
        });
      }
      // DELETING THE PRODUCT
      const deleteProduct = await product.destroy({ where: { id } });

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
        return res.status(404).json({
          message: "The product doesn't exists in your collection!",
        });
      }
      const imageUploads = await Promise.all(
        image.map(async (file, index) => {
          try {
            const result = await cloudinary.uploader.upload(file, {
              folder: 'ecommerce-product-uploads/products',
              public_id: `${name}_${index}_${Date.now()}`,
              use_filename: true,
              unique_filename: false,
              resource_type: 'image',
              max_bytes: 10000000, // 10MB MAXIMUM
              allowed_formats: ['jpeg', 'png', 'jpg', 'webp'],
            });
            return result.url;
          } catch (error) {
            return res.status(400).json({ message: error.message });
          }
        })
      );
      // VALIDATE INPUTS
      const { error } = validateProductInput(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      // IF INPUTS ARE VALIDATED, UPDATE PRODUCT
      const updateProduct = await product.update(
        {
          name,
          quantity,
          price,
          categoryId,
          image: imageUploads,
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
        include: [
          {
            model: user,
            as: 'user',
            attributes: ['name', 'email'],
          },
        ],
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
  }
}

export default productController;

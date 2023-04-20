import dotenv from 'dotenv';
import db from '../../database/models/index.js';
import validateProductInput from '../utils/productValidation.js';
import getExpiryDateAndId from '../utils/getIdAndDate.js';
import { productIsExpired, sendEmail } from '../utils/emails.js';

// CONFIG DOTENV
dotenv.config();

// IMPORT MODEL PRODUCT
const { product, user } = db;

class ProductController {
    static async addProduct(req, res) {
        const {
            name,
            price,
            categoryId,
            image,
            description,
            expiryDate,
            condition,
        } = req.body;
        const { id } = res.locals;

        try {
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
                price,
                categoryId,
                description,
                isAvailable: true,
                expiryDate,
                image,
                condition,
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
            const products = await product.findAll();
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
            const products = await product.findAll({ where: { userId: id } });
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

    // USER CAN GET ALL AVAILABLE PRODUCTS
    static async allAvailableProducts(req, res) {
        try {
            const availableProducts = await product.findAll({
                where: { isAvailable: true },
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

    // A  SELLER CAN SEE AVAILABLE PRODUCTS IN HIS COOOLECTION
    static async availableProducts(req, res) {
        const { id } = res.locals;
        try {
            const availableProducts = await product.findAll({
                where: { isAvailable: true, userId: id },
            });
            if (availableProducts < 1) {
                return res.status(409).json({
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
            /* eslint-disable */
            const expiredProducts = getExpiryDateAndId(products).filter(
                (product) => {
                    return new Date(product.expiryDate) < new Date(currentDate)
                }

            );
            expiredProducts.forEach(async(p) => {
                // console.log(p)
                const foundUser = await user.findOne({ where: { id: p.userId } })
                    // console.log(foundUser)
                    // sellersToNofify.push(foundUser)
                await sendEmail(
                    foundUser.email,
                    foundUser.name,
                    'Expired Product',
                    productIsExpired,
                    p.name
                );
                console.log("email sent successfully to " + foundUser.email)


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
}
export default ProductController;
const express = require('express');
const { getAllProducts, createProduct } = require('../controllers/product.controller');


const { body } = require('express-validator');

const router = express.Router();

router.get("/products", getAllProducts);

router.post("/products",[
    body('name').isLength({ min: 3 }).withMessage('اسم المستخدم يجب أن يكون 3 أحرف على الأقل'),
    body('imageUrl').isLength({ min: 6 }).withMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
], createProduct );
module.exports = router;





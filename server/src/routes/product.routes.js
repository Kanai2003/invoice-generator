import { Router } from 'express';
// import {
//     addProduct,
//     getAllProducts,
// } from '../controllers/product.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { createInvoicePDF } from '../controllers/pdfGenerator.contorller.js';

const router = Router();

router.use(verifyJWT)

// router.post('/add', addProduct);
// router.get('/all', getAllProducts);
router.post('/invoice', createInvoicePDF);

export default router;
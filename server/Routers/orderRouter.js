import express from 'express';
const router = express.Router();

import {
  createOrder
} from '../Controllers/orderController.js';

router.post('/create', createOrder);

export default router;

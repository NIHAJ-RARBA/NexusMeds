import express from 'express';
const router = express.Router();

import {
  createOrder,
  getOrdersWithPrescriptionNotNull,
  getOrders,
  setOrderStatus,
  deleteOrder
} from '../Controllers/orderController.js';

router.post('/create', createOrder);
router.get('/getOrdersWithPrescriptionNotNull', getOrdersWithPrescriptionNotNull);
router.get('/getAll', getOrders);
router.post('/setStatus', setOrderStatus);
router.post('/delete', deleteOrder);

export default router;

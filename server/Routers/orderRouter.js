import express from 'express';
const router = express.Router();

import {
  createOrder,
  getOrdersWithPrescriptionNotNull,
  getOrders,
  setOrderStatus,
  deleteOrder,
  delayOrder,
  getOrderById,
  checkOrderIfCustomerOrder
} from '../Controllers/orderController.js';

router.post('/create', createOrder);
router.get('/getOrdersWithPrescriptionNotNull', getOrdersWithPrescriptionNotNull);
router.get('/getAll', getOrders);
router.post('/setStatus', setOrderStatus);
router.post('/delete', deleteOrder);
router.post('/delay', delayOrder);
router.post('/getOrderById', getOrderById);
router.post('/checkOrderIfCustomerOrder', checkOrderIfCustomerOrder);

export default router;

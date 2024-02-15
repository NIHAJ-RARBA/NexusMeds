import express from 'express';
const router = express.Router();

import {
  addToCart,
  removeFromCart,
  deleteCart,
  getCart
} from '../Controllers/cartController.js';

router.post('/add', addToCart);
router.post('/remove', removeFromCart);
router.delete('/delete', deleteCart);
router.get('/get', getCart);

export default router;

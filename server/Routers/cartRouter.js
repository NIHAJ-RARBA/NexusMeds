import express from 'express';
const router = express.Router();

import {
  addToCart,
  removeFromCart,
  deleteCart,
  getCart,
  setCartStatusTrue
} from '../Controllers/cartController.js';

router.post('/add', addToCart);
router.post('/remove', removeFromCart);
router.delete('/delete', deleteCart);
router.post('/get', getCart);
router.post('/setstatus', setCartStatusTrue);

export default router;

import express from 'express';
const router = express.Router();

import {
  addToCart,
  removeFromCart,
  deleteCart,
  getCart,
  setCartStatusTrue,
  getCartOnId,
  get_Big_CART_By_CartId
} from '../Controllers/cartController.js';

router.post('/add', addToCart);
router.post('/remove', removeFromCart);
router.delete('/delete', deleteCart);
router.post('/get', getCart);
router.post('/setstatus', setCartStatusTrue);
router.post('/get-cart-id', getCartOnId);
router.post('/get-big-cart', get_Big_CART_By_CartId);

export default router;

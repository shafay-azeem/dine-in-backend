const express = require("express");
const {
  addToCart,
  getAllCarts,
  deleteCart,
  getCartByTableNumber,
  cartIncrementDecrement,
  deleteCartItem,
} = require("../controller/CartController");

const router = express.Router();

//Cart
router.route("/addToCart/:tableNumber").post(addToCart);
router.route("/getAllCarts").get(getAllCarts);
router.route("/getCartByTableNumber/:tableNumber").get(getCartByTableNumber);
router.route("/deleteCartById/:id").delete(deleteCart);
router.route("/cartIncrementDecrement/:cartDocId").get(cartIncrementDecrement);
router.route("/deleteCartItem/:cartDocId").delete(deleteCartItem);

module.exports = router;

const asyncHandler = require("express-async-handler");
const Cart = require("../models/CartModel");

//Add To Cart ---Post
exports.addToCart = asyncHandler(async (req, res, next) => {
  try {
    const { item_Id, item_Name, item_Price, item_Img } = req.body;
    let { item_Qty } = req.body;
    item_Qty = parseInt(item_Qty);
    const tableNumber = parseInt(req.params.tableNumber);

    const cart = await Cart.findOne({ tableNumber });
    if (!cart) {
      const itemPrice_Total = item_Qty * item_Price;
      const cartItem = {
        item_Id,
        item_Name,
        item_Price,
        item_Qty,
        itemPrice_Total,
        item_Img,
      };
      const newCart = new Cart({
        cartItems: [cartItem],
        total_Price: itemPrice_Total,
        tableNumber,
      });
      await newCart.save();
      res.status(200).json(newCart);
    } else {
      let itemExists = false;
      for (let i = 0; i < cart.cartItems.length; i++) {
        if (cart.cartItems[i].item_Id.toString() === item_Id) {
          cart.cartItems[i].item_Qty += item_Qty;
          cart.cartItems[i].itemPrice_Total =
            cart.cartItems[i].item_Qty * cart.cartItems[i].item_Price;
          itemExists = true;
          break;
        }
      }

      if (!itemExists) {
        const itemPrice_Total = item_Qty * item_Price;
        const cartItem = {
          item_Id,
          item_Name,
          item_Price,
          item_Qty,
          itemPrice_Total,
          item_Img,
        };
        cart.cartItems.push(cartItem);
      }

      cart.total_Price = cart.cartItems.reduce(
        (acc, cur) => acc + cur.itemPrice_Total,
        0
      );

      await cart.save();

      res.status(200).json(cart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});
//Get All Carts ---Get
exports.getAllCarts = asyncHandler(async (req, res, next) => {
  try {
    const cart = await Cart.find();
    res.status(200).json({
      success: true,
      cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

//get Cart By Table NUmber
exports.getCartByTableNumber = asyncHandler(async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ tableNumber: req.params.tableNumber });
    res.status(200).json({
      success: true,
      cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

//Delete Cart By Cart Id
exports.deleteCart = asyncHandler(async (req, res, next) => {
  try {
    let cart = await Cart.findById(req.params.id);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found with this Id",
      });
    }

    await cart.remove();

    res.status(200).json({
      success: true,
      message: "Cart deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//Delete Cart Item


//Delete Cart By Cart Id
exports.deleteCartItem = asyncHandler(async (req, res, next) => {
  const cartDocId = req.params.cartDocId;
  const cartId = req.query.cartId;
  try {
    let cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found with this Id",
      });
    }
    await cart.cartItems.pull({ _id: cartDocId });
    await cart.save()

    res.status(200).json({
      success: true,
      message: "Cart Item deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});


exports.cartIncrementDecrement = async (req, res, next) => {
  const cartDocId = req.params.cartDocId;
  const cartId = req.query.cartId;
  const cartStatus = req.query.status;


  let cart = await Cart.findById(cartId);
  const cartItem = cart.cartItems.find(item => item._id == cartDocId);

  if (!cartItem) {
    return res.status(404).json({
      message: "Cart item not found"
    });
  }

  let itemQty = cartItem.item_Qty;
  let itemPrice = cartItem.item_Price;
  let itemTotalPrice = itemQty * itemPrice;

  if (cartStatus == "increment") {
    itemQty += 1;
  } else {
    itemQty -= 1;
  }

  itemTotalPrice = itemQty * itemPrice;

  cartItem.item_Qty = itemQty;
  cartItem.itemPrice_Total = itemTotalPrice;

  cart.total_Price = cart.cartItems.reduce(
    (acc, cur) => acc + cur.itemPrice_Total,
    0
  );

  cart = await cart.save();

  res.json({
    message: "Cart item updated successfully",
  });
}
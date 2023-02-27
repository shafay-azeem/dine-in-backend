const asyncHandler = require("express-async-handler");
const Cart = require("../models/CartModel");

exports.addToCart = asyncHandler(async (req, res, next) => {
  try {
    const { item_Id, item_Name, item_Price, item_Img, item_Size } = req.body;
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
        item_Size,
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
        if (
          cart.cartItems[i].item_Id.toString() === item_Id &&
          cart.cartItems[i].item_Size === item_Size
        ) {
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
          item_Size,
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




//--------------------------------------------------

exports.addModifiertoCartItem = asyncHandler(async (req, res, next) => {
  const tableNumber = parseInt(req.params.tableNumber);
  const itemId = req.query.itemId;
  const item_Size = req.query.item_Size
  const cart = await Cart.findOne({ tableNumber });
  if (!cart) {
    res.status(404).json({ message: "First Add Cart then add modifier" });
  }

  const cartItem = cart.cartItems.find((item) => item.item_Id.toString() === itemId.toString() && item.item_Size === item_Size);

  let isModifierNameMatched = false;
  for (const modifier of cartItem.Modifier) {
    if (modifier.Modifier_Name === req.body.Modifier_Name) {
      isModifierNameMatched = true;
      break;
    }
  }
  if (isModifierNameMatched) {
    for (let i = 0; i < cartItem.Modifier.length; i++) {
      if (cartItem.Modifier[i].Modifier_Name === req.body.Modifier_Name) {
        cartItem.Modifier[i].Modifier_Qty += req.body.Modifier_Qty;
        cartItem.itemPrice_Total = cartItem.item_Qty * cartItem.item_Price;
        cartItem.Modifier.forEach((modifier) => {
          cartItem.itemPrice_Total += modifier.Modifier_Price * modifier.Modifier_Qty;
        });
        break;
      }
    }
  } else {
    console.log('inside else')
    cartItem.Modifier.push(req.body);
    cartItem.itemPrice_Total = cartItem.item_Price * cartItem.item_Qty;
    cartItem.Modifier.forEach((modifier) => {
      cartItem.itemPrice_Total += modifier.Modifier_Price * modifier.Modifier_Qty;
    });
  }
  cart.total_Price = cart.cartItems.reduce(
    (acc, cur) => acc + cur.itemPrice_Total,
    0
  );
  await cart.save();

  res.status(200).json({ cartItem: cartItem });
});


//--------------------

exports.modifierIncrementDecrement = async (req, res, next) => {
  const cartDocId = req.params.cartDocId;
  const cartId = req.query.cartId;
  const modifierId = req.query.modifierId
  const cartStatus = req.query.cartStatus || "decrement";
  const itemSize = req.query.itemSize;
  let cart = await Cart.findById(cartId);


  const cartItem = cart.cartItems.find(
    (item) => item._id == cartDocId && item.item_Size === itemSize
  );
  if (!cartItem) {
    return res.status(404).json({
      message: "Cart item not found",
    });
  }

  const ModifierItem = cartItem.Modifier.find(
    (modifier) => modifier._id == modifierId)

  let Modifier_Qty = ModifierItem.Modifier_Qty;
  let itemTotalPrice = cartItem.item_Price * cartItem.item_Qty
  if (cartStatus == "increment") {
    Modifier_Qty += 1;
  } else {
    Modifier_Qty -= 1;
  }
  ModifierItem.Modifier_Qty = Modifier_Qty
  cartItem.Modifier.forEach((modifier) => {
    itemTotalPrice += modifier.Modifier_Price * modifier.Modifier_Qty;
  });
  cartItem.itemPrice_Total = itemTotalPrice;
  cart.total_Price = cart.cartItems.reduce(
    (acc, cur) => acc + cur.itemPrice_Total,
    0
  );
  cart = await cart.save();
  res.json({
    message: "Cart item updated successfully",
  });
};

//------------------------------------
//Delete modifierId By Cart Id
exports.deleteModifierById = asyncHandler(async (req, res, next) => {
  const cartDocId = req.params.cartDocId;
  const cartId = req.query.cartId;
  const modifierId = req.query.modifierId

  try {
    let cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found with this Id",
      });
    }

    let cartItem = await cart.cartItems((cartItem) => cartItem._id == cartDocId)
    await cartItem.Modifier.pull({ _id: modifierId });

    cart.total_Price = cart.cartItems.reduce(
      (acc, cur) => acc + cur.itemPrice_Total,
      0
    );

    await cart.save();

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

    cart.total_Price = cart.cartItems.reduce(
      (acc, cur) => acc + cur.itemPrice_Total,
      0
    );

    await cart.save();

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
  const cartStatus = req.query.cartStatus || "decrement";
  const itemSize = req.query.itemSize;
  let cart = await Cart.findById(cartId);
  const cartItem = cart.cartItems.find(
    (item) => item._id == cartDocId && item.item_Size === itemSize
  );
  if (!cartItem) {
    return res.status(404).json({
      message: "Cart item not found",
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
};

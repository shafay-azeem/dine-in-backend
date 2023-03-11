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
      res.status(201).json({
        success: true,
        message: "Cart Get Successfully",
        cart
      });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});




//--------------------------------------------------

exports.addModifiertoCartItem = asyncHandler(async (req, res, next) => {

  try {
    const tableNumber = parseInt(req.params.tableNumber);
    const itemId = req.query.itemId;
    const item_Size = req.query.item_Size.toLowerCase()
    const cart = await Cart.findOne({ tableNumber });
    if (!cart) {
      const error = new Error('First Add Cart then add modifier')
      error.statusCode = 404
      throw error
    }
    const cartItem = cart.cartItems.find((item) => item.item_Id.toString() === itemId.toString() && item.item_Size === item_Size);
    if (!cartItem) {
      const error = new Error('Please Select Appropriate Size Acc to Item')
      error.statusCode = 404
      throw error
    }
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

    res.status(201).json({
      success: true,
      message: "Modifier Added Successfully",
      cartItem: cartItem
    });

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }

});


//--------------------

exports.modifierIncrementDecrement = async (req, res, next) => {
  try {
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
      const error = new Error('Cart item not found')
      error.statusCode = 404
      throw error
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
    res.status(201).json({
      success: true,
      message: "Cart item updated successfully",
    });

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }

};

//------------------------------------
//Delete modifierId By Cart Id
exports.deleteModifierById = asyncHandler(async (req, res, next) => {


  try {
    const cartDocId = req.params.cartDocId;
    const cartId = req.query.cartId;
    const modifierId = req.query.modifierId
    let cart = await Cart.findById(cartId);
    if (!cart) {
      const error = new Error('Cart not found with this Id')
      error.statusCode = 404
      throw error
    }


    const cartItem = cart.cartItems.find(
      (item) => item._id == cartDocId
    );
    let itemTotalPrice = cartItem.item_Price * cartItem.item_Qty
    await cartItem.Modifier.pull({ _id: modifierId });
    cartItem.Modifier.forEach((modifier) => {
      itemTotalPrice += modifier.Modifier_Price * modifier.Modifier_Qty;
    });
    cartItem.itemPrice_Total = itemTotalPrice;
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
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});



//Get All Carts ---Get
exports.getAllCarts = asyncHandler(async (req, res, next) => {
  try {
    const cart = await Cart.find();
    if (!cart) {
      const error = new Error('Cart Not Found')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

//get Cart By Table NUmber
exports.getCartByTableNumber = asyncHandler(async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ tableNumber: req.params.tableNumber });
    if (!cart) {
      const error = new Error('Cart Not Found')
      error.statusCode = 404
      throw error
    }
    let cartLength = cart.cartItems?.length
    res.status(200).json({
      success: true,
      cart,
      cartLength

    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

//Delete Cart By Cart Id
exports.deleteCart = asyncHandler(async (req, res, next) => {
  try {
    let cart = await Cart.findById(req.params.id);

    if (!cart) {
      const error = new Error('Cart Not Found')
      error.statusCode = 404
      throw error
    }

    await cart.remove();

    res.status(200).json({
      success: true,
      message: "Cart deleted successfully",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

//Delete Cart Item

//Delete Cart By Cart Id
exports.deleteCartItem = asyncHandler(async (req, res, next) => {

  try {
    const cartDocId = req.params.cartDocId;
    const cartId = req.query.cartId;
    let cart = await Cart.findById(cartId);
    if (!cart) {
      const error = new Error('Cart Not Found')
      error.statusCode = 404
      throw error
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
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

exports.cartIncrementDecrement = async (req, res, next) => {

  try {
    const cartDocId = req.params.cartDocId;
    const cartId = req.query.cartId;
    const cartStatus = req.query.cartStatus || "decrement";
    const itemSize = req.query.itemSize;
    let cart = await Cart.findById(cartId);
    if (!cart) {
      const error = new Error('Cart Not Found')
      error.statusCode = 404
      throw error
    }
    const cartItem = cart.cartItems.find(
      (item) => item._id == cartDocId && item.item_Size === itemSize
    );
    if (!cartItem) {
      const error = new Error('Cart item Not Found')
      error.statusCode = 404
      throw error
    }

    let itemQty = cartItem.item_Qty;
    let itemPrice = cartItem.item_Price;
    let itemTotalPrice = itemQty * itemPrice;
    cartItem.Modifier.forEach((modifier) => {
      itemTotalPrice += modifier.Modifier_Price * modifier.Modifier_Qty;
    });
    if (cartStatus == "increment") {
      itemQty += 1;
    } else {
      itemQty -= 1;
    }
    itemTotalPrice = itemQty * itemPrice;
    cartItem.Modifier.forEach((modifier) => {
      itemTotalPrice += modifier.Modifier_Price * modifier.Modifier_Qty;
    });
    cartItem.item_Qty = itemQty;
    cartItem.itemPrice_Total = itemTotalPrice;
    cart.total_Price = cart.cartItems.reduce(
      (acc, cur) => acc + cur.itemPrice_Total,
      0
    );
    cart = await cart.save();
    res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
    });

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};


exports.getCartLength = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ tableNumber: req.params.tableNumber });
    if (!cart) {
      const error = new Error('Cart Not Found')
      error.statusCode = 404
      throw error
    }
    let cartLength = cart.cartItems?.length
    res.status(200).json({
      success: true,
      cartLength
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

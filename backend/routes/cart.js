const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");
//add to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookInCart = userData.cart.includes(bookid);
    if (isBookInCart) {
      return res.json({
        status: "success",
        message: "Book is already in cart",
      });
    }
    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
    return res
      .status(200)
      .json({ status: "success", message: "Book added to cart" });
  } catch (error) {
    return res.status(500).json({ message: "An Error Occurred" });
  }
});

//remove book from cart
router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;
    await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
    return res.status(200).json({ message: "Book removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//get cart of particular user
router.get("/get-user-cart", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    const userData = await User.findById(id).populate("cart");

    const Cart = userData.cart.reverse();
    return res.json({ status: "Success", data: Cart });
  } catch (error) {
    // console.log(error)
    return res.status(500).json({ message: "An Error Occurred" });
  }
});
module.exports = router;

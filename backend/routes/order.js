const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const Order = require("../models/order");
const { authenticateToken } = require("./userAuth");
//place order
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body; // order is an array
    const orderIds = [];

    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();
      orderIds.push(orderDataFromDb._id);

      // saving order in user model
      await User.findByIdAndUpdate(
        id,
        { $push: { orders: orderDataFromDb._id } },
        { new: true }
      );
    }

    // clearing cart
    const cartItemIds = order.map((orderData) => orderData._id);
    await User.findByIdAndUpdate(
      id,
      { $pull: { cart: { $in: cartItemIds } } },
      { new: true }
    );

    return res.json({
      status: "Success",
      message: "Order Placed Successfully",
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ message: "An Error Occurred" });
  }
});

//get order history of user
router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });
    const orderData = userData.orders.reverse();
    return res.json({
      status: "success",
      data: orderData,
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});
//get all orders --admin
router.get("/get-all-orders", authenticateToken, async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({ path: "book" })
      .populate({ path: "user" })
      .sort({ createdAt: -1 });
    return res.json({ status: "success", data: userData });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});
//update order status -- admin
router.put("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: id },
      { status: status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.json({
      status: "Success",
      message: "Status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating status:", error); // Log the error for debugging
    return res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;

const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");
//add book to favourite
router.put("/add-book-to-fav", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookFav = userData.favourites.includes(bookid);
    if (isBookFav) {
      return res.status(200).json({ message: "Book is already in fav" });
    }
    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
    return res.status(200).json({ message: "Book added to fav" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//delete book from favourite
router.delete("/delete-book-from-fav", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookFav = userData.favourites.includes(bookid);
    if (isBookFav) {
      await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
    }

    return res.status(200).json({ message: "Book removed from fav" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//get fav books user
router.get("/get-fav-books", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("favourites");
    const favouriteBooks = userData.favourites;
    return res.json({ status: "Success", data: favouriteBooks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An Error Occurred" });
  }
});
module.exports = router;

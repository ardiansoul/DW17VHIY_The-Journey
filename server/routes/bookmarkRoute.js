const router = require("express").Router();
const {
  getBookmark,
  postBookmark,
  deleteBookmark,
} = require("../controllers/bookmarkController");
const { authenticated } = require("../middlewares/auth");

router.get("/bookmark/:userId", authenticated, getBookmark);
router.post("/bookmark", authenticated, postBookmark);
router.delete("/bookmark/:id", authenticated, deleteBookmark);

module.exports = router;

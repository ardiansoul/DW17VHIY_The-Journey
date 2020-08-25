const router = require("express").Router();
const {
  getBookmark,
  postBookmark,
} = require("../controllers/bookmarkController");
const { authenticated } = require("../middlewares/auth");

router.get("/bookmark/:userId", authenticated, getBookmark);
router.post("/bookmark", authenticated, postBookmark);

module.exports = router;

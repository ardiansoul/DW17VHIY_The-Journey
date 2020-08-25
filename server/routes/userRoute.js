const router = require("express").Router();
const {
  getUser,
  getUserJourney,
  login,
  register,
} = require("../controllers/userController");
const { authenticated } = require("../middlewares/auth");

router.get("/profile/:id", authenticated, getUser);
router.get("/profile/:id/journey", authenticated, getUserJourney);
router.post("/login", login);
router.post("/register", register);

module.exports = router;

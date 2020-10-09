const router = require("express").Router();
const {
  getUser,
  getUserJourney,
  login,
  register,
  // updateUser,
} = require("../controllers/userController");
const { authenticated } = require("../middlewares/auth");

const multiParty = require("connect-multiparty");

// const multipartyMiddleware = multiParty({
//   uploadDir: "/public/images",
// });

router.get("/profile/:id", authenticated, getUser);
router.get("/profile/:id/journey", authenticated, getUserJourney);
// router.patch(
//   "/profile/:id",
//   multipartyMiddleware,
//   authenticated,
//   (req, res) => {
//     console.log(req.body, req.files);
//   }
// );
router.post("/login", login);
router.post("/register", register);

module.exports = router;

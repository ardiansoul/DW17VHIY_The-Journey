const {
  getJourney,
  postJourney,
  getAllJourney,
} = require("../controllers/journeyController");
const { authenticated } = require("../middlewares/auth");
// const { multipartyMiddleware } = require("../middlewares/imageUpload");

const router = require("express").Router();

router.get("/journey", getAllJourney);
router.get("/journey/:id", getJourney);
router.post("/journey", authenticated, postJourney);

module.exports = router;

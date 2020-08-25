const { Bookmark, Journey, User } = require("../models");
const { bookmarkValidator } = require("../middlewares/validation");

exports.getBookmark = async (req, res) => {
  const id = req.params.userId;
  try {
    const data = await Bookmark.findAll({
      where: {
        userId: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Journey,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: User,
              attributes: {
                exclude: ["password", "createdAt", "updatedAt"],
              },
            },
          ],
        },
      ],
    });

    res.status(200).send({
      message: "Bookmark successfully loaded",
      data,
    });
  } catch (err) {
    res.status(500).send(
      {
        message: "Bookmark cannot loaded",
        error: err,
      },
      err
    );
  }
};
exports.postBookmark = async (req, res) => {
  try {
    const { error } = bookmarkValidator(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const bookmarkExist = await Bookmark.findOne({
      where: { userId: req.body.userId, journeyId: req.body.journeyId },
    });

    if (bookmarkExist)
      return res.status(400).send({
        message: "bookmark already exists",
      });
    const data = await Bookmark.create({
      userId: req.body.userId,
      journeyId: req.body.journeyId,
    });

    res.status(201).send({
      message: "Bookmark has been created",
      data,
    });
  } catch (err) {
    res.status(500).send(
      {
        message: "server error",
        error: err,
      },
      err
    );
    // console.log(err);
  }
};

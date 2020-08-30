const { User, Journey } = require("../models");
const { journeyValidator } = require("../middlewares/validation");

exports.getAllJourney = async (req, res) => {
  try {
    const data = await Journey.findAll({
      order: [["updatedAt", "DESC"]],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: User,
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      message: "Journey successfully loaded",
      data,
    });
  } catch (err) {
    res.status(500).send(
      {
        message: "Journey cannot loaded",
        error: err,
      },
      err
    );
  }
};
exports.getJourney = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Journey.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["updatedAt"],
      },
      include: {
        model: User,
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      },
    });

    res.status(200).send({
      message: "Journey successfully loaded",
      data,
    });
  } catch (err) {
    res.status(500).send(
      {
        message: "journey cannot loaded",
        error: err,
      },
      err
    );
  }
};
exports.postJourney = async (req, res) => {
  try {
    const { error } = journeyValidator(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const journeyExist = await Journey.findOne({
      where: { title: req.body.title },
    });

    if (journeyExist)
      return res.status(400).send({
        message: "Journey title already exists",
      });

    const data = await Journey.create({
      title: req.body.title,
      userId: req.body.userId,
      description: req.body.description,
    });

    res.status(201).send({
      message: "Journey has been created",
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
  }
};

const { User, Journey } = require("../models");
const {
  loginValidator,
  registerValidator,
} = require("../middlewares/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

exports.getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await User.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      message: "user successfully loaded",
      data,
    });
  } catch (err) {
    res.status(500).send(
      {
        message: "user cannot loaded",
        error: err,
      },
      err
    );
  }
};
exports.getUserJourney = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Journey.findAll({
      where: {
        userId: id,
      },
      order: [["updatedAt", "DESC"]],
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
      include: {
        model: User,
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      },
    });

    res.status(200).send({
      message: "journey by user successfully loaded",
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

exports.login = async (req, res) => {
  try {
    const { error } = loginValidator(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    // const { email, password } = req.body;

    const validEmail = await User.findOne({ where: { email: req.body.email } });
    if (!validEmail)
      return res.status(400).send({
        message: "email is not invalid",
      });

    const validPass = await bcrypt.compare(
      req.body.password,
      validEmail.password
    );
    if (!validPass)
      return res.status(400).send({
        message: "password is not invalid",
      });
    const token = jwt.sign({ id: User.id }, process.env.SECRET_KEY);
    res.header("x-access-token", token).send({
      message: "you are logged in",
      data: {
        id: validEmail.id,
        email: validEmail.email,
        accessToken: token,
      },
    });
  } catch (err) {
    res.status(500).send(
      {
        message: "account login failed",
        error: err,
      },
      err
    );
  }
};

exports.register = async (req, res) => {
  try {
    const { error } = await registerValidator(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    // const { fullName, email, password, phone, address } = req.body;

    const EmailExist = await User.findOne({ where: { email: req.body.email } });
    if (EmailExist)
      return res.status(400).send({ message: "email already exist" });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: hashedPassword,
      image: req.body.image,
    });

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET_KEY
    );

    res.status(201).send({
      message: "account created successfully",
      data: {
        id: user.id,
        email: user.email,
        token: token,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

// exports.updateUser = (req, res) => {
//   console.log(req.body, req.files);
// };

// exports.updateUser = async (req, res) => {
//   console.log(req);
//   const { id } = req.params.id;
//   let TempFile = req.files.upload;
//   let tempPathFile = TempFile.path;
//   console.log("user " + req.files.upload);
//   try {
//     const targetPathUrl = path.join(
//       __dirname,
//       `./public/images/${TempFile.name}`
//     );

//     if (
//       path.extname(TempFile.originalFilename).toLowerCase() === ".png" ||
//       ".jpg"
//     ) {
//       fs.rename(tempPathFile, targetPathUrl, async (err) => {
//         console.log("file rename");

//         const data = await user.update(
//           {
//             image: targetPathUrl,
//           },
//           {
//             where: {
//               id: id,
//             },
//           }
//         );
//       });
//     }
//     res.status(201).send({
//       message: "user successfully updated",
//       data,
//     });
//   } catch (err) {
//     res.status(500).send(
//       {
//         message: "user failed updated",
//         error: err,
//       },
//       err
//     );
//   }
// };

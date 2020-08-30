const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const multiParty = require("connect-multiparty/index");
const path = require("path");
const fs = require("fs");

const morgan = require("morgan");

const userRoute = require("./routes/userRoute");
const journeyRoute = require("./routes/journeyRoute");
const bookmarkRoute = require("./routes/bookmarkRoute");
const port = process.env.PORT || 5000;

const multipartyMiddleware = multiParty({ uploadDir: "./public/images" });

const app = express();

app.use(cors());

dotenv.config();

// const db = require("./models/");
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("sequelize db sync");
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/public", express.static("public"));

app.use("/api/v1", userRoute);
app.use("/api/v1", journeyRoute);
app.use("/api/v1", bookmarkRoute);

app.post("/api/v1/upload", multipartyMiddleware, (req, res) => {
  try {
    let TempFile = req.files.upload;
    let tempPathFile = TempFile.path;

    const targetPathUrl = path.join(
      __dirname,
      `./public/images/${TempFile.name}`
    );

    if (
      path.extname(TempFile.originalFilename).toLowerCase() === ".png" ||
      ".jpg"
    ) {
      fs.rename(tempPathFile, targetPathUrl, (err) => {
        console.log("file rename");
        res.status(200).json({
          uploaded: true,
          url: `http://localhost:5000/public/images/${TempFile.originalFilename}`,
        });

        if (err) return console.log(err);
      });
    } else {
      res.status(500).send({
        message: "error server",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }

  console.log(req.files);
});

app.listen(port, () => {
  console.log(`server running in ${port}`);
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const journeyRoute = require("./routes/journeyRoute");
const bookmarkRoute = require("./routes/bookmarkRoute");
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

dotenv.config();

// const db = require("./models/");
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("sequelize db sync");
// });

app.use(bodyParser.json());

app.use("/api/v1", userRoute);
app.use("/api/v1", journeyRoute);
app.use("/api/v1", bookmarkRoute);

app.listen(port, () => {
  console.log(`server running in ${port}`);
});

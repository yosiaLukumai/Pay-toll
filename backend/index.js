const app = require("express")();
const express = require("express");
const dbConfig = require("./db/connect");
const userRoutes = require("./routes/users");
const cors = require("cors");
require("dotenv").config();
// database configuration
dbConfig.connectDb();

//cors config
// limiting all the acces that comes from other hosting
app.use(cors());
// allowing the json and url encoded in the requesst body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/test", (req, res) => {
  res.send("LOL testing wooh");
});

// bringing all the routes
userRoutes.userRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(`App running and connected to port ${process.env.PORT}`);
});

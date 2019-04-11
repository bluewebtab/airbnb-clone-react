const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const config = require("./config");
const Rental = require("./models/rental");
const FakeDb = require("./fake-db");
const rentalRoutes = require("./routes/rentals"),
  userRoutes = require("./routes/users"),
  bookingRoutes = require("./routes/bookings");
const path = require("path");

mongoose.connect(config.DB_URI).then(() => {
  if (process.env.NODE_ENV !== "production") {
    const fakeDb = new FakeDb();
    // fakeDb.seedDb();
  }
});

app.use(bodyParser.json());

app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/bookings", bookingRoutes);

if (process.env.NODE_ENV === "production") {
  const appPath = path.join(__dirname, "..", "build");
  app.use(express.static(appPath));
  app.get("*", function(req, res) {
    res.sendFile(path.resolve(appPath, "index.html"));
  });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log("I am running!");
});

("mongodb://testuser:testuser1@ds115595.mlab.com:15595/findandstay-prod");

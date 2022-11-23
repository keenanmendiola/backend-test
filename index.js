const express = require("express");
const databaseConnection = require("./config/dbConfig");
const routes = require("./routes/index");
const authenticateToken = require("./middlewares/authenticateToken");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

databaseConnection.connectToDatabase();

app.use(express.json());
app.use("/auth", routes.authRoute);

app.use(authenticateToken);
app.use("/services", routes.bankRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));

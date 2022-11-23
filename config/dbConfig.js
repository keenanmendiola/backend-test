const mongoose = require("mongoose");

const connectToDatabase = () => {
  try {
    mongoose.connect(
      "mongodb+srv://testaccount:o35QQq2e9jHbj9ok@cluster0.o0gbs.mongodb.net/bankapp",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
      () => {
        console.log("Connected to database.");
      }
    );
  } catch (error) {
    console.log("Database error", error);
  }
};

module.exports = {
  connectToDatabase,
};

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB connection SUCCESS , ${con.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection FAIL");
    console.log(error.message);
    process.exit(1);
  }
};
module.exports = connectDB;

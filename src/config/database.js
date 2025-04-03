const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://pushpendra616singh:EgsbaukkrBZkR3Br@namastenode.hzhebxx.mongodb.net/devTinder"
  );
};

module.exports = connectDB;

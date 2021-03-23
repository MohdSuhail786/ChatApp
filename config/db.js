const mongoose = require('mongoose')
exports.connectToMongoDB = async ()=> {
  try {
    await mongoose.connect("mongodb+srv://mohd_suhail:msd.@.gmail.com@cluster0.xc6ml.mongodb.net/chat_app?retryWrites=true&w=majority",{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    console.log("Connected to MongoDB...")
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
}
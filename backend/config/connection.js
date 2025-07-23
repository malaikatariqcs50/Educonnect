const mongoose = require("mongoose");

const connection = ()=>{mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log("Error connecting to database");
})
}

module.exports = connection;
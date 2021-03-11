const express = require("express");
const morgan = require("morgan");
const { Page, User } = require('./models');

const app = express();

app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded( { encoded : false}));

//app.use("/posts", require("./routes/posts"));       //change these later

app.get("/", (req, res) => {                        //change these late
    res.send('Hello Wold');
})

const { db } = require('./models');              //this makes sure that we're connected to the DB. Comment out once confirmed
db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

  const init = async () => {
    await db.sync();

    const PORT = 1337; //local host is always 1337, while the postGres port is 5432
    app.listen(PORT, () => {
      console.log(`Server is listning on port ${PORT}!`)
    })
  }
  
  init();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var dotenv = require('dotenv');
dotenv.config();

//establish mongoDB connection
mongoose.connect(process.env.MONGOURL);
const conn = mongoose.connection;
const path = require('path');

// require GridFS
const grid = require('gridfs-stream');

// require filesystem module
const fs = require('fs');

// where to find the image in the filesystem that we will store in the DB
const imgPath = path.join(__dirname, '../images/favourite3.jpg');

// connect gridfs and mongo
grid.mongo = mongoose.mongo;

conn.once('open', function () {
  console.log('-connection open-');
  let gfs = grid(conn.db);

  // when connection is open, create writestream with the name to store file as in the DB
  const writestream = gfs.createWriteStream({
    filename: 'favourite3.jpg',
  });

  // create a read-stream from where the video currently is (imgPath)
  // and pipe it into the database (through write-stream)
  fs.createReadStream(imgPath).pipe(writestream);

  writestream.on('close', function (file) {
    // do something with file
    // console logging that it was written successfully
    console.log(file.filename + ' Written to DB');
  });
});

module.exports = { Schema };

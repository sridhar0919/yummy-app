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
// const imgPath = path.join(__dirname, '../images/dessert3.jpg');

// connect gridfs and mongo
grid.mongo = mongoose.mongo;

conn.once('open', function () {
  console.log('-connection open-');
  let gfs = grid(conn.db);

  // write content from DB to file system with the given name
  const fs_write_stream = fs.createWriteStream(
    path.join(__dirname, '../d-images/favourite3.jpg')
  );

  // create read-stream from mongodb
  // in this case, finding the correct file by 'filename'
  // but could also find by ID or other properties
  const readStream = gfs.createReadStream({
    filename: 'favourite3.jpg',
  });

  // pipe the read-stream into the write stream
  readStream.pipe(fs_write_stream);
  fs_write_stream.on('close', function () {
    console.log('File has been written successfully!');
    // check out writeTo folder to see it
  });
});

module.exports = { Schema };

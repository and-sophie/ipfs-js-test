let ipfsAPI = require('ipfs-api');
let concat = require('concat-stream')
let through = require('through2')
let fs = require('fs');

let ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});

console.log("Setting up test image from URL...");

let testImg = "http://weknowmemes.com/wp-content/uploads/2013/04/an-adventure-alpaca-my-bags.jpg";

ipfs.util.addFromURL(testImg, function(err, result) {
  console.log("Adding image from URL...")
  if (err) throw err;
  let hash = result[0].hash
  console.log("Image added with hash: " + JSON.stringify(result));
  ipfs.get(hash, (err, stream) => {
    if (err) throw err;
    let files = []
    stream.pipe(through.obj((file, enc, next) => {
      file.content.pipe(concat((content) => {
        fs.writeFile("testImg.jpg", content, (err) => {
          if (err) throw err;
          console.log("File written successfully!");
        });
      }))
    }))
  });
});

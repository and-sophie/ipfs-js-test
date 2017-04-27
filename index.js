let ipfs = require('ipfs-js');

ipfs.setProvider(require('ipfs-api')('localhost', '5001'));

console.log('Setting up test string: MedToken');

ipfs.add("MedToken", function(err, hash) {
    console.log("Adding string to IPFS...")
    if (err) throw err; // If connection is closed
    console.log('Test string added with hash: ' + hash);
    ipfs.cat(hash, function(err, buffer) {
        console.log("Retrieving string from IPFS...")
        if (err) throw err;
        console.log('String returned from IPFS: ' + buffer.toString());
    });
});

let testJson = {
  "Name": "Test Person",
    "DOB": "11/11/91",
    "Address": '21 RoadName, Watford',
    "Email Address": "blahblah@test.com"
};

console.log("Setting up test JSON: " + JSON.stringify(testJson));

ipfs.addJson(testJson, function(err, hash) {
  console.log("Adding JSON to ipfs...")
  if (err) throw err;
  console.log('JSON addded with hash: ' + hash);
  ipfs.catJson(hash, function(err, buffer) {
    console.log("Retrieving json from IPFS...");
    if (err) throw err;
    console.log('JSON returned from IPFS: ' + JSON.stringify(buffer))
  })
})


console.log("Setting up test image from URL...");

let testImg = "http://weknowmemes.com/wp-content/uploads/2013/04/an-adventure-alpaca-my-bags.jpg";

ipfs.api.util.addFromURL(testImg, function(err, hash) {
  console.log("Adding image from URL...")
  if (err) throw err;
  console.log("Image added with hash: " + hash);
})

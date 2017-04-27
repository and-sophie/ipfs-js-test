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

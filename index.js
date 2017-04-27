let ipfs = require('ipfs-js');

ipfs.setProvider(require('ipfs-api')('localhost', '5001'));

console.log('Adding string: MedToken');

ipfs.add("MedToken", function(err, hash) {
    if (err) throw err; // If connection is closed
    console.log('Test added with hash: ' + hash);
    ipfs.cat(hash, function(err, buffer) {
        if (err) throw err;
        console.log('String gotten from IPFS: ' + buffer.toString());
    });
});


let testJson = {
  "Name": "Test Person",
    "DOB": "11/11/91",
    "Address": '21 RoadName, Watford',
    "Email Address": "blahblah@test.com"
};

console.log(JSON.stringify(testJson));

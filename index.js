let ipfs = require('ipfs-js');

ipfs.setProvider(require('ipfs-api')('localhost', '5001'));

console.log('Adding string: MedToken');
let testJson = {
    "Name": "Test Person",
    "DOB": "11/11/91",
    "Address": '21 RoadName, Watford',
    "Email Address": "blahblah@test.com"
};
console.log(JSON.stringify(testJson));

let filedJson = {
    path:'/Users/prodda/Downloads/Cat.jpg',
    content: ArrayBuffer
}

ipfs.add("MedToken", function(err, hash) {
    if (err) throw err; // If connection is closed
    console.log('Test added with hash: ' + hash);
    ipfs.cat(hash, function(err, buffer) {
        if (err) throw err;
        console.log('String gotten from IPFS: ' + buffer.toString());
    });
    ipfs.cat(hash, function(err, buffer) {
        if (err) throw err;
        console.log(buffer.toString()); 	// "Testing..."
    });
});

ipfs.addJson(testJson,function(err,hash){
    if(err) throw  err;
    console.log('JSON added with hash: ' + hash);
    ipfs.catJson(hash, function(err,value){
        if(err) throw err;
        console.log('JSON recieved from hash: ' + JSON.stringify(value));

    })

})




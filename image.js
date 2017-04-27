let ipfsAPI = require('ipfs-api');
let ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'}); // leaving out the arguments will default to these values
let through = require('through2');
const concat = require('concat-stream');
let fs = require('fs');


ipfs.util.addFromURL('http://www.extrapolate.io/images/exa%20white_2x.png', (err, result) => {
    if (err) {
        throw err
    }
    console.log(result)
    ipfs.files.get(result[0].hash, function (err, stream) {
        let files = [];
        stream.pipe(through.obj((file, enc, next) => {
            file.content.pipe(concat((content) => {
                files.push({
                    path: file.path,
                    content: content
                });
                next()
            }))
        }, () => {
            console.log(files);
            fs.writeFile("test.jpg", files[0].content, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
        }))
    });
});
// Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require('fs');

console.log("Reading from file")
fs.readFile('file.txt','utf-8',(err,data)=>{
    if(err) throw err;
    console.log("Writing to new file");
    fs.writeFile("file1.txt",data,(err) => {
        if(err) throw err;
        console.log("Writing to New file is completed");
    });

})
// File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const fs = require('fs');

fs.readFile('file.txt','utf-8',(err,data)=>{

    const cleanData = data.split(' ').filter((word) => {
        if(err) throw(err);
        if(word != ''){
            return word;
        }
    } ).join(" ");

    fs.writeFile('file.txt',cleanData,(err) => {
        if(err) throw(err);
        console.log("Written Successfully !!");
    });
    
})
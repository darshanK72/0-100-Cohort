const express = require('express');
const port = 3301;

const app = express();

app.listen(port,() => {
    console.log(`Listening to port ${port}`)
});

app.get('/',(req,resp) => {
    resp.send("Hello World");
})


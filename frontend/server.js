const express = require('express')
const app1 = express()
const path = require('path');
const port1 = process.env.PORT || 3000

app1.use(express.static(path.join(__dirname, 'build')));

app1.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app1.listen(port1, () => {
    console.log("App Server Up and Running")
})
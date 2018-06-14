const express = require('express');
const methods = require('./methods')
const opn = require("opn");
const app = express();


app.get('/i/want/title', methods.processRequest,);

app.get('*', function (req, res) {
    res.status(404).send('Sorry, Looks like a 404 !');
});

module.exports = {
    start: (port) => {
        app.listen(port, function () {
            console.log('Example app listening on port - ' + port);
            opn('http://localhost:' + port + '/i/want/title?address=http://www.google.com&address=https://www.youtube.com',{app: 'chrome'} , function (err) {
                if (err) throw err;
                console.log('The user closed the browser');
            });
        });
    }
}
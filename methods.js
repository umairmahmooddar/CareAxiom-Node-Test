const cheerio = require('cheerio');
const requestify = require('requestify');
const async = require('async')
const render = require('./response')

function processUrl(url) {
    return new Promise((resolve, reject) => {
        let responseObj = {
            "url": url
        }
        async.waterfall([
                (callback) => {
                    requestify.get(url, {
                            timeout: 1000
                        })
                        .then(function (response) {
                                let $ = cheerio.load(response.body);
                                responseObj.title = $('title').text();
                                callback(null, responseObj);
                        }).catch(err => {
                            responseObj.title = 'No Response';
                            callback(null, responseObj);
                        });
                }
            ],
            (err, finalResponseObj) => {
                resolve(finalResponseObj);
            }
        )
    })
}

function processRequest(req, res) {
    if (req.query.address) {
        if (req.query.address.constructor.name === 'Array') {
            let promises = []
            req.query.address.forEach(url => {
                promises.push(processUrl(url))
            });
            Promise.all(promises).then((responseList) => {
                res.send(render.render(responseList))
            }).catch(err => {
                console.log(err)
            });
        } else {
            processUrl(req.query.address).then(responseObj => {
                res.send(render.render([responseObj]));
            }).catch(err => {
                res.send(render.render([responseObj]));
            })
        }
    } else {
        res.send('No Url Found in Query Parameter')
    }
}

module.exports = {
    processRequest: processRequest
}
"use strict";

const request = require('request');
const cheerio = require('cheerio');

let actives = [];

module.exports = Lounge;

function Lounge(cookiesJSON) {

    let cookies = cookieToString(cookiesJSON);
    let cookie = request.cookie(cookies);

    this.request = request.defaults({
        headers: {
            Cookie: cookies
        },
        followRedirect: false
    });
}

Lounge.prototype.getActiveTrades = function (callback) {

    let mytradesUrl = "https://csgolounge.com/mytrades";

    this.request.get({url:mytradesUrl}, function (err, res, body) {

        if(err)
            return console.log(err);

        if(res.statusCode !== 200)
            return console.log("Couldnt get trades. Possibly lounge down or cookies dead.");

        let $ = cheerio.load(body);
        let trades = $("article.standard").find("div.tradepoll");

        trades.each(function (i, elem) {
            let that = $(this);
            if(that.find("div.tradeheader > a.buttonright").length > 0) {
                let tradeId = that.attr("id").replace("trade", "");
                actives.push(tradeId);
            }
        });

        if(actives.length > 0)
            callback(actives);
        else
            console.log("No active trades");
    });
};

Lounge.prototype.bumpTrade = function (tradeId) {

    let bumpUrl = "https://csgolounge.com/ajax/bumpTrade.php";

    this.request.post({
        url: bumpUrl,
        formData: {
            trade: tradeId
        }
    }, function(err, res) {

        if(err)
            return console.log(err);

        if(res.statusCode !== 200)
            return console.log("Couldnt bump " + tradeId + ". Possibly lounge down.");

        let index = actives.indexOf(tradeId);
        if (index > -1) {
            actives.splice(index, 1);
        }
        console.log("*" + tradeId + " bumped");
    });
};

function cookieToString(cookieJson) {

    let cookieArray = [];

    for (let key in cookieJson) {
        if (cookieJson.hasOwnProperty(key))
            cookieArray.push(key + "=" + cookieJson[key]);
    }

    return cookieArray.join("; ");
}

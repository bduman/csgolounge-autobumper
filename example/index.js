"use strict";

const Lounge = require('../index');

let lobzik = new Lounge({
                "PHPSESSID": "xxxxxx",
                "id": "xxxxxx",
                "token": "xxxxxxx"
            });

setInterval(function() {

    lobzik.getActiveTrades(activeTrades =>
        activeTrades.forEach(activeTrade => lobzik.bumpTrade(activeTrade))
    );

// every 10 minutes
}, 600000);

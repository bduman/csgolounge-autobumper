# csgolounge-autobumper
Auto bump your trades at csgolounge

# Install

```npm install csgolounge-autobumper```

# Usage

```javascript

"use strict";

const Lounge = require('csgolounge-autobumper');

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

```

# How can i get cookies ?

For chrome =>
You need to login csgolounge on your browser. Then press F12 for developer tool. Click Application tab and you can find cookies from sidebar.

![screenshot_1](https://cloud.githubusercontent.com/assets/5374623/18090259/9200c8c2-6ecc-11e6-9598-1bb17c7fc0ff.png)

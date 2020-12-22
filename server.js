'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const fetch = require('node-fetch');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  const returnMessage = imputMessage => {
    if (imputMessage.text === '成績'){ 
      // get results JSON
      const api_url = 'https://script.google.com/macros/s/AKfycbz2XxvmlqZC2gsYjPn1BAAJxwdcR5Cth_5_ef-ef-7yZ8zSQAo/exec'

      fetch(api_url, {method: 'GET'}).then((res) => {
      console.log( res );
      return res.json(); 
      })
      .then((data) => {
      return returnText(data);
      })
      .catch((err) => {
      console.error( err );
      });
      const returnText = jsonObj => {
        return {type: 'text', text: '成績は' + jsonObj.Total_points + 'です。'};
      }
    } else {
      return {type: 'text', text: 'よくわかりません'};
    }
  };

  // use reply API
  return client.replyMessage(event.replyToken, returnMessage(echo));
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
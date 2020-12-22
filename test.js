'use strict';

const fetch = require('node-fetch');

// get results JSON
const api_url = 'https://script.google.com/macros/s/AKfycbz2XxvmlqZC2gsYjPn1BAAJxwdcR5Cth_5_ef-ef-7yZ8zSQAo/exec'

fetch(api_url, {method: 'GET'}).then((res) => {
console.log( res );
return res.json(); 
})
.then((data) => {
log(data);
})
.catch((err) => {
console.error( err );
});

const log = jsonObj => {
    return console.log(jsonObj);
}
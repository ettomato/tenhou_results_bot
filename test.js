'use strict';

const fetch = require('node-fetch');

const api_url = 'https://script.google.com/macros/s/AKfycbz2XxvmlqZC2gsYjPn1BAAJxwdcR5Cth_5_ef-ef-7yZ8zSQAo/exec';
fetch(api_url).then((res) => {
  return res.json(); 
})
.then((data) => {
  const totalPoints = data[0].Total_points;
  console.log(returnText(totalPoints));
})
.catch((err) => {
  console.error( err );
});

const returnText = jsonObj => {
  return {type: 'text', text: '成績は' + jsonObj + 'です。'};
};
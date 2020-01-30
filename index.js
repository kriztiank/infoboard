const express = require('express');
const fetch = require('node-fetch');

const app = express();
// const expressLayouts = require("express-ejs-layouts");

app.set('view engine', 'ejs');
// app.use(expressLayouts);
app.use(express.static('./static'));
let activity;
let subject;
let news;
let medie;
function getData(data) {
  news = data.news;
  activity = data.activity;
  subject = data.subject;
  medie = data.medie;
  // console.log(activity);
}

fetch('https://infoboard.mediehuset.net/api/')
  .then(response => response.json())
  .then(data => {
    getData(data);
  });

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Infoboard',
    content: news,
  });
});

app.listen(3000, () => {
  console.log('Express kører på port 3000');
});

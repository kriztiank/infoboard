const express = require('express');
const fetch = require('node-fetch');

const app = express();
// const expressLayouts = require("express-ejs-layouts");

app.set('view engine', 'ejs');
// app.use(expressLayouts);
app.use(express.static('./static'));

fetch('https://api.mediehuset.net/songbook/')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Sidetitel',
    content: 'Side Indholdet',
  });
});

app.listen(3000, () => {
  console.log('Express kører på port 3000');
});

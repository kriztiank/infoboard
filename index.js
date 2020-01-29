const express = require('express');

const app = express();
// const expressLayouts = require("express-ejs-layouts");

app.set('view engine', 'ejs');
// app.use(expressLayouts);
app.use(express.static('./static'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Sidetitel',
    content: 'Side Indhold',
  });
});

app.listen(3000, () => {
  console.log('Express kører på port 3000');
});

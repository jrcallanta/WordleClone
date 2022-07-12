const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();


app.use(express.static(path.resolve(__dirname, '../client/build/')));
app.use(bodyParser.urlencoded({extended: true}));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})


app.listen(process.env.PORT || 3000, () => {
  console.log('Listening...');
})

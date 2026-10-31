const express = require('express');
const path = require('path');
const app = express();

// Poore project folder ko static serve karo
app.use(express.static(__dirname));

app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
  });
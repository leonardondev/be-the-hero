const express = require('express');

const app = express();
app.use( express.json() );  //linguagem usada no request.body

app.post('/users', (request, response) => {
  return response.json({ mensage: 'Omnistack11'});
});

 app.listen(3333);

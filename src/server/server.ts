import express = require('express');
import * as fs from 'fs';

import apiRouter from './routes';

const app = express();

app.use(express.static('public'));
app.use(apiRouter);

if (!fs.existsSync('src/server/data/orders.json')) {
  fs.writeFileSync('src/server/data/orders.json', '');
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
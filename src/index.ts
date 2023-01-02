import express from 'express';
import * as dotenv from 'dotenv'

import router from './routes/router';

dotenv.config()

const app = express();

app.use(express.json());

app.use('/', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

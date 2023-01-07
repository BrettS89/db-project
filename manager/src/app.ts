import express from 'express';
import 'express-async-errors';
import db from './db';
import errorHandler from './middleware/handle-error';
import Err from './utilities/errors';

import dataRoutes from './routes/data';
import registerRefRoutes from './routes/register-ref';

const app = express();

db.init();

app.use(express.json());

app.use('/data', dataRoutes);
app.use('/register-ref', registerRefRoutes);

app.all('*', async (req, res) => {
  throw new Err({ code: 401, message: 'Route not found' });
});

app.use(errorHandler);

export default app;

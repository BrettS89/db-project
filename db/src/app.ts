import express from 'express';
import 'express-async-errors';
import db from './db';
import { validateEnv } from './config';
import errorHandler from './middleware/handle-error';
import Err from './utilities/errors';
import routes from './routes';

const app = express();

validateEnv();

db.init();

app.use(express.json());

app.use('/config', routes.configRoutes);
app.use('/data', routes.dataRoutes);
app.use('/model', routes.modelRoutes);
app.use('/db', routes.dbRoutes);

app.all('*', async (req, res) => {
  throw new Err({ code: 401, message: 'Route not found' });
});

app.use(errorHandler);

export default app;

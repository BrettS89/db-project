import { Router } from 'express';
import configRoutes from './config';
import dataRoutes from './data';
import dbRoutes from './db';
import modelRoutes from './model';

const routes: Record<string, Router> = {
  configRoutes,
  dataRoutes,
  dbRoutes,
  modelRoutes,
};

export default routes;

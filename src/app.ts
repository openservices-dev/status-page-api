import express from 'express';
import qs from 'qs';
import routes from './routes';
import cors from './middlewares/cors';
import logRequest from './middlewares/logRequest';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.disable('x-powered-by');
app.set('query parser', function (str: string) {
  return qs.parse(str, { arrayLimit: Infinity });
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(logRequest);

app.use(routes);

app.use(errorHandler);

export default app;

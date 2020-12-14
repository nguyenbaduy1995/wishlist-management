import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import routes from 'routes'

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cors())
app.use(helmet());

app.use('/', routes);

export default app

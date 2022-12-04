import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan'
import bodyParser from 'body-parser'

import pgsql from './db/knex'
dotenv.config();

const app: Express = express();
const port = process.env.PORT;


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/', async (req: Request, res: Response) => {
  console.log(req.body)
  const r = await pgsql.raw("SELECT * FROM user")

  res.json({msg: 'Express + TypeScript Working'});///
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
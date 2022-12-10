import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan'
import bodyParser from 'body-parser'

import User from './db/models/user'
import Comments from './db/models/comments'
import Post from './db/models/post'
import sequelize from './db/db'
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.post('/', async (req: Request, res: Response) => {
  console.log(req.body)
  res.json({msg: 'Express + TypeScript Working'});
});

app.delete('/', async (req: Request, res: Response) => {
  await User.destroy({
    where: {
      id: 1
    }
  });
  res.send('ok')
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    await User.sync({ force: true })
    await Post.sync({ force: true })
    await Comments.sync({ force: true })
    console.log('Connection has been established successfully.');
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    await sequelize.query(`
    INSERT INTO 
      users("first_name", "last_name", "email", "created_at", "updated_at") 
    VALUES 
      ('Martin', 'Macchi', 'martin@mail.com', NOW(), NOW()),
      ('Tomas', 'Macchi', 'tomas@mail.com', NOW(), NOW()),
      ('Lucas', 'Macchi', 'lucas@mail.com', NOW(), NOW());
    `)
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
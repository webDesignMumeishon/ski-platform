import dotenv from 'dotenv';
import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import Router from '@koa/router';
import cookieParser from 'koa-cookie'
import morgan from 'koa-morgan'
import cors from '@koa/cors'

import User from './db/models/user'
import ParentChildComment from './db/models/parent_child_comment'
import Comments from './db/models/comments'
import Post from './db/models/post'
import sequelize from './db/db'
import IndexRouter from './routes/index'
import City from './db/models/city'
import insertDb from './db/query/insertDb'

dotenv.config();

const app = new Koa();
const router = new Router();
const port = process.env.PORT;


app.use(async function(ctx, next){
  try {
    return await next();
	} catch (err) {
    console.log(err)
    ctx.status = 500
    ctx.body = err
	}
});

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
router.use(bodyparser());

router.use(IndexRouter)

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    await User.sync({ force: true })
    await Post.sync({ force: true })
    await Comments.sync({ force: true })
    await City.sync({ force: true })
    await ParentChildComment.sync({ force: true })

    console.log('Connection has been established successfully.');
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);

    await insertDb.users()
    await insertDb.cities()
    await insertDb.posts()
    await insertDb.comments()

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

app.use(router.routes());

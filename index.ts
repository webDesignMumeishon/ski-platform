import dotenv from 'dotenv';
import Koa, { Context } from 'koa';
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
import Likes from './db/models/likes';

dotenv.config();

const app = new Koa();
const router = new Router();
const port = process.env.PORT;


app.use(async function(ctx, next){
  try {
    return await next();
	} catch (err: any) {
      ctx.status = err?.statusCode || err?.status || 500
      ctx.body = err.message || 'Internal Server Error'
      ctx.app.emit('error', err, ctx)
	}
});

const whitelist = ['http://localhost:3000']

const corsOptions = {
  credentials: true, // This is important.
  origin: (ctx : Context) : string =>  {
    const originUrl = ctx.request.header.origin
    if(originUrl !== undefined){
      if(whitelist.includes(originUrl)){
        return '*'
      }
    }
    return whitelist[0]
  }
}

app.use(cors(corsOptions));

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
    await Likes.sync({ force: true })

    /*
      Associations 
    */
    // User & Comments
    User.hasMany(Comments);
    Comments.belongsTo(User, {
      foreignKey: 'user_id',
    });
    // User & Post
    User.hasMany(Post)
    Post.belongsTo(User, {
      foreignKey: 'user_id'
    });



    console.log('Connection has been established successfully.');
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);

    await insertDb.users()
    await insertDb.cities()
    await insertDb.posts()
    await insertDb.comments()
    await insertDb.likes()

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

app.use(router.routes());

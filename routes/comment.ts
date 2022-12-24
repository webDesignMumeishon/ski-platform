import Router from '@koa/router';
import Comments from '../db/models/comments';
import sequelize from '../db/db'

const router = new Router();

router.get('/', async (ctx) => {

    const results = await sequelize.query(`
        SELECT c.*, u.first_name, u.last_name FROM comments c
        JOIN users u ON u.id = c.user_id
        ORDER BY c.created_at ASC
    `)


    ctx.body = results[0]
});


export default router.routes()
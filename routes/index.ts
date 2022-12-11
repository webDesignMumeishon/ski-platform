import User from '../db/models/user'

import Router from '@koa/router';
const router = new Router();

router.get('/:id', async (ctx) => {
  const id = ctx.params.id
  const user = await User.findByPk(id)
  
  if(user !== null){
    return ctx.body = user
  }
  else{
      return ctx.status = 404
  }
});


export default router.routes()
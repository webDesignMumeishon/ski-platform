import User from '../db/models/user'

import Router, {RouterContext} from '@koa/router';
const router = new Router();

router.get('/:id', async (ctx) => {
    console.log('Holis')
  const id = ctx.params.id
  const user = await User.findByPk(id)

  
  if(user !== null){
    return ctx.body = {
      ...user.toJSON(),
      fullName: user.fullName
    }
  }
  else{
      return ctx.status = 404
  }
});

router.post('/create', async (ctx: RouterContext) => {
    const id = ctx.request.body
    ctx.body = id
})


export default router.routes()
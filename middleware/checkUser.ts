import Router, {RouterContext} from '@koa/router';
import bcrypt from 'bcrypt'


const checkUser = async (ctx : RouterContext) => {

    console.log(ctx.cookies.get("jwt"))

}


export default checkUser
import { RouterContext } from '@koa/router';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

import { Next } from 'koa';

dotenv.config();

const secretKey = process.env.secretKey || 'testing';

const checkCookie = async (ctx: RouterContext, next: Next) => {
    const cookie = ctx.cookies.get("ski_platform")
    ctx.hasCookie = false

    if (cookie !== undefined) {
        const userId = jwt.verify(cookie, secretKey) as unknown as any
        ctx.userId = userId.id
        ctx.hasCookie = true
    }
    await next()
}

export default checkCookie

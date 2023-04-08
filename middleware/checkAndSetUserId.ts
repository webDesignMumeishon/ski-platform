import Router, { RouterContext } from '@koa/router';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

import { Next } from 'koa';

dotenv.config();

const secretKey = process.env.secretKey || 'testing';

const checkAndSetUserId = async (ctx: RouterContext, next: Next) => {
    const cookie = ctx.cookies.get("ski_platform")

    if (cookie !== undefined) {
        const userId = jwt.verify(cookie, secretKey) as unknown as any
        ctx.userId = userId.id
        await next()
    }
    else {
        ctx.status = 401
        ctx.throw('Unauthorized')
    }
}

export default checkAndSetUserId

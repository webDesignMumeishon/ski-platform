import Router, {RouterContext} from '@koa/router';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

import { Next } from 'koa';

dotenv.config();

const secretKey = process.env.secretKey || 'testing';


const checkAndSetUserId = async (ctx : RouterContext, next: Next) => {
    const cookie = ctx.cookies.get("ski_platform")

    if(cookie !== undefined){
        const userId = jwt.verify(cookie, secretKey) as unknown as any
        ctx.userId = userId.id
        await next()
    }
    else{
        ctx.status = 401
        ctx.throw('Unauthorized')
    }
}


export default checkAndSetUserId

// import { RouterContext } from '@koa/router';

// import SessionService from '@services/session';
// import isUUID from '@util/isUUID';

// export default async function checkAndSetUserId(
// 	ctx: RouterContext,
// 	next: Function
// ): Promise<void> {
// 	if (
// 		(ctx.path == '/chat/auth' && ctx.query.override) ||
// 		ctx.query.super_secret_override_value
// 	) {
// 		const override =
// 			ctx.path == '/chat/auth'
// 				? ctx.query.override
// 				: ctx.query.super_secret_override_value;
// 		if (isUUID(override)) {
// 			ctx.uuid = override;
// 		} else {
// 			ctx.userId = override;
// 		}
// 	} else {
// 		if (ctx.cookies.get(SessionService.cookieName)) {
// 			try {
// 				const session = await SessionService.getByCookie(
// 					ctx.cookies.get(SessionService.cookieName)
// 				);
// 				if (session.supportsUUID()) {
// 					ctx.uuid = session.getUserUUID();
// 				}
// 				ctx.userId = session.getUserId();
// 			} catch (err) {
// 				// Session couldn't be retrieved. Don't set the user id.
// 			}
// 		}
// 	}
// 	await next();
// }
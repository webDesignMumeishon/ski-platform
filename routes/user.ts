import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Router, { RouterContext } from "@koa/router";

import User from "../db/models/user";
import checkAndSetUserId from "../middleware/checkAndSetUserId";

const secretKey = process.env.secretKey || "testing";

dotenv.config();

const router = new Router();

router.get("/:id", checkAndSetUserId, async (ctx) => {
  const id = ctx.params.id;

  if (id != ctx.userId) {
    ctx.throw("Unauthorized");
  }

  const user = await User.findByPk(id);
  if (user !== null) {
    return (ctx.body = {
      ...user.toJSON(),
      fullName: user.fullName,
    });
  } else {
    return (ctx.status = 404);
  }
});

router.post("/create", async (ctx: RouterContext) => {
  const { firstName, lastName, email, password } = ctx.request
    .body as unknown as any;

  const data = {
    firstName,
    lastName,
    email,
    password: await bcrypt.hash(password, 10),
  };

  //saving the user
  const user = await User.create(data);

  ctx.body = user;
});

router.post("/log-in", async (ctx: RouterContext) => {
  const { email, password } = ctx.request.body as unknown as any;

  const user = await User.findOne({
    where: { email },
  });

  if (user !== null) {
    const isSame = await bcrypt.compare(password, user.password);

    if (isSame) {
      let token = jwt.sign({ id: user.id }, secretKey);

      ctx.cookies.set("ski_platform", token, {
        maxAge: 1 * 24 * 60 * 60,
        httpOnly: true,
      });

      //send user data
      ctx.status = 201;
      ctx.body = user;
    } else {
      ctx.status = 401;
      ctx.throw("Authentication failed");
    }
  } else {
    ctx.status = 401;
    ctx.throw("Authentication failed");
  }
});

export default router.routes();

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Router, { RouterContext } from "@koa/router";

import User from "../db/models/user";
import checkAndSetUserId from "../middleware/checkAndSetUserId";

const secretKey = process.env.secretKey || "";
dotenv.config();

const router = new Router();

router.get("/me", checkAndSetUserId, async (ctx) => {
  const id = ctx.userId;

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
    password: await User.hashPassword(password),
  };

  //saving the user
  const user = await User.create(data);
  ctx.body = user.toPublic();
});

router.post("/log-in", async (ctx: RouterContext) => {
  const { email, password } = ctx.request.body as unknown as any;

  const user = await User.findOne({
    where: { email },
  });

  if (user !== null) {
    const isSamePassword = await user.comparePassword(password)
    if (isSamePassword) {
      let token = jwt.sign({ id: user.id }, secretKey);

      ctx.cookies.set("ski_platform", token, {
        httpOnly: true, 
      });

      //send user data
      ctx.status = 200;
      ctx.body = user.toPublic();
    } else {
      ctx.status = 401;
      ctx.throw("Authentication failed", 401);
    }
  } else {
    ctx.status = 401;
    ctx.throw("Authentication failed", 401);
  }
});

export default router.routes();

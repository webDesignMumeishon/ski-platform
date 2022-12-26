import Router from "@koa/router";

import userRoutes from "./user";
import postRoutes from "./post";
import commentRoutes from "./comment";
import likeRoutes from "./like";

const router = new Router();

router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);
router.use("/like", likeRoutes);

export default router.routes();

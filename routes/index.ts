import Router from "@koa/router";

import userRoutes from "./user";
import testingRoutes from "./testing";
import postRoutes from "./post";
import commentRoutes from "./comment";
import likeRoutes from "./like";
import resortRoute from "./resort";
import cityRoute from "./city";

const router = new Router();

router.use("/testing", testingRoutes);

router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);
router.use("/like", likeRoutes);
router.use("/resort", resortRoute);
router.use("/city", cityRoute);

export default router.routes();

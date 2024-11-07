import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";
const appRouter = Router();
appRouter.use("/user", userRoutes); //domain/api/v1/user
<<<<<<< HEAD
appRouter.use("/chat", chatRoutes); //domain/api/v1/chats
=======
appRouter.use("/chat", chatRoutes); //domain/api/v1/chat
>>>>>>> 1b2951236337411173891451c6ffa3adaf18c7bc
export default appRouter;
//# sourceMappingURL=index.js.map
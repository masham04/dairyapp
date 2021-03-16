import { signUp, signIn } from "../controllers/users.js";
import verifyRegistration from "../middleware/verifyRegistration.js";

export default app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/signup", [verifyRegistration], signUp);
  app.post("/signin", signIn);
};
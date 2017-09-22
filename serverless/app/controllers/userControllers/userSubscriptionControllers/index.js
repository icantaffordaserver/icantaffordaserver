import { Router } from "express";

import { sendVerificationEmail, sendPasswordResetEmail } from "./handlers";

const routes = Router();

// ROutes for /users/subscription/[FUNCTION_NAME]
routes.post("/sendVerificationEmail", sendVerificationEmail);
routes.post("/sendPasswordResetEmail", sendPasswordResetEmail);

export default routes;

import { Router } from "express";

import userSubscriptionControllers from "../controllers/userControllers/userSubscriptionControllers";
import userSchemaExtensionControllers from "../controllers/userControllers/userSchemaExtensionControllers";

const routes = Router();

// All microservice functions related to users type
//routes.use('/requestPipeline', userRequestPipelineControllers)
routes.use("/schemaExtension", userSchemaExtensionControllers);
routes.use("/subscription", userSubscriptionControllers);

export default routes;

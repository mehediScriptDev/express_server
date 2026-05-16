import { Router } from "express";
import profileServices from "./profile.services";
import profileController from "./profile.controller";
import profilesController from "./profile.controller";

const router = Router();

router.post("/",profilesController.profileController)

const profilesRoute = router;
export default profilesRoute;
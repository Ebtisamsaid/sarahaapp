

import { Router } from "express";
import * as userService from "./user.sevice.js"
import  isAuthenticated from "../../middleware/authentication.middleware.js";
import asynchandler from "../../utils/errorhandling/asynchandler.js";
import {  isAuthorized } from "../../middleware/authorization.middleware.js";
import { roles } from "../../DB/model/user.model.js";
import validation from "../../middleware/validation.middleware.js";
import { updateprofile } from "./user.validation.js";

const router=Router()

router.get("/profile",isAuthenticated,isAuthorized(roles),asynchandler(userService.profile))
router.patch("/profile/update",validation(updateprofile),isAuthenticated,isAuthorized(roles),asynchandler(userService.updateprofile))
router.get("/profile/:id",asynchandler(userService.shareprofile))
export default router
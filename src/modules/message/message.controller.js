import { Router } from "express";
import * as messageService from "./message.service.js"
import validation from "../../middleware/validation.middleware.js";
import { getallmesgval, MessageValidation } from "./message.validation.js";
import asynchandler from "../../utils/errorhandling/asynchandler.js"
import isAuthenticated from "../../middleware/authentication.middleware.js";
import {isAuthorized} from "../../middleware/authorization.middleware.js"
import { roles } from "../../DB/model/user.model.js";
import * as msgvalidation from"./message.validation.js"

const router=Router()
router.post("/",validation(msgvalidation.MessageValidation),asynchandler(messageService.sendMessage))
router.get("/:messageid",isAuthenticated,isAuthorized(roles),asynchandler(messageService.getsingleMessage))
router.get("/",isAuthenticated,isAuthorized(roles),validation(msgvalidation.getallmesgval),asynchandler(messageService.getallMessage))

export default router
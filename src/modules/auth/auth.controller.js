import express from "express"
import * as authService from "./auth.service.js"
import asynchandler from "../../utils/errorhandling/asynchandler.js"
import validation from "../../middleware/validation.middleware.js"
import * as validationSchema from "./auth.validation.js"
import isAuthenticated from "../../middleware/authentication.middleware.js"
const router=express()
router.post("/register",validation(validationSchema.registerSchema),asynchandler(authService.register))

router .post("/login",asynchandler(authService.login))
router .get("/acctivate-account/:token",asynchandler(authService.isacctivate))
router .patch("/update/password",validation(validationSchema.updatePassValidation),isAuthenticated,asynchandler(authService.updatepassword))
router.delete("/freeze-account",isAuthenticated,asynchandler(authService.freezeAccount))
export default router

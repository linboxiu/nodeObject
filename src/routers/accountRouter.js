const express=require("express")
const path = require("path")


const accountRouter=express.Router()

const accountControl=require(path.join(__dirname,"../controllers/accountcontroller.js"))

accountRouter.get("/login",accountControl.getloginpage)
accountRouter.get("/vcode",accountControl.getVcodeImg)
accountRouter.get("/register",accountControl.getregisterpage)


accountRouter.post("/register",accountControl.getregister)
accountRouter.post("/login",accountControl.getlogin)




module.exports=accountRouter



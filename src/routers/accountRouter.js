const express=require("express")
const path = require("path")


const accountRouter=express.Router()

const accountControl=require(path.join(__dirname,"../controllers/accountcontroller.js"))

accountRouter.get("/login",accountControl.getpage)
accountRouter.get("/vcode",accountControl.getVcodeImg)

module.exports=accountRouter



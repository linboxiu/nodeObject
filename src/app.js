//导入模块
const express=require("express")
const path=require("path")

//创建app
const app=express()

//设置内置中间件，对我们的静态资源进行处理
app.use(express.static(path.join(__dirname,"statics")))


//在app.js对浏览器的请求分开处理
const accountRouter=require(path.join(__dirname,"./routers/accountRouter"))
app.use("/account",accountRouter)


//启动
app.listen(3200,"127.0.0.1",err=>{
  if(err){
    console.log(err)
  }
  console.log("start")
})

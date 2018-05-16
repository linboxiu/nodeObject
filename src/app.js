//导入模块
const express=require("express")
const path=require("path")
const bodyParser=require("body-parser")
var session = require('express-session')

//创建app
const app=express()

//设置内置中间件，对我们的静态资源进行处理
app.use(express.static(path.join(__dirname,"statics")))
//处理post方法发送过来的数据
app.use(bodyParser.urlencoded({ extended: false }))

// Use the session middleware
// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 10*60000 }}))
app.use(session({  
  resave: false, //添加 resave 选项  
  saveUninitialized: true, //添加 saveUninitialized 选项  
  secret: 'aF,.j)wBhq+E9n#aHHZ91Ba!VaoMfC', // 建议使用 128 个字符的随机字符串  
  cookie: { maxAge: 60 * 1000 }  
})); 




//在app.js对浏览器的请求分开处理
const accountRouter=require(path.join(__dirname,"./routers/accountRouter"))
app.use("/account",accountRouter)

const studentManagerRouter=require(path.join(__dirname,"./routers/studentManagerRouter"))
app.use("/studentmanger",studentManagerRouter)

//启动
app.listen(3200,"127.0.0.1",err=>{
  if(err){
    console.log(err)
  }
  console.log("start")
})


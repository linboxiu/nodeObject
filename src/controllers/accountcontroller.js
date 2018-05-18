//导入模块
const path=require("path")
const captchapng=require("captchapng")
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'student_info';

/**
 * 暴露的返回登录页面的方法
 */

exports.getloginpage=(req,res)=>{

  res.sendFile(path.join(__dirname,"../statics/views/login.html"))

}


/**
 * 暴露一个返回图片验证码的方法
 */

exports.getVcodeImg=(req,res)=>{

  let vcode = parseInt(Math.random() * 9000 + 1000)
    
    //把生成好的验证码，存在session中
    req.session.vcode = vcode



  var p = new captchapng(80,30,vcode); // width,height,numeric captcha
  p.color(255, 255, 255, 0);  // First color: background (red, green, blue, alpha)
  p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
  var img = p.getBase64();
  var imgbase64 = new Buffer(img,'base64');
  res.writeHead(200, {
      'Content-Type': 'image/png'
  });
  res.end(imgbase64);

}

exports.getregisterpage=(req,res)=>{
  res.sendFile(path.join(__dirname,"../statics/views/register.html"))
}

exports.getregister=(req,res)=>{
  const result={
    status:0,
    message:"注册成功"
  }

  MongoClient.connect(url, function(err, client) {
 
    const db = client.db(dbName);

    const collection = db.collection('register');
  // Find some documents
  collection.find({passname:req.body.passname}).toArray(function(err, docs) {
      
    
    if(docs.length !=0 ){
        result.status=1
        result.message="用户名已经被使用"
      }else{
        collection.insertOne(
          req.body
        , function(err, result) {
          console.log(result)
        });
      }
      client.close();
      res.json(result)

  }); 
  });
 


 
}


exports.getlogin=(req,res)=>{
  
  
  const result={
    status:0,
    message:"登录成功"
  }

  if(req.session.vcode!=req.body.vcode){
    result.status=1
    result.message="验证码不正确"
  
    res.json(result)
    return
  }

  MongoClient.connect(url, function(err, client) {
 
    const db = client.db(dbName);

    const collection = db.collection('register');
  // Find some documents
  collection.findOne({passname:req.body.passname,password:req.body.password},function(err, doc) {
      console.log({passname:req.body.passname,password:req.body.password})
    
    if(doc ==null ){
       
        result.status=2
        result.message="用户名或密码错误"
      }
      client.close();
      res.json(result)

  });
   
  });
 
}
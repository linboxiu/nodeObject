//导入模块
const path=require("path")
const captchapng=require("captchapng")

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
  var p = new captchapng(80,30,parseInt(Math.random()*9000+1000)); // width,height,numeric captcha
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
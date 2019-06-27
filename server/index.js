



const express = require("express");
const bodyParser = require("body-parser");
var cors =require("cors");
const path = require("path");
const fs=require('fs'); 
const { toBuffer }  = require("./utils/tools.js");

const app = express();

app.use(bodyParser());
app.use(bodyParser.json({limit: 10 * 1024 * 1024}));
app.use(bodyParser.raw({limit: 10 * 1024 * 1024}));
app.use(bodyParser.text({limit: 10 * 1024 * 1024}));
app.use(bodyParser.urlencoded({limit: 10 * 1024 * 1024, extended: true, parameterLimit:500000}));

app.use(cors());

app.use('/public',express.static('public'));
app.use('/upload',express.static('upload'));

const downloadFileRouter = require("./routers/downloadFile.js");

app.use("/downloadFile",downloadFileRouter);



var file=path.resolve(__dirname,"./upload/1.2.392.200036.9116.2.6.1.5.101779219.1536498949.127858.dcm"); 
var content=new Buffer(0);//累计合并读取片段 
fs.readFile(file,function(err,chunk){ 
    if(err) return console.error(err); 
    // console.log(chunk); //将图片转换成base64 字符串 
    // console.log(chunk.toString('base64')); 
    // console.info('*********************'); //合并Buffer 
    content=Buffer.concat([content,chunk]); 
    //console.log(content.toString('base64')); //将base64字符串转换成二进制保存成图片 
    var imgData=new Buffer(content,'base64'); 
    fs.writeFile(path.resolve(__dirname,'./upload/logo.dcm'),imgData,function(err){ 
        if(err) return 
        console.error(err); 
        console.log('保存文件成功'); 
    }); 
});


app.listen(8086,function(){

    console.log("启动了");
});




















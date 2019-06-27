
const express = require("express");
const router = express.Router();
const fs = require("fs");

const { resolve } = require("path");
const { toArrayBuffer }  = require("../utils/tools.js");


router.get("/singleDicom",function(req,res){

    var prefix = "http://" + req.headers.host;

    var file=resolve(__dirname,"../upload/1.2.392.200036.9116.2.6.1.5.101779219.1536498949.127858.dcm"); 
    var content=new Buffer(0);//累计合并读取片段 
    fs.readFile(file,function(err,chunk){ 
        if(err) return console.error(err); 
        // console.log(chunk); //将图片转换成base64 字符串 
        // console.log(chunk.toString('base64')); 
        // console.info('*********************'); //合并Buffer 
        content=Buffer.concat([content,chunk]); 
        //console.log(content.toString('base64')); //将base64字符串转换成二进制保存成图片 
        //var imgData=new Buffer(content,'base64'); 
        var imgData=new Buffer(content,'base64'); 
        // fs.writeFile(path.resolve(__dirname,'./upload/logo.dcm'),imgData,function(err){ 
        //     if(err) return 
        //     console.error(err); 
        //     console.log('保存文件成功'); 
        // }); 

        console.log(imgData)


        res.send({
            state:'ok',
            data:{
                url:prefix + "/upload/1.2.392.200036.9116.2.6.1.5.101779219.1536498949.127858.dcm",
                buffer:imgData
            }
        })
    });

    
});




module.exports = router;

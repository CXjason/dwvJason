/** 
 * Application launcher.
 */

// check browser support
dwv.browser.check();

// launch when page is loaded
$(document).ready( function()
{
    // main application
    var myapp = new dwv.App();

    // initialise the application
    myapp.init({
        "containerDivId": "dwv",
        "fitToWindow": true,
        "tools": ["Scroll", "Window/Level", "Zoom/Pan", "Draw", "Livewire", "Filter"],
        "filters": ["Threshold", "Sharpen", "Sobel"],
        "shapes": ["Line", "Protractor", "Rectangle", "Roi", "Ellipse"],
        "gui": ["tool", "load", "help", "undo", "version", "tags"],
        "isMobile": true
    });
    
    // example app listening
    //var listener = function (event) { console.log("event: "+event.type); };
    //myapp.addEventListener("load-end", listener);
    //myapp.addEventListener("load-progress", listener);
    //myapp.addEventListener("draw-create", listener);
    //myapp.addEventListener("draw-move", listener);
    //myapp.addEventListener("draw-change", listener);
    //myapp.addEventListener("draw-delete", listener);
    //myapp.addEventListener("wl-change", listener);
    //myapp.addEventListener("colour-change", listener);
    //myapp.addEventListener("position-change", listener);
    //myapp.addEventListener("slice-change", listener);

    var size = dwv.gui.getWindowSize();
    $(".layerContainer").height(size.height);


    fetchDicomImage(function(data){

        var buffer = data.buffer;
  
        var aBuffer = [toArrayBuffer(buffer.data),toArrayBuffer(buffer.data)];

        myapp.loadImageArrayBuffer(aBuffer);
  
    });
  

});



//获取影像系列
function fetchDicomImage(callback){


    $.get("http://127.0.0.1:8086/downloadFile/singleDicom",function(res){

      console.log(res);
      //console.log(toArrayBuffer(res.data.base64))

      if(res.state == "ok"){

        let data = res.data;

        if(callback){
          callback(data);
        }

      }
      });
}
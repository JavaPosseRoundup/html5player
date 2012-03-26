$(function() {
$('canvas').addClass('all');
$( "div.canvasWrapper" ).draggable();
$( "canvas" ).resizable({ aspectRatio:true });

});

function removeFrameBackground(ctx,targetR,targetG,targetB,threshold,width,height) {
	var imgData=ctx.getImageData(0,0,width,height);
			var imgDataArray=imgData.data;
			//var i=0;
			for (var i=0;i<imgDataArray.length;i+=4) {
			  var red=imgDataArray[i];
			  var green=imgDataArray[i+1];
			  var blue=imgDataArray[i+2];
			  
			  var dist=Math.sqrt((red-targetR)*(red-targetR)+(green-targetG)*(green-targetG)+(blue-targetB)*(blue-targetB));
			  if (dist<threshold) {
				imgDataArray[i+3]=0;
			  }
			 
			}
			ctx.putImageData(imgData,0,0);
}
var fieldsetT = document.getElementById('fieldset12');
var diNewWidth = document.getElementById('canvasWidthIn');
var diNewHeight = document.getElementById('canvasHeightIn');
var canvas = document.getElementById("CanvasID");
var ctx = canvas.getContext("2d");
var c =canvas;
var BorderBuffer=1;
//
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
ctx.fillStyle = "rgba(255, 255, 255, 1)";
ctx.fillRect(0,0,canvasWidth,canvasHeight);
var pixelCount=(canvasWidth-BorderBuffer)*(canvasHeight-BorderBuffer);
//Dimentions
function newDimentions(){
	canvas.height=diNewHeight.value;
	canvas.width=diNewWidth.value;
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
	ctx.fillStyle = "rgba(255, 255, 255, 1)";
	ctx.fillRect(0,0,canvasWidth,canvasHeight);
	pixelCount=(canvasWidth-BorderBuffer)*(canvasHeight-BorderBuffer);
}

function gameOfLife(steps){
var imgData=ctx.getImageData(0,0,c.width,c.height);
var ArLength=imgData.data.length;
var alive=0;
for(x=0;x<ArLength;x+=4){
	alive=0;
	//top/bottom
	if(imgData.data[x-(c.width*4)]==0){alive++;}
	if(imgData.data[x+(c.width*4)]==0){alive++;}
	//top/bottom left
	if(imgData.data[x-4-(c.width*4)]==0){alive++;}
	if(imgData.data[x-4+(c.width*4)]==0){alive++;}
	//top/bottom right
	if(imgData.data[x+4-(c.width*4)]==0){alive++;}
	if(imgData.data[x+4+(c.width*4)]==0){alive++;}
	//left/right
	if(imgData.data[x-4]==0){alive++;}
	if(imgData.data[x+4]==0){alive++;}
	//logic
	if(alive<3){
		imgData.data[x]=imgData.data[x+1]=imgData.data[x+2]=255;
	}else if(alive>4){
		imgData.data[x]=imgData.data[x+1]=imgData.data[x+2]=255;
	}else if(alive==3&&imgData.data[x]==255){
		imgData.data[x]=imgData.data[x+1]=imgData.data[x+2]=0;
	}
}
	ctx.putImageData(imgData,0,0);
	steps-=1;
	if(steps<1){return 1;}
	setTimeout(function(){gameOfLife(steps);},0);	
}


function UploadPrt()
{
    var inputFileToLoad = document.createElement("input");
    inputFileToLoad.type = "file";
    inputFileToLoad.id = "inputFileToLoad";
    fieldsetT.appendChild(inputFileToLoad);

    var buttonLoadFile = document.createElement("button");
    buttonLoadFile.onclick = loadImageFileAsURL;
    buttonLoadFile.textContent = "Load Selected File";
    fieldsetT.appendChild(buttonLoadFile);

    var drawImg = document.createElement("button");
    drawImg.onclick = drawImage;
    drawImg.textContent = "draw image";
    fieldsetT.appendChild(drawImg);
}
//<button onclick="drawImage()">draw image</button>
function loadImageFileAsURL()
{
    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0)
    {
        var fileToLoad = filesSelected[0];

        if (fileToLoad.type.match("image.*"))
        {
            var fileReader = new FileReader();
            fileReader.onload = function(fileLoadedEvent) 
            {
                var imageLoaded = document.getElementById("srcImg");
                imageLoaded.src = fileLoadedEvent.target.result;
            };
            fileReader.readAsDataURL(fileToLoad);
        }
    }
}
UploadPrt();

function deltaColor(color, delta){
var imgData=ctx.getImageData(0,0,c.width,c.height);
	for (var i=0;i<imgData.data.length;i+=4){
		  imgData.data[i+color]=delta+imgData.data[i+color];
	}
	ctx.putImageData(imgData,0,0);
}

var colorRate=100;
var colorStop=0;
function noColors(){
var imgData=ctx.getImageData(0,0,c.width,c.height);
for(x=0;x<imgData.data.length;x+=4){
	//||imgData.data[x+c.width+2]==0
	if(imgData.data[x-2]==0){
		imgData.data[x]-=22;
	}
	if(imgData.data[x]==0){
		imgData.data[x+1]-=22;
	}
	if(imgData.data[x+1]==0){
		imgData.data[x+2]-=23;
	}
}
	if(c.width*c.height==checkImage()||colorStop==1){colorStop=0;return 1;}
	ctx.putImageData(imgData,0,0);
	setTimeout(function(){noColors();},colorRate);	
}//line function
function noLines(){
var imgData=ctx.getImageData(0,0,c.width,c.height);
var ArLength=imgData.data.length;
var burnRate=10;
for(x=0;x<ArLength;x+=4){
	if(imgData.data[x-4-(c.width*4)]==0||imgData.data[x+4+(c.width*4)]==0||imgData.data[x-4]==0||imgData.data[x+4]==0){imgData.data[x]-=burnRate;}
	if(imgData.data[x-3-(c.width*4)]==0||imgData.data[x+5+(c.width*4)]==0||imgData.data[x-3]==0||imgData.data[x+5]==0){imgData.data[x+1]-=burnRate;}
	if(imgData.data[x-2-(c.width*4)]==0||imgData.data[x+6+(c.width*4)]==0||imgData.data[x-2]==0||imgData.data[x+6]==0){imgData.data[x+2]-=burnRate;}
}
	if(c.width*c.height==checkImage()||colorStop==1){colorStop=0;return 1;}
	ctx.putImageData(imgData,0,0);
	setTimeout(function(){noLines();},colorRate);	
}//blob function
function checkImage(){
var imgData=ctx.getImageData(0,0,c.width,c.height);
var count=0;
for(x=0;x<imgData.data.length;x+=4){
	if(imgData.data[x]==0&&imgData.data[x+1]==0&&imgData.data[x+2]==0){count++;}
		
	}
return count;
}

var aveRed=0;
var aveGreen=0;
var aveBlue=0;
function averagePixel(){
	for(y=BorderBuffer;y<canvasHeight-BorderBuffer;y++){
		for(x=BorderBuffer;x<canvasWidth-BorderBuffer;x++){
			imgData=ctx.getImageData(x,y,1,1);
			aveRed+=imgData.data[0];
			aveGreen+=imgData.data[1];
			aveBlue+=imgData.data[2];	
		}
	}
		aveRed=Math.floor(aveRed/pixelCount);
		aveGreen=Math.floor(aveGreen/pixelCount);
		aveBlue=Math.floor(aveBlue/pixelCount);

		//console.log(aveRed,aveGreen,aveBlue,pixelCount);
		ctx.fillStyle ="rgba("+aveRed+","+aveGreen+","+aveBlue+", 1)";
		ctx.fillRect(0,0,canvasWidth,canvasHeight);
}

function drawImage(){
	var img=document.getElementById("srcImg");
	ctx.drawImage(img,0,0,canvasWidth,canvasHeight);
}

function colorBias(){		
	ctx.fillStyle ="rgba(0,0,0, 1)";
	ctx.fillRect(0,0,canvasWidth,canvasHeight);
}

var rndRed;
var rndGreen;
var rndBlue;
function sinRainbow(){
	var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
	for (var i=0;i<imgData.data.length;i+=4){	
			rndRed=Math.floor((Math.cos(i-2)) * 255);	
			rndBlue=Math.floor((Math.cos(i)) * 255);	
			rndGreen=Math.floor((Math.cos(i+2)) * 255);
			imgData.data[i]=rndRed;	
			imgData.data[i+1]=rndGreen;
			imgData.data[i+2]=rndBlue;
	}
	ctx.putImageData(imgData,0,0);
}

function rndRainbow(){
	var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
	for (var i=0;i<imgData.data.length;i+=4){	
			rndRed=Math.floor(Math.random() * 256);	
			rndBlue=Math.floor(Math.random() * 256);	
			rndGreen=Math.floor(Math.random() * 256);
			imgData.data[i]=rndRed;	
			imgData.data[i+1]=rndGreen;
			imgData.data[i+2]=rndBlue;
	}
	ctx.putImageData(imgData,0,0);
}




function rndGen(){
	for(y=BorderBuffer;y<canvasHeight-BorderBuffer;y++){
		for(x=BorderBuffer;x<canvasWidth-BorderBuffer;x++){	
			rndPixel=Math.floor(Math.random() * 110);
			imgData=ctx.getImageData(x,y,1,1);
			if(rndPixel>70){
				imgData.data[0]=0;
				imgData.data[1]=0;
				imgData.data[2]=0;
			}else{
				imgData.data[0]=255;
				imgData.data[1]=255;
				imgData.data[2]=255;
			}
			ctx.putImageData(imgData,x,y);	
		}
	}
}

var imgData;
var midTest=128;
function MonoChrome(){
	var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
	for (var i=0;i<imgData.data.length;i+=4){
		if(imgData.data[i]<midTest){
			imgData.data[i]=0;
		}else{
			imgData.data[i]=255;
		}
		if(imgData.data[i+1]<midTest){
			imgData.data[i+1]=0;
		}else{
			imgData.data[i+1]=255;
		}
		if(imgData.data[i+2]<midTest){
			imgData.data[i+2]=0;
		}else{
			imgData.data[i+2]=255;
		}
	}
	ctx.putImageData(imgData,0,0);
}

//INVERT
function invertLoop(){
var imgData=ctx.getImageData(0,0,c.width,c.height);
	for (var i=0;i<imgData.data.length;i+=4){
		  imgData.data[i]=255-imgData.data[i];
		  imgData.data[i+1]=255-imgData.data[i+1];
		  imgData.data[i+2]=255-imgData.data[i+2];
		  imgData.data[i+3]=255;
	}
	ctx.putImageData(imgData,0,0);
}
asciiArray =[];
for( var i = 0; i <= 128; i++ ){
    asciiArray[i]=String.fromCharCode(i);
};
//
INtrigger=511;
INincrement=1;
INColorRate=0;
function invertLooped(){
var imgData=ctx.getImageData(0,0,c.width,c.height);
	for (var i=0;i<imgData.data.length;i+=4){		
		  if(imgData.data[i]+INincrement>255){
		  	imgData.data[i]-=255-INincrement;
		  }else if(imgData.data[i]+INincrement<0){
		  	imgData.data[i]+=255-INincrement;
		  }else{imgData.data[i]+=INincrement;}

		  if(imgData.data[i+1]+INincrement>255){
		  	imgData.data[i+1]-=255-INincrement;
		  }else if(imgData.data[i+1]+INincrement<0){
		  	imgData.data[i+1]+=255-INincrement;
		  }else{imgData.data[i+1]+=INincrement;}

		  if(imgData.data[i+2]+INincrement>255){
		  	imgData.data[i+2]-=255-INincrement;
		  }else if(imgData.data[i+2]+INincrement<0){
		  	imgData.data[i+2]+=255-INincrement;
		  }else{imgData.data[i+2]+=INincrement;}
		  //if(Math.floor(i%canvasWidth)==1){console.log("TRUE");}//255=length
	}
	ctx.putImageData(imgData,0,0);
	if(INtrigger==-100){INtrigger=1;return 0;}//stop
	if(INtrigger>0){
		setTimeout(function(){invertLooped();},INColorRate);
	}else{
		INtrigger=511;
		INincrement*=-1;
		setTimeout(function(){invertLooped();},INColorRate);		
	}
	INtrigger--;
}
//INVERT END

//ASCII
asciiArray =[];
for( var i = 0; i <= 128; i++ ){
    asciiArray[i]=String.fromCharCode(i);
};

asciiOut=document.getElementById("output10");
var trigger=999;
var charSpace=255;
//
function textToImage(){
	//code
}
function imageToText(){
	var imgData=ctx.getImageData(0,0,c.width,c.height);
	var outputT=0;
	var Tsum=0;
	var midpoint=128;
	for(x=8;x<imgData.data.length;x+=4){
		outputT=0;
		outputT=Math.floor((61/500)*((imgData.data[x])+(imgData.data[x+1])+(imgData.data[x+2])));//RED,GREEN,BLUE
		//if(outputT<33||outputT>126){outputT=48;}
		//if(imgData.data[x]>128){outputT=48}else{outputT=49}
		outputT+=33;
		Tsum+=asciiArray[outputT];
		//console.log(outputT);//213Char @ 9px font//2164;
		fourX=Math.ceil(x/4);
		if(x>1&&fourX%charSpace==0){Tsum+=asciiArray[32];}
		//console.log(x>0&&x%charSpace==0)
	}
	//console.log(Tsum);
	var Tsum=Tsum.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
	asciiOut.innerHTML=Tsum;
	//loop
	if(trigger==-100){trigger=1;return 0;}//stop
	if(trigger>0){
		setTimeout(function(){imageToText();},10);
		trigger=999;	
	}
	trigger--;
	//code
}//IMG-TXT END
//HEATMAP SRT
function heatMap(rgbChannel){
if(rgbChannel!=0&&rgbChannel!=1&&rgbChannel!=2){return 1;}
var imgData=ctx.getImageData(0,0,c.width,c.height);
		for (var i=0;i<imgData.data.length;i+=4){
		pixHeat=0;
		if(i+rgbChannel-c.width*4-4>-1){pixHeat+=imgData.data[i+rgbChannel-c.width*4-4];}else{pixHeat+=128};
		if(i+rgbChannel-c.width*4>-1){pixHeat+=imgData.data[i+rgbChannel-c.width*4]}else{pixHeat+=128};
		if(i+rgbChannel-c.width*4+4>-1){pixHeat+=imgData.data[i+rgbChannel-c.width*4+4];}else{pixHeat+=128};
		if(i+rgbChannel-4>-1){pixHeat+=imgData.data[i+rgbChannel-4];}else{pixHeat+=128};
		pixHeat+=imgData.data[i+rgbChannel];
		if(i+rgbChannel+4>-1){pixHeat+=imgData.data[i+rgbChannel+4];}else{pixHeat+=128};
		if(i+rgbChannel+c.width*4-4>-1){pixHeat+=imgData.data[i+rgbChannel+c.width*4-4];}else{pixHeat+=128};
		if(i+rgbChannel+c.width*4>-1){pixHeat+=imgData.data[i+rgbChannel+c.width*4];}else{pixHeat+=128};
		if(i+rgbChannel+c.width*4+4>-1){pixHeat+=imgData.data[i+rgbChannel+c.width*4+4];}else{pixHeat+=128};
		//
		imgData.data[i+rgbChannel]=pixHeat*0.11111;
	}//range 0-2295 //resoution 9 per 1
	ctx.putImageData(imgData,0,0);
}//HEATMAP END
function stopLOOPS(){
	trigger=-100;
	INtrigger=-100;
	colorStop=1;
}

$("body").css("background-color", "rgb(100,100,100)");
$("<form>").attr("id","inputDiv").css("background-color", "lightgray").css("padding","5px").appendTo("body");
$("<input type='text'>").attr("value","inputTxt").css("background-color", "rgb(150,150,150)").attr("name","rawText").appendTo("form");
$("<input type='submit'>").css("background-color", "rgb(150,150,150)").appendTo("form");

$("<form>").attr("id","imgDiv").css("background-color", "lightgray").css("padding","5px").appendTo("body");
$("<img>").attr("hidden","hidden").attr("id","srcImg").attr("src","").appendTo("#imgDiv");
$("<input>").attr("type","file").attr("id","inputFileToLoad").appendTo("#imgDiv");
$("<button>").attr("type","button").attr("onclick","loadImageFileAsURL()").attr("textContent","Load Selected File").text("load Img").appendTo("#imgDiv");
$("<button>").attr("type","button").attr("onclick","drawImage()").attr("textContent","draw image").text("Apply Img").appendTo("#imgDiv");
$("<input type='submit'>").css("background-color", "rgb(150,150,150)").appendTo("#imgDiv");

$("<canvas>").attr("width","240px").attr("height","240px").attr("id","outputCanvas").appendTo("body");
$("<div>").css("word-wrap","break-word").attr("id","outputDiv").css("background-color", "lightgray").css("padding","5px").appendTo("body");
var oC= $("#outputCanvas")[0];
var ctx = oC.getContext("2d");
//
var scaleVal=1;
var myInStr="";
var inASCII=[];
var outASCII=[];
var inImg=[];
var asciiArray=[];
for( var i = 32; i < 127; i++ ){
    asciiArray[i-32] = String.fromCharCode(i);
};
//---------Functions-----------//
function cleanASCII(inStr){
	inASCII=[];
	myInStr=inStr.replace(/[^\x00-\x7F]/g,"?");
	for(i=0;i<inStr.length;i++){
		inASCII[i]=inStr.charCodeAt(i)-32;
	}
}
function drawImage(){
	ctx.drawImage(document.getElementById("srcImg"),0,0,oC.width,oC.height);
}
function canvasDim(widthDim,heightDim){
	oC.width=widthDim;oC.height=heightDim;
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0,0,oC.width,oC.height);
}canvasDim(80,80);
function placeDot(inX,inY,inRGB){
	ctx.fillStyle = inRGB;
	ctx.fillRect(inX,inY,1,1);
}
function loopDot(){
	cleanASCII(myInStr);
	//console.log(inASCII);
	inLen=inASCII.length;
	for(i=0;i<((oC.width/scaleVal)*(oC.height/scaleVal));i++){
		inR=Math.ceil(2.71*inASCII[(3*i)%inLen]);
		inG=Math.ceil(2.71*inASCII[(3*i+1)%inLen]);
		inB=Math.ceil(2.71*inASCII[(3*i+2)%inLen]);
		placeDot(i%oC.width,Math.floor(i/oC.width),"rgb("+inR+","+inG+","+inB+")")
	}
	console.log("loopDot Done");
}
function imgData(){
	var imgData=ctx.getImageData(0,0,oC.width,oC.height);
	var ArLength=imgData.data.length;
	for(i=0;i<ArLength;i+=4){
		temp=-Math.floor(i/4);
		inImg[i+temp]=Math.floor(imgData.data[i]/2.71);
		inImg[i+1+temp]=Math.floor(imgData.data[i+1]/2.71);
		inImg[i+2+temp]=Math.floor(imgData.data[i+2]/2.71);
	}
}
var newStr="";
function imgToTxt(){
	newStr="";imgData();
	for(i=0;i<inImg.length;i++){
		newStr+=String.fromCharCode(inImg[i]+32);
		//newStr+=inImg[i]+",";
	};
	if(oC.width<200||oC.height<200){
		$("#outputDiv").text(newStr);
	}
	console.log("imgToTxt Done, newStr");
}
//
$("#inputDiv").on("submit", function(event){
	event.preventDefault();

	myInStr= $(this).find("[name=rawText]").val();
	loopDot();
})
$("#imgDiv").on("submit", function(event){
	event.preventDefault();

	imgToTxt();
})
//
function loadImageFileAsURL(){
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
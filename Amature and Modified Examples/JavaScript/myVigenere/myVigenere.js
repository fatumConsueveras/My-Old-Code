msgOutput=document.getElementById('outputMsg');
inputMsg=document.getElementById('inputMsg');
inputPass=document.getElementById('inputPass');
inputBlock=document.getElementById('inputBlock');
//end HTML
var uniArray=[];
var uniPairs=[];
var asciiArray=[];
var asciiPairs=[];
var uniBlocks = [
	[256,5120,10240,9728,9632,10624,42560,10752],
	[687,5759,10495,9983,9727,10751,42655,11007]
];
var uniSize = 0;
var asciiSize = 0;
//End Var
function genASCIIpairs(){
for( var i = 32; i <= 127; i++ ){
    asciiArray[i-32] = String.fromCharCode(i);
};
asciiSize=asciiArray.length;
	count=0;
	for(i=0;i<asciiSize;i++){
	for(ii=0;ii<asciiSize;ii++){
		asciiPairs[count]=asciiArray[i]+asciiArray[ii];
		count++;
	}}
}
genASCIIpairs();

function genUNIpairs(){
	count=0;
	uniPairs=[];
	for(i=0;i<uniSize;i++){
	for(ii=0;ii<uniSize;ii++){
		uniPairs[count]=uniArray[i]+uniArray[ii];
		count++;
	}}
}
function setUniBlocks(){
	uniArray=[];
	blockID = inputBlock.value;
	for( var i = uniBlocks[0][blockID]; i <= uniBlocks[1][blockID]; i++ ){
	    uniArray[i-uniBlocks[0][blockID]] = String.fromCharCode(i);
	}
uniSize=uniArray.length;
genUNIpairs();
//console.log(uniArray,uniPairs,uniSize);
}
setUniBlocks();
//GEN END
//FUNCTIONS
function normalEncryption(cryptoMode){
	if(inputMsg.value.length<1){return 2;}
	if(inputPass.value==undefined||inputPass.value==""){
		inputPass.value=asciiArray[0];
	}
	printString="";
	inputMsgArray=inputMsg.value.split("");
	inputPassArray=inputPass.value.split("");
	inputPassSize=inputPassArray.length;
	for(i=0;i<inputMsg.value.length;i++){
		indexMsgA = asciiArray.indexOf(inputMsgArray[i]);
		indexPassA = asciiArray.indexOf(inputPassArray[i%inputPassSize]);
		indexOutA = (indexMsgA+cryptoMode*indexPassA+asciiSize)%asciiSize;
		//console.log("[i]:"+i,"Index:"+indexOutA,"partA:"+indexMsgA,"partB:"+indexPassA);
		printString=printString+asciiArray[indexOutA];
	}
	printString=printString.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
	msgOutput.innerHTML=printString;
	//console.log("output:"+printString);
}
//Uni
function uniEncrypt(cryptoMode){
	if(inputMsg.value.length<1){return 2;}
	if(inputMsg.value.length%2>0){
		inputMsg.value+=" ";
	}
	printString="";
	inputMsgArray=inputMsg.value.split("");
	if(cryptoMode>0){
		if(inputMsgArray[0].charCodeAt(0)>127){return 2;}		
		for(i=0;i<inputMsgArray.length;i+=2){
			searchPair = inputMsgArray[i]+inputMsgArray[i+1];
			indexMsgA = asciiPairs.indexOf(searchPair);
			printString = printString+uniPairs[indexMsgA];
			//console.log(searchPair,indexMsgA);
		}
	}else{
		if(inputMsgArray[0].charCodeAt(0)<127){return 2;}
		for(i=0;i<inputMsgArray.length;i+=2){
			searchPair = inputMsgArray[i]+inputMsgArray[i+1];
			indexMsgA = uniPairs.indexOf(searchPair);
			printString = printString+asciiPairs[indexMsgA];
			//console.log(searchPair,indexMsgA);
		}
	}
	printString=printString.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
	msgOutput.innerHTML=printString;
}
//test functions
function printArray(myArray){
	printString="";
	for(i=0;i<myArray.length;i++){
		printString=printString+myArray[i]+"_";
	}
	printString=printString.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
	msgOutput.innerHTML=printString;
}
//myOutput=myOutput.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

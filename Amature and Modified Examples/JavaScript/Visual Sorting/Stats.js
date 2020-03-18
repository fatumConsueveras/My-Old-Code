var display = document.getElementById('dataTable');

dataBar=new Object();
dataBar.name="name";
dataBar.color="rbg(1,1,1)";
dataBar.percent=0;
dataBar.ID=0;
dataBar.htmlList=[];

rawData=new Object();
dataBar.htmlInsert=0;
rawData.inputList=[[0],[0],[0]];
rawData.rowNames=['Lbl0','Lbl1','Lbl2'];
rawData.placeValue=[];

rawOrder=[[],[],[]];
newOrder=[[],[],[]];

var tableTemplate="<tr id='TableHead'><td>Name</td><td>Value A</td><td>Value B</td><td>Value C</td><td>Place</td></tr>"
function htmlPrep(rowID,rowName,valueA,valueB,valueC,place){
	temp ="<tr id=row"+rowID+"><td class='dataName'>["+rowName+"]</td><td class='dataValue'>["+valueA+"]</td><td class='dataValue'>["+valueB+"]</td><td class='dataValue'>["+valueC+"]</td><td class='dataOrderScore'>["+place+"]</td></tr>";
	return temp;
}
dataBar.create = function(){
		dataBar.htmlInsert=htmlPrep(
			dataBar.ID,
			dataBar.name,
			rawData.inputList[0][dataBar.ID],
			rawData.inputList[1][dataBar.ID],
			rawData.inputList[2][dataBar.ID],
			rawData.placeValue[dataBar.ID],
		);
		display.insertAdjacentHTML('beforeend',dataBar.htmlInsert);
		dataBar.htmlList[dataBar.ID]=document.getElementById("row"+dataBar.ID+"");
		dataBar.htmlList[dataBar.ID].style.backgroundColor="rgb(100,100,200)";
		//colors
	
}
rawData.InitialOrder=function(){
rawData.placeValue=[];
dataBar.htmlList=[];
rawOrder=[[],[],[]];
newOrder=[[],[],[]];
	document.getElementById('dataTable').innerHTML=tableTemplate;
	for (var i = 0; i < rawData.inputList[0].length; i++) {
		for(y=0;y<rawData.inputList.length;y++){
			newOrder[y][i]=rawOrder[y][i]=rawData.inputList[y][i];
		}
		dataBar.name=rawData.rowNames[i];
		if(dataBar.name==undefined){
			dataBar.name="Lbl"+i+"";
		}
		rawData.placeValue[i]=i;
		dataBar.ID=i;
		dataBar.create();
	}
}
rawData.InitialOrder();
rawData.rndGen=function(){
	for(y=0;y<3;y++){
	for(x=0;x<100;x++){
		rawData.inputList[y][x]=Math.round(Math.random()*9999)-4999;
	}}
rawData.InitialOrder();
}
//rawData.rndGen();

rawData.findOrder=function(y){
	for (var i = 0; i < rawData.inputList[0].length; i++) {
		for(z=0;z<rawData.inputList.length;z++){
			newOrder[z][i]=rawOrder[z][i]=rawData.inputList[z][i];
	}}
	var indexVal=0;
	newOrder[y].sort(function(a, b){return b-a});
	for(x=0;x<rawOrder[y].length;x++){
		indexVal=rawOrder[y].indexOf(newOrder[y][x]);
		if(rawOrder[y][indexVal]!="click"){
			rawData.placeValue[x]=indexVal;
			rawOrder[y][indexVal]="click";
		//new table
		}	
	}
	//map of index value
}
rawData.reOrderChart=function(y){
	rawData.InitialOrder();
	rawData.findOrder(y);
	backNS=rawData.placeValue.length-1;
	for(x=0;x<rawData.placeValue.length;x++){
		dataBar.name=rawData.rowNames[rawData.placeValue[x]];
		if(dataBar.name==undefined){
			dataBar.name=rawData.rowNames[rawData.placeValue[x]]="Lbl"+rawData.placeValue[x]+"";
	}
		//color
		widthMax=maxHeight=Math.max.apply(Math, rawData.inputList[y]);
		widthMin=minHeight=Math.min.apply(Math, rawData.inputList[y]);
		middleZone=minHeight+maxHeight;
		totalDomain=Math.abs(minHeight-maxHeight)/2;
		xVal=newOrder[y][x];
		redZone=(-(1/totalDomain)*(xVal-widthMin)*(xVal-widthMin)+totalDomain)/totalDomain;
		greenZone=(-(1/totalDomain)*(xVal-middleZone)*(xVal-middleZone)+totalDomain)/totalDomain;
		blueZone=(-(1/totalDomain)*(xVal-widthMax)*(xVal-widthMax)+totalDomain)/totalDomain;
		newRed=redZone*255+100;
		newGreen=greenZone*255+100;
		newBlue=blueZone*255+100;
		dataBar.htmlList[x].style.backgroundColor="rgb("+newRed+","+newGreen+","+newBlue+")";
		//color
		dataBar.htmlList[x].innerHTML=htmlPrep(
			x,
			rawData.rowNames[rawData.placeValue[x]],
			rawData.inputList[0][rawData.placeValue[x]],
			rawData.inputList[1][rawData.placeValue[x]],
			rawData.inputList[2][rawData.placeValue[x]],
			x,
		);
	}
}
rawData.newData=function(){
	newValueName=document.getElementById('newValName').value;
	newValueA=document.getElementById('newValA').value;
	newValueB=document.getElementById('newValB').value;
	newValueC=document.getElementById('newValC').value;
	//parse 1
	newValueName=newValueName.split(",");
	newValueA=newValueA.split(",");
	newValueB=newValueB.split(",");
	newValueC=newValueC.split(",");
	//parse 2
	//parse end
	rawData.inputList=[newValueA,newValueB,newValueC]
	rawData.rowNames=newValueName;
	rawData.InitialOrder();
}

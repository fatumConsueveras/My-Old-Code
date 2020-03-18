var keyPressedTF=[];
var htmlBody=document.getElementById("bodyTag");
var htmlSuper=document.getElementById("superDiv");
var htmlDiv1=document.getElementById("div1");

var playerObj = new Object();
playerObj.vitalScore=document.getElementById("playerVitality");
playerObj.deathScore=document.getElementById("playerDeaths");
playerObj.killScore=document.getElementById("playerKills");
playerObj.vitality = 3;
playerObj.deathCount=0;
playerObj.killCount=0;
playerObj.turnSpeed = 2;
playerObj.aVar = 2;
playerObj.speed = 0;
playerObj.xHsize = 64;
playerObj.yHsize = 2;
playerObj.xSize = 21;
playerObj.ySize = 21;
playerObj.xRadius=Math.floor(playerObj.xSize/2);
playerObj.yRadius=Math.floor(playerObj.ySize/2);
playerObj.yCord = 550;
playerObj.xCord = 550;
playerObj.centerXCord = playerObj.xCord+playerObj.xRadius;
playerObj.centerYCord = playerObj.yCord+playerObj.yRadius;
playerObj.theta = 270;
playerObj.htmlOut = 0;
playerObj.htmlIn = '<div style="transform:rotate('+playerObj.theta+'deg);left:'+playerObj.xCord+'px;top:'+playerObj.yCord+'px;width:'+playerObj.xSize+'px;height:'+playerObj.ySize+'px;"; id="playerHtml" class="playerHtml"><div style="width:'+playerObj.xHsize+'px;height:'+playerObj.yHsize+'px;top:'+playerObj.yRadius+'px;left:'+playerObj.xRadius+'px;" class="playerHead"></div></div>';
playerObj.spawn = function(){
	playerObj.htmlIn = '<div style="transform:rotate('+playerObj.theta+'deg);left:'+playerObj.xCord+'px;top:'+playerObj.yCord+'px;width:'+playerObj.xSize+'px;height:'+playerObj.ySize+'px;"; id="playerHtml" class="playerHtml"><div style="width:'+playerObj.xHsize+'px;height:'+playerObj.yHsize+'px;top:'+playerObj.yRadius+'px;left:'+playerObj.xRadius+'px;" class="playerHead"></div></div>';	
	htmlSuper.insertAdjacentHTML('beforeend',playerObj.htmlIn);
	playerObj.htmlOut=document.getElementById("playerHtml");
	playerObj.vitalScore.innerHTML=playerObj.vitality;
	playerObj.killScore.innerHTML=playerObj.killCount;
	playerObj.deathScore.innerHTML=playerObj.deathCount;
	//console.log(playerObj.htmlOut);
}
playerObj.spawn();
playerObj.playerMove = function(){	
	playerObj.xCord=(playerObj.xCord+playerObj.speed*Math.cos(playerObj.theta*Math.PI/180))
	playerObj.yCord=(playerObj.yCord+playerObj.speed*Math.sin(playerObj.theta*Math.PI/180))
	playerObj.centerXCord = playerObj.xCord+playerObj.xRadius;
	playerObj.centerYCord = playerObj.yCord+playerObj.yRadius;
	htmlSuper.removeChild(playerObj.htmlOut);
	playerObj.spawn();
}
playerObj.death = function(){
	playerObj.deathCount+=1;
	playerObj.speed=0;
	playerObj.xCord=550;
	playerObj.yCord=550;
	playerObj.vitality=3;
	playerObj.centerXCord = playerObj.xCord+playerObj.xRadius;
	playerObj.centerYCord = playerObj.yCord+playerObj.yRadius;
	htmlSuper.removeChild(playerObj.htmlOut);
	playerObj.spawn();
}

var testObj = new Object();
testObj.dummy = new Object();
testObj.dummy.deathScore=document.getElementById("dummyDeaths");
testObj.dummy.killScore=document.getElementById("dummyKills");
testObj.dummy.vitalScore=document.getElementById("dummyVitality");
testObj.dummy.killCount=0;
testObj.dummy.deathCount=0;
testObj.dummy.vitality = 3;
testObj.dummy.turnSpeed = 2;
testObj.dummy.aVar = 2;
testObj.dummy.speed = 0;
testObj.dummy.xHsize = 64;
testObj.dummy.yHsize = 2;
testObj.dummy.xSize = 21;
testObj.dummy.ySize = 21;
testObj.dummy.xRadius=Math.floor(testObj.dummy.xSize/2);
testObj.dummy.yRadius=Math.floor(testObj.dummy.ySize/2);
testObj.dummy.yCord = 50;
testObj.dummy.xCord = 50;
testObj.dummy.centerXCord = testObj.dummy.xCord+testObj.dummy.xRadius;
testObj.dummy.centerYCord = testObj.dummy.yCord+testObj.dummy.yRadius;
testObj.dummy.theta = 270;
testObj.dummy.htmlOut = 0;
testObj.dummy.htmlIn = '<div style="transform:rotate('+testObj.dummy.theta+'deg);left:'+testObj.dummy.xCord+'px;top:'+testObj.dummy.yCord+'px;width:'+testObj.dummy.xSize+'px;height:'+testObj.dummy.ySize+'px;"; id="testObjHtml" class="testObjHtml"><div style="width:'+testObj.dummy.xHsize+'px;height:'+testObj.dummy.yHsize+'px;top:'+testObj.dummy.yRadius+'px;left:'+testObj.dummy.xRadius+'px;" class="testObjHead"></div></div>';
testObj.spawn = function(){
	testObj.dummy.htmlIn = '<div style="transform:rotate('+testObj.dummy.theta+'deg);left:'+testObj.dummy.xCord+'px;top:'+testObj.dummy.yCord+'px;width:'+testObj.dummy.xSize+'px;height:'+testObj.dummy.ySize+'px;"; id="testObjHtml" class="testObjHtml"><div style="width:'+testObj.dummy.xHsize+'px;height:'+testObj.dummy.yHsize+'px;top:'+testObj.dummy.yRadius+'px;left:'+testObj.dummy.xRadius+'px;" class="testObjHead"></div></div>';
	htmlSuper.insertAdjacentHTML('beforeend',testObj.dummy.htmlIn);
	testObj.dummy.htmlOut=document.getElementById("testObjHtml");
	testObj.dummy.vitalScore.innerHTML=testObj.dummy.vitality;
	testObj.dummy.killScore.innerHTML=testObj.dummy.killCount;
	testObj.dummy.deathScore.innerHTML=testObj.dummy.deathCount;
	//console.log(testObj.htmlOut);
}
testObj.spawn();
testObj.dummy.dummyMove = function(){	
	testObj.dummy.xCord=(testObj.dummy.xCord+testObj.dummy.speed*Math.cos(testObj.dummy.theta*Math.PI/180))
	testObj.dummy.yCord=(testObj.dummy.yCord+testObj.dummy.speed*Math.sin(testObj.dummy.theta*Math.PI/180))
	testObj.dummy.centerXCord = testObj.dummy.xCord+testObj.dummy.xRadius;
	testObj.dummy.centerYCord = testObj.dummy.yCord+testObj.dummy.yRadius;
	htmlSuper.removeChild(testObj.dummy.htmlOut);
	testObj.spawn();
}
testObj.redraw = function(){
	testObj.dummy.theta=playerObj.theta;
	testObj.dummy.xCord=playerObj.centerXCord+((playerObj.xHsize)*Math.cos(playerObj.theta*Math.PI/180))-testObj.dummy.xRadius;
	testObj.dummy.yCord=playerObj.centerYCord+((playerObj.xHsize)*Math.sin(playerObj.theta*Math.PI/180))-testObj.dummy.yRadius;
	testObj.dummy.centerXCord = testObj.dummy.xCord+testObj.dummy.xRadius;
	testObj.dummy.centerYCord = testObj.dummy.yCord+testObj.dummy.yRadius;
	htmlSuper.removeChild(testObj.dummy.htmlOut);
	testObj.spawn();
}
testObj.dummy.death = function(){
	testObj.dummy.deathCount+=1;
	testObj.dummy.speed=0;
	testObj.dummy.xCord=50;
	testObj.dummy.yCord=50;
	testObj.dummy.vitality=3;
	testObj.dummy.centerXCord = testObj.dummy.xCord+testObj.dummy.xRadius;
	testObj.dummy.centerYCord = testObj.dummy.yCord+testObj.dummy.yRadius;
	htmlSuper.removeChild(testObj.dummy.htmlOut);
	testObj.spawn();
}

testObj.dummy.a = new Object();
testObj.dummy.a.lifetime=100;
testObj.dummy.a.IsAvalableTF = 1;
testObj.dummy.a.speed = 0;
testObj.dummy.a.xHsize = 64;
testObj.dummy.a.yHsize = 2;
testObj.dummy.a.xSize = 15;
testObj.dummy.a.ySize = 7;
testObj.dummy.a.xRadius=Math.floor(testObj.dummy.a.xSize/2);
testObj.dummy.a.yRadius=Math.floor(testObj.dummy.a.ySize/2);
testObj.dummy.a.yCord = 370;
testObj.dummy.a.xCord = 620;
testObj.dummy.a.centerXCord = testObj.dummy.a.xCord+testObj.dummy.a.xRadius;
testObj.dummy.a.centerYCord = testObj.dummy.a.yCord+testObj.dummy.a.yRadius;
testObj.dummy.a.theta = 270;
testObj.dummy.a.htmlOut = 0;
testObj.dummy.a.hClass = "testBulletHead";
testObj.dummy.a.Class = "testBulletHtml";
testObj.dummy.a.ID = "testObjD_AHtml";
testObj.dummy.a.htmlIn = '<div style="transform:rotate('+testObj.dummy.a.theta+'deg);left:'+testObj.dummy.a.xCord+'px;top:'+testObj.dummy.a.yCord+'px;width:'+testObj.dummy.a.xSize+'px;height:'+testObj.dummy.a.ySize+'px;"; id="'+testObj.dummy.a.ID+'" class="'+testObj.dummy.a.Class+'"><div style="width:'+testObj.dummy.a.xHsize+'px;height:'+testObj.dummy.a.yHsize+'px;top:'+testObj.dummy.a.yRadius+'px;left:'+testObj.dummy.a.xRadius+'px;" class="'+testObj.dummy.a.hClass+'"></div></div>';

testObj.dummy.b = new Object();
testObj.dummy.b.lifetime=100;
testObj.dummy.b.IsAvalableTF = 1;
testObj.dummy.b.speed = 0;
testObj.dummy.b.xHsize = 64;
testObj.dummy.b.yHsize = 2;
testObj.dummy.b.xSize = 15;
testObj.dummy.b.ySize = 7;
testObj.dummy.b.xRadius=Math.floor(testObj.dummy.b.xSize/2);
testObj.dummy.b.yRadius=Math.floor(testObj.dummy.b.ySize/2);
testObj.dummy.b.yCord = 380;
testObj.dummy.b.xCord = 630;
testObj.dummy.b.centerXCord = testObj.dummy.b.xCord+testObj.dummy.b.xRadius;
testObj.dummy.b.centerYCord = testObj.dummy.b.yCord+testObj.dummy.b.yRadius;
testObj.dummy.b.theta = 270;
testObj.dummy.b.htmlOut = 0;
testObj.dummy.b.hClass = "testBulletHead";
testObj.dummy.b.Class = "testBulletHtml";
testObj.dummy.b.ID = "testObjD_BHtml";
testObj.dummy.b.htmlIn = '<div style="transform:rotate('+testObj.dummy.b.theta+'deg);left:'+testObj.dummy.b.xCord+'px;top:'+testObj.dummy.b.yCord+'px;width:'+testObj.dummy.b.xSize+'px;height:'+testObj.dummy.b.ySize+'px;"; id="'+testObj.dummy.b.ID+'" class="'+testObj.dummy.b.Class+'"><div style="width:'+testObj.dummy.b.xHsize+'px;height:'+testObj.dummy.b.yHsize+'px;top:'+testObj.dummy.b.yRadius+'px;left:'+testObj.dummy.b.xRadius+'px;" class="'+testObj.dummy.b.hClass+'"></div></div>';

testObj.dummy.c = new Object();
testObj.dummy.c.lifetime=100;
testObj.dummy.c.IsAvalableTF = 1;
testObj.dummy.c.speed = 0;
testObj.dummy.c.xHsize = 64;
testObj.dummy.c.yHsize = 2;
testObj.dummy.c.xSize = 15;
testObj.dummy.c.ySize = 7;
testObj.dummy.c.xRadius=Math.floor(testObj.dummy.c.xSize/2);
testObj.dummy.c.yRadius=Math.floor(testObj.dummy.c.ySize/2);
testObj.dummy.c.yCord = 390;
testObj.dummy.c.xCord = 640;
testObj.dummy.c.centerXCord = testObj.dummy.c.xCord+testObj.dummy.c.xRadius;
testObj.dummy.c.centerYCord = testObj.dummy.c.yCord+testObj.dummy.c.yRadius;
testObj.dummy.c.theta = 270;
testObj.dummy.c.htmlOut = 0;
testObj.dummy.c.hClass = "testBulletHead";
testObj.dummy.c.Class = "testBulletHtml";
testObj.dummy.c.ID = "testObjD_CHtml";
testObj.dummy.c.htmlIn = '<div style="transform:rotate('+testObj.dummy.c.theta+'deg);left:'+testObj.dummy.c.xCord+'px;top:'+testObj.dummy.c.yCord+'px;width:'+testObj.dummy.c.xSize+'px;height:'+testObj.dummy.c.ySize+'px;"; id="'+testObj.dummy.c.ID+'" class="'+testObj.dummy.c.Class+'"><div style="width:'+testObj.dummy.c.xHsize+'px;height:'+testObj.dummy.c.yHsize+'px;top:'+testObj.dummy.c.yRadius+'px;left:'+testObj.dummy.c.xRadius+'px;" class="'+testObj.dummy.c.hClass+'"></div></div>';


//player
testObj.playerBullet= new Object();
testObj.playerBullet.a = new Object();
testObj.playerBullet.a.lifetime=100;
testObj.playerBullet.a.IsAvalableTF = 1;
testObj.playerBullet.a.speed = 0;
testObj.playerBullet.a.xHsize = 64;
testObj.playerBullet.a.yHsize = 2;
testObj.playerBullet.a.xSize = 15;
testObj.playerBullet.a.ySize = 7;
testObj.playerBullet.a.xRadius=Math.floor(testObj.playerBullet.a.xSize/2);
testObj.playerBullet.a.yRadius=Math.floor(testObj.playerBullet.a.ySize/2);
testObj.playerBullet.a.yCord = 400;
testObj.playerBullet.a.xCord = 620;
testObj.playerBullet.a.centerXCord = testObj.playerBullet.a.xCord+testObj.playerBullet.a.xRadius;
testObj.playerBullet.a.centerYCord = testObj.playerBullet.a.yCord+testObj.playerBullet.a.yRadius;
testObj.playerBullet.a.theta = 270;
testObj.playerBullet.a.htmlOut = 0;
testObj.playerBullet.a.hClass="playerBulletHead";
testObj.playerBullet.a.Class="playerBulletHtml";
testObj.playerBullet.a.ID="testObjP_AHtml";
testObj.playerBullet.a.htmlIn = '<div style="transform:rotate('+testObj.playerBullet.a.theta+'deg);left:'+testObj.playerBullet.a.xCord+'px;top:'+testObj.playerBullet.a.yCord+'px;width:'+testObj.playerBullet.a.xSize+'px;height:'+testObj.playerBullet.a.ySize+'px;"; id="'+testObj.playerBullet.a.ID+'" class="'+testObj.playerBullet.a.Class+'"><div style="width:'+testObj.playerBullet.a.xHsize+'px;height:'+testObj.playerBullet.a.yHsize+'px;top:'+testObj.playerBullet.a.yRadius+'px;left:'+testObj.playerBullet.a.xRadius+'px;" class="'+testObj.playerBullet.a.hClass+'"></div></div>';

testObj.playerBullet.b = new Object();
testObj.playerBullet.b.lifetime=100;
testObj.playerBullet.b.IsAvalableTF = 1;
testObj.playerBullet.b.speed = 0;
testObj.playerBullet.b.xHsize = 64;
testObj.playerBullet.b.yHsize = 2;
testObj.playerBullet.b.xSize = 15;
testObj.playerBullet.b.ySize = 7;
testObj.playerBullet.b.xRadius=Math.floor(testObj.playerBullet.b.xSize/2);
testObj.playerBullet.b.yRadius=Math.floor(testObj.playerBullet.b.ySize/2);
testObj.playerBullet.b.yCord = 410;
testObj.playerBullet.b.xCord = 630;
testObj.playerBullet.b.centerXCord = testObj.playerBullet.b.xCord+testObj.playerBullet.b.xRadius;
testObj.playerBullet.b.centerYCord = testObj.playerBullet.b.yCord+testObj.playerBullet.b.yRadius;
testObj.playerBullet.b.theta = 270;
testObj.playerBullet.b.htmlOut = 0;
testObj.playerBullet.b.hClass="playerBulletHead";
testObj.playerBullet.b.Class="playerBulletHtml";
testObj.playerBullet.b.ID="testObjP_BHtml";
testObj.playerBullet.b.htmlIn = '<div style="transform:rotate('+testObj.playerBullet.b.theta+'deg);left:'+testObj.playerBullet.b.xCord+'px;top:'+testObj.playerBullet.b.yCord+'px;width:'+testObj.playerBullet.b.xSize+'px;height:'+testObj.playerBullet.b.ySize+'px;"; id="'+testObj.playerBullet.b.ID+'" class="'+testObj.playerBullet.b.Class+'"><div style="width:'+testObj.playerBullet.b.xHsize+'px;height:'+testObj.playerBullet.b.yHsize+'px;top:'+testObj.playerBullet.b.yRadius+'px;left:'+testObj.playerBullet.b.xRadius+'px;" class="'+testObj.playerBullet.b.hClass+'"></div></div>';

testObj.playerBullet.c = new Object();
testObj.playerBullet.c.lifetime=100;
testObj.playerBullet.c.IsAvalableTF = 1;
testObj.playerBullet.c.speed = 0;
testObj.playerBullet.c.xHsize = 64;
testObj.playerBullet.c.yHsize = 2;
testObj.playerBullet.c.xSize = 15;
testObj.playerBullet.c.ySize = 7;
testObj.playerBullet.c.xRadius=Math.floor(testObj.playerBullet.c.xSize/2);
testObj.playerBullet.c.yRadius=Math.floor(testObj.playerBullet.c.ySize/2);
testObj.playerBullet.c.yCord = 420;
testObj.playerBullet.c.xCord = 640;
testObj.playerBullet.c.centerXCord = testObj.playerBullet.c.xCord+testObj.playerBullet.c.xRadius;
testObj.playerBullet.c.centerYCord = testObj.playerBullet.c.yCord+testObj.playerBullet.c.yRadius;
testObj.playerBullet.c.theta = 270;
testObj.playerBullet.c.htmlOut = 0;
testObj.playerBullet.c.hClass="playerBulletHead";
testObj.playerBullet.c.Class="playerBulletHtml";
testObj.playerBullet.c.ID="testObjP_CHtml";
testObj.playerBullet.c.htmlIn = '<div style="transform:rotate('+testObj.playerBullet.c.theta+'deg);left:'+testObj.playerBullet.c.xCord+'px;top:'+testObj.playerBullet.c.yCord+'px;width:'+testObj.playerBullet.c.xSize+'px;height:'+testObj.playerBullet.c.ySize+'px;"; id="'+testObj.playerBullet.c.ID+'" class="'+testObj.playerBullet.c.Class+'"><div style="width:'+testObj.playerBullet.c.xHsize+'px;height:'+testObj.playerBullet.c.yHsize+'px;top:'+testObj.playerBullet.c.yRadius+'px;left:'+testObj.playerBullet.c.xRadius+'px;" class="'+testObj.playerBullet.c.hClass+'"></div></div>';


testObj.dummy.bulletTimeout=0;
testObj.dummy.bulletArray = [testObj.dummy.a,testObj.dummy.b,testObj.dummy.c];

testObj.playerBullet.bulletTimeout=0;
testObj.playerBullet.bulletArray = [testObj.playerBullet.a,testObj.playerBullet.b,testObj.playerBullet.c];

testObj.AllBulletArrays=[testObj.dummy.bulletArray,testObj.playerBullet.bulletArray];
testObj.AllPlayerArrays=[testObj.dummy,playerObj];
testObj.AllBulletClasses=[];

//need bullet ownership
testObj.spawnBullets = function(x,y){
	testObj.AllBulletArrays[y][x].htmlIn = '<div style="transform:rotate('+testObj.AllBulletArrays[y][x].theta+'deg);left:'+testObj.AllBulletArrays[y][x].xCord+'px;top:'+testObj.AllBulletArrays[y][x].yCord+'px;width:'+testObj.AllBulletArrays[y][x].xSize+'px;height:'+testObj.AllBulletArrays[y][x].ySize+'px;"; id="'+testObj.AllBulletArrays[y][x].ID+'" class="'+testObj.AllBulletArrays[y][x].Class+'"><div style="width:'+testObj.AllBulletArrays[y][x].xHsize+'px;height:'+testObj.AllBulletArrays[y][x].yHsize+'px;top:'+testObj.AllBulletArrays[y][x].yRadius+'px;left:'+testObj.AllBulletArrays[y][x].xRadius+'px;" class="'+testObj.AllBulletArrays[y][x].hClass+'"></div></div>';
	htmlSuper.insertAdjacentHTML('beforeend',testObj.AllBulletArrays[y][x].htmlIn);
	testObj.AllBulletArrays[y][x].htmlOut=document.getElementById(testObj.AllBulletArrays[y][x].ID);
	//console.log(testObj.htmlOut);
}
testObj.spawnBullets(0,0);
testObj.spawnBullets(1,0);
testObj.spawnBullets(2,0);
testObj.spawnBullets(0,1);
testObj.spawnBullets(1,1);
testObj.spawnBullets(2,1);
testObj.redrawBullets = function(x,y){
//	Math.round
	testObj.AllBulletArrays[y][x].xCord=(testObj.AllBulletArrays[y][x].xCord+testObj.AllBulletArrays[y][x].speed*Math.cos(testObj.AllBulletArrays[y][x].theta*Math.PI/180))
	testObj.AllBulletArrays[y][x].yCord=(testObj.AllBulletArrays[y][x].yCord+testObj.AllBulletArrays[y][x].speed*Math.sin(testObj.AllBulletArrays[y][x].theta*Math.PI/180))
	testObj.AllBulletArrays[y][x].centerXCord = testObj.AllBulletArrays[y][x].xCord+testObj.AllBulletArrays[y][x].xRadius;
	testObj.AllBulletArrays[y][x].centerYCord = testObj.AllBulletArrays[y][x].yCord+testObj.AllBulletArrays[y][x].yRadius;
	htmlSuper.removeChild(testObj.AllBulletArrays[y][x].htmlOut);
	testObj.spawnBullets(x,y);
}
//bullets need to fire from correct obj
testObj.fireBullets = function(y){
	var bulletFired=0;
	for (var x=0; bulletFired==0&&x<testObj.AllBulletArrays[y].length; x++) {
		if(testObj.AllBulletArrays[y][x].IsAvalableTF==1){
			//speed >7 goes thourgh barrier
			testObj.AllBulletArrays[y][x].speed=7;
			testObj.AllBulletArrays[y][x].xCord=testObj.AllPlayerArrays[y].centerXCord-testObj.AllBulletArrays[y][x].xRadius;
			testObj.AllBulletArrays[y][x].yCord=testObj.AllPlayerArrays[y].centerYCord-testObj.AllBulletArrays[y][x].yRadius;
			testObj.AllBulletArrays[y][x].theta=testObj.AllPlayerArrays[y].theta;
			bulletFired=1;
			testObj.AllBulletArrays[y][x].IsAvalableTF=0;
		}
	}
}
testObj.bulletReset = function(x,y){
	//console.log(x,y);
	testObj.AllBulletArrays[y][x].xCord=620;
	testObj.AllBulletArrays[y][x].yCord=310;
	testObj.AllBulletArrays[y][x].IsAvalableTF=1;
	testObj.AllBulletArrays[y][x].lifetime=100;
	testObj.AllBulletArrays[y][x].speed=0;
}
testObj.dummy.bulletLifetime = function(x,y){
	if(testObj.AllBulletArrays[y][x].IsAvalableTF==0&&testObj.AllBulletArrays[y][x].speed==0){
		testObj.AllBulletArrays[y][x].lifetime+=-1;
	}
	if(testObj.AllBulletArrays[y][x].lifetime<1){
		//console.log(x,y);
		testObj.bulletReset(x,y);
	}
}

var worldObj = new Object();
worldObj.maxFriction=4;
worldObj.xLength=600;
worldObj.yLength=600;
worldObj.frictionVal = 0.5;
worldObj.friction = function(x){
	//dosen't even work as friction
	if(x>worldObj.maxFriction||x<-worldObj.maxFriction){
		x=x*worldObj.frictionVal;
	}else{
		if(x>0){x+=-1;}
		if(x<0){x+=1;}
	}
	x=Math.floor(x);
	//console.log(x);
	return x;
}
worldObj.walls = function(x){
	var farDist=10;
	var radDistance;
	radDistance=Math.abs(x.xCord+x.xRadius);//left
	if(radDistance<x.xRadius){
		x.speed=0;
		x.xCord=0;
	}
	radDistance=Math.abs(x.xCord+x.xRadius-worldObj.xLength);//right
	if(radDistance<x.xRadius){
		x.speed=0;
		x.xCord=worldObj.xLength-x.xRadius-farDist;
	}
	radDistance=Math.abs(x.yCord+x.yRadius);//top
	if(radDistance<x.yRadius){
		x.speed=0;
		x.yCord=0;
	}
	radDistance=Math.abs(x.yCord+x.yRadius-worldObj.yLength);//bottom
	if(radDistance<x.yRadius){
		x.speed=0;
		x.yCord=worldObj.yLength-x.yRadius-farDist;
	}
}
testObj.objectIntercetion = function(x,y){
		yDif=Math.abs(x.centerYCord-y.centerYCord);
		xDif=Math.abs(x.centerXCord-y.centerXCord);
		if(yDif<x.yRadius+y.yRadius&&
			xDif<x.xRadius+y.xRadius){
			return 1;
		};
		return 0;
		//console.log(yDif<x.yRadius+y.yRadius,xDif<x.xRadius+y.xRadius,yDif<x.yRadius+y.yRadius==xDif<x.xRadius+y.xRadius&&xDif<x.xRadius+y.xRadius==true)
		//console.log(y.centerXCord,y.centerYCord);
}

worldObj.updateThing = function(){
	if(testObj.dummy.bulletTimeout>0){
		testObj.dummy.bulletTimeout+=-1;
	}
	if(testObj.playerBullet.bulletTimeout>0){
		testObj.playerBullet.bulletTimeout+=-1;
	}
	testObj.dummy.speed=worldObj.friction(testObj.dummy.speed);
	playerObj.speed=worldObj.friction(playerObj.speed);
	testObj.dummy.dummyMove();
	playerObj.playerMove();
	worldObj.walls(playerObj);
	worldObj.walls(testObj.dummy);
	//dummy
	for (var x = 0; x<testObj.AllBulletArrays[0].length; x++) {
		worldObj.walls(testObj.dummy.bulletArray[x]);
		testObj.redrawBullets(x,0);
		testObj.dummy.bulletLifetime(x,0);
		if(testObj.objectIntercetion(testObj.dummy, testObj.playerBullet.bulletArray[x])){
			testObj.bulletReset(x,1);
			testObj.dummy.vitality+=-1;
			//console.log("reset!");
		}
	}
	if(testObj.dummy.vitality<1){
		testObj.dummy.death();
		//console.log("ded");
	}
	//player
	for (var x = 0; x<testObj.AllBulletArrays[1].length; x++) {
		worldObj.walls(testObj.playerBullet.bulletArray[x]);
		testObj.redrawBullets(x,1);
		testObj.dummy.bulletLifetime(x,1);
		if(testObj.objectIntercetion(playerObj, testObj.dummy.bulletArray[x])){
			// why?
			testObj.bulletReset(x,0);
			playerObj.vitality+=-1;
			//console.log("reset!",x);
		}
	}
	if(playerObj.vitality<1){
		playerObj.death();
		//console.log("ded");
	}

	//console.log(playerObj.speed);
}

var CalObj = new Object();

var validCalObj = [testObj.dummy, playerObj];

CalObj.acceleration = function(x, y){
	validCalObj[y].speed+=x*validCalObj[y].aVar;
	//console.log(playerObj.speed,"A");
	//console.log(playerObj.speed,"B");
}
CalObj.angle = function(x, y){
	validCalObj[y].theta+=x*validCalObj[y].turnSpeed;
	if(validCalObj[y].theta>360){validCalObj[y].theta=0;}
	if(validCalObj[y].theta<0){validCalObj[y].theta=360;}
	//console.log(playerObj.theta);
}
//
//key presses
//
function keyPattern(){
	if(keyPressedTF[90]){
		//testObj.redraw();
		//console.log("z");
	};
	//player fire button
	if(keyPressedTF[77]){
		if(testObj.dummy.bulletTimeout<1){
			testObj.fireBullets(1);
			testObj.dummy.bulletTimeout=50;
		}
		//console.log("m");
	};
	//dummy fire buttom
	if(keyPressedTF[86]){
		if(testObj.playerBullet.bulletTimeout<1){
			testObj.fireBullets(0);
			testObj.playerBullet.bulletTimeout=50;
		}
		//console.log("v");
	};
	//movement
	//dummy
	if(keyPressedTF[87]&&!keyPressedTF[83]){
		CalObj.acceleration(1,0);
		//console.log("w");
	}
	if(keyPressedTF[83]&&!keyPressedTF[87]){
		CalObj.acceleration(-1,0);
		//console.log("s");
	}
	if(keyPressedTF[65]&&!keyPressedTF[68]){
		CalObj.angle(-1,0);
		//console.log("a");
	}
	if(!keyPressedTF[65]&&keyPressedTF[68]){
		CalObj.angle(1,0);
		//console.log("d");
	}
	//playerObj
	if(keyPressedTF[38]&&!keyPressedTF[40]){
		CalObj.acceleration(1,1);
		//console.log("up");
	}
	if(keyPressedTF[40]&&!keyPressedTF[38]){
		CalObj.acceleration(-1,1);
		//console.log("down");
	}
	if(keyPressedTF[37]&&!keyPressedTF[39]){
		CalObj.angle(-1,1);
		//console.log("left");
	}
	if(!keyPressedTF[37]&&keyPressedTF[39]){
		CalObj.angle(1,1);
		//console.log("right");
	}
	worldObj.updateThing();
	setTimeout(keyPattern,10);
}
keyPattern();
//events
document.getElementById("bodyTag").addEventListener(
	'keydown',
	function(event){
		//console.log("keydown");
		//console.log("+"+String.fromCharCode(event.which)+" "+event.which);
		keyPressedTF[event.which]=true;
});
//
document.getElementById("bodyTag").addEventListener(
	'keyup',
	function(event){
		//console.log("keyup");
		//console.log("-"+String.fromCharCode(event.which));
		keyPressedTF[event.which]=false;
});

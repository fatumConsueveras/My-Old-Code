var keyPressedTF=[];
var actorArray =[];
var projArray =[];
var weaponArray =[];
var tileArray =[];
var enviroArray =[];
var objArray =[actorArray,projArray,enviroArray,weaponArray,tileArray];
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var hiddenSrc = document.getElementById('hiddenSrc');
//
ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0,0,512,512);
//
mouseX=mouseY=c.width/2;
RadTDeg=Math.PI/180;
debugGame=1;
updateTime=10;
pauseGame=0;
uniqueObjId=0;
//
debugLineWidth=2;
///=====start functions=====///
function drawLine(xA,yA,xB,yB,myWidth){	
	ctx.lineWidth=myWidth;	
	ctx.beginPath();
	ctx.moveTo(xA,yA);
	ctx.lineTo(xB,yB);
	ctx.stroke();
}
function drawCircle(x,y,r,startAngle,endAngle,counterclockwise){
	ctx.beginPath();
	ctx.arc(x,y,r,startAngle,endAngle,counterclockwise);
	ctx.fill();
	//ctx.strokeStyle = "rgba(0,0,0,1)";
	ctx.stroke(); 
}
function drawGrid(scale){
	ctx.strokeStyle = "rgba(200,200,200,0.5)";//modifyed[Y]=-1*(y-c.width)
	for(x=0;x<c.width;x+=scale){drawLine(x,0,x,c.height);}
	for(y=0;y<c.height;y+=scale){drawLine(0,y,c.width,y);}
}
function drawImg(angle,xA,yA,w,h,mySrc){
// save the context's co-ordinate system before 
// we screw with it
ctx.save(); 
ctx.translate(xA,yA);
// rotate around this point
ctx.rotate(angle*Math.PI/180); 
// then draw the image back and up
	img = document.getElementById(resourceArr[mySrc][0]);
ctx.drawImage(img, -w/2, -h/2,w,h); 
 
// and restore the co-ordinate system to its default
// top left origin with no rotation
ctx.restore();

}
function myNewCanvas(w,h){
	c.width = w;
	c.height = h;
}
//===IMAGES-&-RESOURCES===//
var resourceArr=[//  [ID,src]
	["modelA","imgSrc/modelA.png"],
	["modelB","imgSrc/modelB.png"],
	["modelC","imgSrc/modelC.png"],
	["bulletA","imgSrc/bulletA.jpg"]
];
function addImgResources(){
	for(x=0;x<resourceArr.length;x++){
		var newSrc = document.createElement("img");
		newSrc.id=resourceArr[x][0];
		newSrc.src=resourceArr[x][1];
		hiddenSrc.appendChild(newSrc);
}}
addImgResources();
///======Objects-Classes======///
function genericEnt(){
	this.ptpTest = function(x,y){
		this.xPosAI=this.aimCordX=x;
		this.yPosAI=this.aimCordY=y;
		//
		xDif=x-this.xPos;
		yDif=y-this.yPos;
		//
		while(Math.abs(xDif)>this.MaxVel||Math.abs(yDif)>this.MaxVel){xDif*=0.9;yDif*=0.9;}
		//
		this.xSpeed=xDif;
		this.ySpeed=yDif;//console.log(xDif,yDif);
	}
	this.getAngle = function(target){
		yDif=this.yPos-target.yPos;
		xDif=this.xPos-target.xPos;
		theta= Math.atan(yDif/xDif)*(180/Math.PI);
		if(theta<0){if(yDif<0){theta+=180;}else{theta+=360;}
		}else if(xDif>=0){theta+=180;}
		return theta;
	}
	this.aimTarget = function(target){
		this.angleAI=this.getAngle(target);
	}
	this.drawSlope = function(target){
		yDif=this.yPos-target.yPos;
		xDif=this.xPos-target.xPos;
		drawLine(this.xPos,this.yPos,this.xPos-xDif,this.yPos-yDif,debugLineWidth);
	}
	this.locate = function(target){
		drawLine(this.xPos,this.yPos,target.xPos,target.yPos,debugLineWidth);
	}	
	this.debugAlpha =function(){
		length=50;
		x=Math.cos(this.angle*RadTDeg)*length+this.xPos;
		y=Math.sin(this.angle*RadTDeg)*length+this.yPos;
		//
		ctx.strokeStyle = "rgba(255,0,0,0.3)";
		drawLine(this.xPos,this.yPos,x,y,debugLineWidth);
		//graphSpeed()
		endX=this.xPos+30*this.xSpeed;
		endY=this.yPos+30*this.ySpeed;
		ctx.strokeStyle = "rgba(0,255,0,0.3)";
		drawLine(this.xPos,this.yPos,endX,endY,debugLineWidth);
		//draw Destination
		ctx.strokeStyle = "rgba(0,0,255,0.2)";
		drawLine(objArray[this.objType][actorVal].xPos,objArray[this.objType][actorVal].yPos,objArray[this.objType][actorVal].xPosAI,objArray[this.objType][actorVal].yPosAI,debugLineWidth);
		ctx.fillStyle = "rgba(255,255,0,0.7)";
		drawCircle(objArray[this.objType][actorVal].xPosAI,objArray[this.objType][actorVal].yPosAI,5,0,Math.PI*2,0);
	}	
	this.objectDie = function(){
		this.lifeTime-=updateTime;//console.log(this.lifeTime);console.log("die");
		if(this.lifeTime<0){return 7;}
		//if(this.vitality<0){return 7;}
	}
	this.objSelfRemove = function(){
			objArray[this.objType].splice(this.objArrPos(),1);//console.log("Bullet arrPos:",this.objArrPos());
	}
	this.objArrPos = function(){
		return objArray[this.objType].indexOf(this);
	}
	this.updateActors = function(){
		if(Math.abs(this.xPosAI-this.xPos)<2){this.xSpeed=0;}
		if(Math.abs(this.yPosAI-this.yPos)<2){this.ySpeed=0;}
		//
		this.xPos+=this.xSpeed;
		this.yPos+=this.ySpeed;
		//
		this.angle=this.angleAI;
		//
		this.xPosModel=this.xPos-this.modelWidth*0.5;
		this.yPosModel=this.yPos-this.modelHeight*0.5;
		//
		drawImg(this.angle,this.xPos,this.yPos,this.modelWidth,this.modelHeight,this.model);
	}
	this.displayHits = function(){
		wA=8;
		xA=this.xPosModel;
		yA=this.yPosModel+this.modelHeight+wA/2;
		ctx.strokeStyle = "rgba(255,0,0,0.4)";
		xB=this.xPosModel+this.modelWidth;
		yB=this.yPosModel+this.modelHeight+wA/2;
		drawLine(xA,yA,xB,yB,wA);
		//this.vitality,this.maxVitality,this.modelWidth
		ctx.strokeStyle = "rgba(0,255,0,0.4)";
		vitalLength=(this.vitality/this.maxVitality)*this.modelWidth;
		xB=this.xPosModel+vitalLength;
		drawLine(xA,yA,xB,yB,wA);
	}
	this.displayCharge = function(){
		wB=3;wA=8;
		xA=this.xPosModel;
		yA=this.yPosModel+this.modelHeight+wB/2+wA;
		xB=this.xPosModel+this.modelWidth;
		yB=this.yPosModel+this.modelHeight+wB/2+wA;
		//this.vitality,this.maxVitality,this.modelWidth
		chargeLength=(this.currentGun.charge/this.currentGun.maxCharge)*this.modelWidth;
		xB=this.xPosModel+chargeLength;
		ctx.strokeStyle = "rgba(0,255,0,0.4)";
		drawLine(xA,yA,xB,yB,wB);
	}
	this.detectHitbox = function(objType){
		//radial hitbox
		for(actorVal=0;actorVal<objArray[objType].length;actorVal++){
			if(objType==this.objType){
				if(this.objArrPos()==actorVal){continue;}
			}
		if(objType==1){
			if(this.objType==0){
				if(this.uniqueObjId==objArray[objType][actorVal].parentID){
					continue;
				}
			}
		}
		dx = this.xPos - objArray[objType][actorVal].xPos;
		dy = this.yPos - objArray[objType][actorVal].yPos;
		distance = Math.sqrt(dx * dx + dy * dy);
		radiusA=this.modelWidth*0.5;
		radiusB=objArray[objType][actorVal].modelWidth*0.5;
		if (distance < radiusA + radiusB) {
			if(objType==1){
				this.vitality-=objArray[objType][actorVal].impactDmg;
			}
    		//console.log("hit!",this.ActorName,objArray[objType][actorVal].ActorName);
    	}}
	}
}
function Projectile(parentID,impactDmg,maxVitality,vitality,objType,aimCordX,aimCordY,ID,arrPos,ParentName,name,model,xPos,yPos,width,height,xSpeed,ySpeed,velocity,angleSpeed,angle,speed,range,lifeTime){
	genericEnt.call(this);
	this.parentID=parentID;
	this.impactDmg=impactDmg;
	this.vitality=vitality;
	this.maxVitality=maxVitality;
	this.objType=objType;
	this.aimCordX=aimCordX;
	this.aimCordY=aimCordY;
	this.ParentName=ParentName;
	this.MaxVel=velocity;
	this.bulletRange=range;
	this.uniqueObjId=ID;
	this.lifeTime=lifeTime;
	this.arrPos=arrPos;
	this.ActorName=name;
	this.model=model;
	this.xPos=xPos;
	this.yPos=yPos;
	this.modelWidth=width;
	this.modelHeight=height;
	this.xPosModel=this.xPos-this.modelWidth*0.5;
	this.yPosModel=this.yPos-this.modelHeight*0.5;
	this.xSpeed=xSpeed;
	this.ySpeed=ySpeed;
	this.angleSpeed=angleSpeed;
	this.angle=angle;
	this.xPosAI=this.xPos;
	this.yPosAI=this.yPos;
	this.angleAI=this.angle;
	this.bulletSpeed=speed;
}
function tileObj(xPos,yPos,angle,model,lifetime,width,height,ID,name,className){
	genericEnt.call(this);
	this.xPos=xPos;
	this.yPos=yPos;
	this.angle=angle;
	this.modelWidth=width;
	this.modelHeight=height;
	this.xPosModel=this.xPos-this.modelWidth*0.5;
	this.yPosModel=this.yPos-this.modelHeight*0.5;
	this.model = model;
	this.lifeTime=lifetime;
	this.className="tileObj";
	this.ActorName=name;
	this.uniqueObjId=ID;
	this.interact = function(){}
}
function bulletObj(ID,model,bulletRange,bulletLifetime,bulletVel,bulletDmg){
	this.model=model;
	this.bulletRange=bulletRange;
	this.bulletLifetime=bulletLifetime;
	this.bulletVel=bulletVel;
	this.bulletDmg=bulletDmg;
}
function weaponObj(bulletType,spreadAngle,xPos,yPos,angle,gunModel,modelWidth,modelLength,minOverCharge,maxCharge,charge,recharge,fireRate,burstRate,objType,ID,arrPos,name){
	//bulletObj.call(this,ID,model,bulletRange,bulletLifetime,bulletVel,bulletDmg);
	genericEnt.call(this);
	this.className="weaponObj";
	this.bulletType=bulletType;
	this.spreadAngle=spreadAngle;
	this.maxCharge=maxCharge;
	this.xPos=xPos;
	this.yPos=yPos;
	this.angle=angle;
	this.modelLength=modelLength;
	this.modelWidth=modelWidth;
	this.xPosModel=this.xPos-this.modelWidth*0.5;
	this.yPosModel=this.yPos-this.modelHeight*0.5;
	this.charge=charge;
	this.recharge=recharge;
	this.model=gunModel;
	this.burstRate=burstRate;
	this.fireRate=fireRate;
	this.objType=objType;
	this.arrPos=arrPos;
	this.uniqueObjId=ID;
	this.ActorName=name;
	this.minOverCharge=minOverCharge;
	this.shotCount=0;
	this.launchProjectile = function(parentID,parentAngle,lX,lY){
		//Projectile(parentID,impactDmg,maxVitality,vitality,objType,aimCordX,aimCordY,ID,arrPos,ParentName,name,model,xPos,yPos,width,height,xSpeed,ySpeed,velocity,angleSpeed,angle,speed,range,lifeTime)
		objArray[1][objArray[1].length] = new Projectile(parentID,this.bulletType.bulletDmg,1,1,1,0,0,uniqueObjId++,0,this.ActorName,"GenericBullet",this.bulletType.model,lX,lY,10,10,0,0,this.bulletType.bulletVel,0,parentAngle,this.bulletType.bulletVel,this.bulletType.bulletRange,this.bulletType.bulletLifetime);
		//
		newXPosAI=objArray[1][objArray[1].length-1].bulletRange*objArray[1][objArray[1].length-1].bulletSpeed*Math.cos(parentAngle*RadTDeg)+lX;
		newYPosAI=objArray[1][objArray[1].length-1].bulletRange*objArray[1][objArray[1].length-1].bulletSpeed*Math.sin(parentAngle*RadTDeg)+lY;
		objArray[1][objArray[1].length-1].ptpTest(newXPosAI,newYPosAI);//console.log(lX,objArray[1][objArray[1].length-1]);
	}
	this.autoFire = function(shots,parentAngle,lX,lY,parentID){//console.log(shots,parentAngle,lX,lY);
		if(this.charge>0){
			if(this.shotCount%this.fireRate==1){
				//console.log(parentAngle);
				for(i=0;i<=shots;i++){
					newAngle=parentAngle+(Math.random()-Math.random())*this.spreadAngle;
					this.launchProjectile(parentID,newAngle,lX,lY);
				}
			}this.shotCount++;
		}
		if(this.charge>this.minOverCharge){this.charge--;}
	}
}
function Actor(currentGun,maxVitality,vitality,objType,aimCordX,aimCordY,ID,arrPos,name,model,xPos,yPos,width,height,xSpeed,ySpeed,velocity,angleSpeed,angle,lifeTime){
	genericEnt.call(this);
	this.currentGun=currentGun;
	this.vitality=vitality;
	this.maxVitality=maxVitality;
	this.objType=objType;
	this.aimCordX=aimCordX;
	this.aimCordY=aimCordY;
	this.MaxVel=velocity;
	this.lifeTime=lifeTime;
	this.arrPos=arrPos;
	this.uniqueObjId=ID;
	this.className="Actor";
	this.ActorName=name;
	this.model=model;
	this.xPos=xPos;
	this.yPos=yPos;
	this.modelWidth=width;
	this.modelHeight=height;
	this.xPosModel=this.xPos-this.modelWidth*0.5;
	this.yPosModel=this.yPos-this.modelHeight*0.5;
	this.xSpeed=xSpeed;
	this.ySpeed=ySpeed;
	this.angleSpeed=angleSpeed;
	this.angle=angle;
	this.xPosAI=this.xPos;
	this.yPosAI=this.yPos;
	this.angleAI=this.angle;
	this.gunTrigger = function(){
		this.currentGun.autoFire(1,this.angle,this.xPos,this.yPos,this.uniqueObjId);
		//console.log(this.angle,this.xPos,this.yPos);
	}
	this.newGun = function(weaponID){
		this.currentGun = setNewGun(weaponID);
	}
}
function theMouse(xPos,yPos){this.xPos=xPos;this.yPos=yPos;}
function setNewGun(weaponID){
	switch(weaponID){
		case 0:
		 return new weaponObj(genericBulletA,3,0,0,0,1,15,5,-5,4,4,0.6,5,1,3,uniqueObjId++,0,"genericGun");
		 break;
		case 1:
		 return new weaponObj(genericBulletA,3,0,0,0,1,15,5,-10,7,7,0.5,7,1,3,uniqueObjId++,0,"genericGun");
		 break;
		case 2: 
		 return new weaponObj(genericBulletA,3,0,0,0,1,15,5,-10,6,6,0.5,10,1,3,uniqueObjId++,0,"genericGun");
		 break;
	}
}
//bulletObj(ID,model,bulletRange,bulletLifetime,bulletVel,bulletDmg);
var genericBulletA = new bulletObj(uniqueObjId++,3,200,900,4,1);
//function weaponObj(bulletType,spreadAngle,xPos,yPos,angle,gunModel,modelWidth,modelLength,minOverCharge,maxCharge,charge,recharge,fireRate,burstRate,objType,ID,arrPos,name){
var genericGunA = new weaponObj(genericBulletA,1,0,0,0,1,15,5,-10,7,4,0.9,10,1,3,uniqueObjId++,0,"genericGun");
var genericGunC = new weaponObj(genericBulletA,1,0,0,0,1,15,5,-10,7,4,0.9,10,1,3,uniqueObjId++,0,"genericGun");
var genericGunB = new weaponObj(genericBulletA,1,0,0,0,1,15,5,-10,4,4,0.9,10,1,3,uniqueObjId++,0,"genericGun");
//(currentGun,maxVitality,vitality,objType,aimCordX,aimCordY,ID,arrPos,name,model,xPos,yPos,width,height,xSpeed,ySpeed,velocity,angleSpeed,angle,lifeTime)
var actorC = objArray[0][objArray[0].length] = new Actor(genericGunA,100,100,0,85,100,uniqueObjId++,0,"AutoTurretA",0, 40, 40,31,31,0,0,2,8,0,Infinity);
var actorA = objArray[0][objArray[0].length] = new Actor(genericGunC,100,100,0,85,135,uniqueObjId++,0,"AutoTurretC",0,280,200,31,31,0,0,2,8,0,Infinity);
var actorB = objArray[0][objArray[0].length] = new Actor(genericGunB,100,100,0,85, 50,uniqueObjId++,1,"Player"     ,0,220,135,27,27,0,0,2,8,0,Infinity);
var mouseObj = new theMouse(0,0);
//
actorA.newGun(2);
actorC.newGun(1);
actorB.newGun(0);
// arr.splice(position, # of elements);//removes element from arr// arr.push(element); //adds element to end of arr
///===ACTOR-functions===///
///======drawing-actors===///
var cleanupList=[];
function drawActors(){
	//
	for(iii=0;iii<objArray.length;iii++){
	for(actorVal=0;actorVal<objArray[iii].length;actorVal++){
		objArray[iii][actorVal].updateActors();
		//
	if(debugGame==1){objArray[iii][actorVal].debugAlpha();}
	//death
	if(objArray[iii][actorVal].objectDie()==7){
		cleanupList.push(objArray[iii][actorVal]);
	}}}

	//if(actorA.vitality>=0){
	actorA.displayCharge();
	actorA.aimTarget(actorB);
	if(actorA.currentGun.charge>actorA.currentGun.minOverCharge){actorA.gunTrigger();}else{actorA.currentGun.charge=actorA.currentGun.maxCharge;}
	actorA.displayHits();
	actorA.detectHitbox(1);
	if(actorA.currentGun.charge<actorA.currentGun.maxCharge){actorA.currentGun.charge+=actorA.currentGun.recharge;}
	//}
	//
	//if(actorB.vitality>=0){
	actorB.displayCharge();
	actorB.displayHits();
	actorB.detectHitbox(1);
	actorB.aimTarget(mouseObj);
	if(actorB.currentGun.charge<actorB.currentGun.maxCharge){actorB.currentGun.charge+=actorB.currentGun.recharge;}
	//}
	//
	//if(actorC.vitality>=0){
	actorC.displayCharge();
	actorC.aimTarget(actorB);
	if(actorC.currentGun.charge>actorC.currentGun.minOverCharge){actorC.gunTrigger();}else{actorC.currentGun.charge=actorC.currentGun.maxCharge;}
	actorC.displayHits();
	actorC.detectHitbox(1);
	if(actorC.currentGun.charge<actorC.currentGun.maxCharge){actorC.currentGun.charge+=actorC.currentGun.recharge;}
	//}

}
function clearTheDead(){
	//cleanupLoop
	for(i=cleanupList.length-1;i>-1;i--){
		//console.log(cleanupList.length,i,cleanupList[i].objArrPos());
		cleanupList[i].objSelfRemove();
	}
	cleanupList=[];
}
///======drawing-Canvas===///
function drawCanvas(){
	myNewCanvas(c.width,c.height);
	drawGrid(50);
	//
	drawActors();
	//
}
//============keyPattern============//
function keyPattern(){
	if(keyPressedTF[90]){//console.log("z");
	};
	if(keyPressedTF[88]){//console.log("m");
	};
	if(keyPressedTF[32]){//console.log("v");
		actorB.gunTrigger();
	};
	if(keyPressedTF[87]&&!keyPressedTF[83]){//console.log("w");
		actorB.yPos-=actorB.MaxVel;actorB.yPosAI-=actorB.MaxVel;
	}
	if(keyPressedTF[83]&&!keyPressedTF[87]){//console.log("s");
		actorB.yPos+=actorB.MaxVel;actorB.yPosAI+=actorB.MaxVel;
	}
	if(keyPressedTF[65]&&!keyPressedTF[68]){//console.log("a");
		actorB.xPos-=actorB.MaxVel;actorB.xPosAI-=actorB.MaxVel;
	}
	if(!keyPressedTF[65]&&keyPressedTF[68]){//console.log("d");
		actorB.xPos+=actorB.MaxVel;actorB.xPosAI+=actorB.MaxVel;
	}
	if(keyPressedTF[38]&&!keyPressedTF[40]){//console.log("up");
	}
	if(keyPressedTF[40]&&!keyPressedTF[38]){//console.log("down");
	}
	if(keyPressedTF[37]&&!keyPressedTF[39]){//console.log("left");
	}
	if(!keyPressedTF[37]&&keyPressedTF[39]){//console.log("right");
	}
}
///###########_MAIN_LOOP_##########///
function gameLoop(){
	if(pauseGame==0){
		clearTheDead();
		drawCanvas();
		keyPattern();
	}
	setTimeout(function(){gameLoop();},updateTime);
}
///===events===///
document.getElementById("bodyTag").addEventListener(
	'keydown',
	function(event){
		keyPressedTF[event.which]=true;
});
//
document.getElementById("bodyTag").addEventListener(
	'keyup',
	function(event){
		keyPressedTF[event.which]=false;
});
c.addEventListener(
	"click",
	function(event){
		rect = c.getBoundingClientRect();
		mouseX=event.clientX-parseInt(rect.left);
		mouseY=event.clientY-parseInt(rect.top);
		//actorB.ptpTest(mouseX,mouseY);
})
c.addEventListener(
	"mousemove",
	function(event){
		rect = c.getBoundingClientRect();
		mouseObj.xPos=event.clientX-parseInt(rect.left);
		mouseObj.yPos=event.clientY-parseInt(rect.top);
});
gameLoop();
//=================NOTES||TO DO LIST===================//
//
//createGun model 
//create wallObj
//create proper AIobj
//create death tile && dropped gun tile
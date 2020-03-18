function rollDice(dieQty,dieType){
	var myDiceArray=[];
	for(i=dieQty;i>0;i--){
		faceVal=Math.ceil(dieType*Math.random());
		if(dieType==10||dieType==100){faceVal-=1;}
		myDiceArray.push(faceVal);
	}
	return myDiceArray;
}

function setDice(dieQty,dieType,diceID){
	var diceOutput=document.getElementById(diceID);
	diceVal=rollDice(dieQty,dieType);
	sumTotal=0;
	for(i=0;i<diceVal.length;i++){sumTotal+=diceVal[i];}
	diceOutput.innerHTML=sumTotal;
}
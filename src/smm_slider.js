function smmSlider(bg){
	var cbFxn=null;

	//bg.style.width = bg.parentNode"px";

	this.bgDiv = bg;
	
	var self = this;

	//this.bgDiv = document.createElement('div');
	//this.bgDiv.className = "slider-background";
	
	var handle = document.createElement('img');
	handle.src = src="img/slider-handle.png";
	handle.className = "slider-handle";
	this.bgDiv.appendChild(handle);
	
	var bClicked = false;
	var value = 0;
	
	this.setPercent = function(perc){
		handle.style.marginLeft =perc*(parseInt(self.bgDiv.offsetWidth)-handle.width) +"px";
	}
	
	handle.onload = function(){
		self.bgDiv.style.height = handle.height;
	}
	
	this.getPercent = function(){
		return parseInt(handle.style.marginLeft)/(self.bgDiv.offsetWidth-handle.width);
	}
	
	handle.changePosition = function(posX,posY){
			if(posX>parseInt(self.bgDiv.offsetWidth)-handle.width) posX=parseInt(self.bgDiv.offsetWidth)-handle.width;
			else if(posX<0) posX=0;
			handle.style.marginLeft =posX +"px";
			if(cbFxn) cbFxn(self);
	};
	
	this.clickup = function(){
		bClicked=false;
	};
	
	this.bgDiv.onmousedown = function(e){
		//console.log(e.clientX+" "+position(self.bgDiv).x);
		//console.log(self.bgDiv.style.marginLeft);
		handle.changePosition(e.clientX-(position(self.bgDiv).x+handle.width/2),0);
		drag.setByEventAndObj(e,handle);
		document.onmousemove = OnMouseMove;
		return false;
	};
	
	this.addChangeCallback = function(fxn){
		cbFxn=fxn;
	}
};


//var rotation = new smmSlider($("rotSlider"));
//var anim = new smmSlider($("animSlider"));
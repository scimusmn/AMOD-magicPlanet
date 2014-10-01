function scene(fldr,number,prnt){
	var folder = fldr+number;
	
	var parent = prnt;
	
	var btnSrc = folder+"/"+pad(number,2)+".png";
	var btnActvSrc = folder+"/"+pad(number,2)+"-ACTIVE.png";
	
	var self = this;
	this.dom = null;
	
	this.selected = false;
	
	this.button = document.createElement('div');
	this.button.className = "scene-button";
	var bgUrl = "background-image:url('" + folder+"/globe.png');"
	this.button.setAttribute("style",bgUrl);
	this.btnLbl = document.createElement('div');
	this.btnLbl.className = "button-label";
	this.button.appendChild(this.btnLbl);
	
	$('menuBar').appendChild(this.button);
	
	this.pages = [];
	this.pageNumber = 0;
	this.title = null;
	
	var stChapter = 0, stPage = 0;
	
	var btnMng = function(val,name){
		if(self.pageNumber+1==val) $(name).src = "img/btn_"+name+"-inactive.png";
		else $(name).src = "img/btn_"+name+"-active.png";
	}
	
	var setPage = function(){
		$("page").innerHTML = '';
 		if(self.pages.length)
	 		$("page").appendChild(self.pages[self.pageNumber].cloneNode(true));
	 	
	 	if(self.pages.length>=2){ 
	 		$("pageControls").style.display = "table";
	 		$("pageNum").innerHTML = (self.pageNumber+1)+" of "+self.pages.length;
	 		
	 		btnMng(self.pages.length,"next");
			btnMng(1,"back");
	 	}
	 	else $("pageControls").style.display = "none";
	 	
	 	
	}
	
	var loadDescription = function(){
 		$("title").innerHTML = '';
 		$("title").appendChild(self.title.cloneNode(true));
 		$("title").innerHTML = $("title").innerHTML.toUpperCase();
 		
 		self.pageNumber = 0;
 		
 		setPage();
	}
	
	var loadInfo = function(){
		var el = self.dom.getElementById("info");
		
		$("infoSpace").innerHTML ='';
		if(el) $("infoSpace").appendChild(el.cloneNode(true));
		
		el = self.dom.getElementById("animTitle");
		if(el) $("animTitle").innerHTML = el.innerHTML;
		else $("animTitle").innerHTML = "Control the animation";
		
		el = self.dom.getElementById("animLabels");
		if(el) $("animLabels").innerHTML = el.innerHTML;
		else $("animLabels").innerHTML = '';
		
		el = self.dom.getElementById("anim");
		if(el) $("animControl").style.display = "inline";
		else $("animControl").style.display = "none";
	}
	
	this.nextPage = function(){
		if(self.pageNumber+1<self.pages.length){
			self.pageNumber++;
 			setPage();
		}
	}
	
	this.prevPage = function(){
		if(self.pageNumber+1>1){
			self.pageNumber--;
 			setPage();
		}
		
	}
	
	this.select = function(){
		self.selected=true;
		//self.button.src = btnActvSrc;
		this.button.setAttribute("style",bgUrl+"background-position:0% 0px;");
		this.btnLbl.style.color="#fff";
		self.loadScene();
		rotation.start();
	}
	
	this.resetButton = function(){
		this.button.setAttribute("style",bgUrl+"background-position:0% 25px;");
		//self.button.src = btnSrc;
		this.btnLbl.style.color="#777";
		self.selected = false;
	}
	
	this.loadScene = function(){
		if(this.dom){
			loadDescription();
			loadInfo();
			stories.loadScene(stChapter,stPage);
		}
	}
	
	this.domLoadCB = function(DOM){
		self.dom = DOM;
		
		self.pages.length = 0;
		
		var els = self.dom.getElementsByClassName("description-para");
		for(var i=0; i<els.length; i++){
			self.pages[i] = els[i];
		}
		
		els.length = 0;
		els = self.dom.getElementsByClassName("description-title");
		if(els.length) self.title = els[0];

		stChapter = parseInt(self.dom.getElementsByTagName("body")[0].getAttribute("chapter"));
		stPage = parseInt(self.dom.getElementsByTagName("body")[0].getAttribute("page"));

		if(self.selected){
			self.loadScene();
		}
		
		self.btnLbl.innerHTML = self.title.innerHTML;
	}
	
	self.button.onmousedown = function(){
		parent.reset();
		self.select();
	}
	
	htmlFile(folder+"/index.html",self.domLoadCB.bind(self));
	
}

var mpScenes = new function(){
	var self = this;
	
	var scenes = [];
	
	for(var i=0; i<8; i++){
	
		scenes[i] = new scene("scenes/scene",(i+1),this);
	}
	
	scenes[0].select();
	
	this.reset = function(){
		for(var i=0; i<8; i++){
			scenes[i].resetButton();
		}
		//rotation.setPercent(0);
		//anim.setPercent(0);
	}
	
	$("back").onmousedown = function(){
		for(var i=0; i<scenes.length; i++){
			if(scenes[i].selected) scenes[i].prevPage();
		}
	}
	
	$("next").onmousedown = function(){
		for(var i=0; i<scenes.length; i++){
			if(scenes[i].selected) scenes[i].nextPage();
		}
	}
	
	this.currentScene = function(){
		var ret =  null;
		for(var i=0; i<scenes.length; i++){
			if(scenes[i].selected) ret = scenes[i];
		}
		return ret;
	}
	
	this.nextScene = function(){
		var sel = 0;
		for(var i=0; i<scenes.length; i++){
			if(scenes[i].selected) sel=i;
		}
		if(++sel>=scenes.length) sel=0
		self.reset();
		scenes[sel].select();
		
		console.log("The next scene is " + sel);
	}
	
	var sceneTimer = setInterval(self.nextScene,90000);
	
	this.resetTimer = function(){
		clearInterval(sceneTimer);
		sceneTimer = setInterval(self.nextScene,90000);
	}
}
var stories = new function(){

	this.frameRate = 30.0;
	this.rotationRate = 4;
	this.frame = 0;
	
	//var StoryTeller = new ActiveXObject('StoryControl.StoryControl');

	this.onload = function () {
		try{
			StoryTeller.URL = 'tcp://MAGIC_PLANET01:8080/StoryTeller';
		}
		catch(err){
			console.log(err);
		}
	}


	this.loadScene = function(chapter, page) {
		try{
			StoryTeller.Chapter = chapter;
			StoryTeller.Page = page;
		}
		catch(err){
			console.log(err);
		}
	}


	this.pause = function() {
		try{
			StoryTeller.Pause();
		}
		catch(err){
			console.log(err);
		}
	}


	this.play = function() {
		try{
			StoryTeller.FrameRate = 30.0
			StoryTeller.Play();
		}
		catch(err){
			console.log(err);
		}
	}


	this.rotate = function() {
		try{
			StoryTeller.RotationRate = this.rotationRate;
			StoryTeller.Rotating = true;
		}
		catch(err){
			console.log(err);
		}
	}

	this.stopRotation = function() {
		try{
			StoryTeller.Rotating = false
		}
		catch(err){
			console.log(err);
		}
	}


	this.flip = function() {
		try{
			if ((a = StoryTeller.flippoles) == true) StoryTeller.FlipPoles = false
			else StoryTeller.FlipPoles = true
		}
		catch(err){
			console.log(err);
		}
	}


	this.priorPage = function() {
		try{
			StoryTeller.PreviousPage()
		}
		catch(err){
			console.log(err);
		}
	}

	this.nextPage = function() {
		try{
			StoryTeller.NextPage()
		}
		catch(err){
			console.log(err);
		}
	}
	
	this.nextFrame = function(){
		try{
			this.frame = StoryTeller.Frame
			StoryTeller.frame = ++this.frame;
		}
		catch(err){
			console.log(err);
		}
	}
	
	this.prevFrame = function(){
		try{
			this.frame = StoryTeller.Frame
			StoryTeller.frame = --this.frame;
		}
		catch(err){
			console.log(err);
		}
	}
	
	this.currentFrame =function(){
		try{
			return this.frame = StoryTeller.Frame;
		}
		catch(err){
			console.log(err);
		}
	}
	
	this.setFrame = function(frm){
		try{
			StoryTeller.Frame = frm;
		}
		catch(err){
			console.log(err);
		}
	}
	
	this.setRotationAngle = function(ang){
		try{
			StoryTeller.RotationAngle = ang;
		}
		catch(err){
			console.log(err);
		}
	}
	
	this.currentAngle = function(){
		try{
			return StoryTeller.RotationAngle;
		}
		catch(err){
			console.log(err);
		}
	}
	
	this.lastFrame = function(){
		try{
			StoryTeller.LastFrame();
		}
		catch(err){
			console.log(err);
		}
	}
	
	this.firstFrame = function(){
		try{
			StoryTeller.FirstFrame();
		}
		catch(err){
			console.log(err);
		}
	}
	
	this.onload();
}

function playButton (el){
	var playImg = "img/slider-play.png";
	var pauseImg = "img/slider-pause.png";
	
	var imgEl = el;
	var self = this;
	this.on = false;
	el.src = playImg;
	this.onFxn = null;
	this.offFxn = null;
	
	this.turnOn = function(){
		self.on = true;
		el.src = pauseImg;
		if(self.onFxn) self.onFxn();
	}
	
	this.turnOff = function(){
		self.on = false;
		el.src = playImg;
		if(self.offFxn) self.offFxn();
	}
	
	el.onmousedown = function(){
		var ret = false; 
		if(self.on) self.turnOff();
		else self.turnOn();
	}
}

var rotation = new function (){
	var self = this;
	
	this.button = new playButton($("rotBtn"));
	this.slider = new smmSlider($("rotSlider"));
	
	self.slider.addChangeCallback(function(sldr){
		stories.setRotationAngle(Math.round(180-360*sldr.getPercent()));
		self.button.turnOff();
	});
	
	self.button.onFxn = stories.rotate;
	self.button.offFxn = stories.stopRotation;
	
	
	this.update = function(){
		if(self.button.on) self.slider.setPercent(-(stories.currentAngle()-180)/360.);
	}
	
	this.reset = function(){
		self.button.turnOff();
		self.slider.setPercent(0);
	}
	
	this.start = function(){
		self.button.turnOn();
	}
	
	setInterval(self.update,100);
}

var animation = new function(){
	var self = this;
	
	this.maxFrames= 2853;
	
	this.button = new playButton($("animBtn"));
	this.slider = new smmSlider($("animSlider"));
	
	self.slider.addChangeCallback(function(sldr){
		stories.setFrame(Math.round(self.maxFrames*sldr.getPercent()));
		self.button.turnOff();
	});
	
	self.button.onFxn = stories.play;
	self.button.offFxn = stories.pause;
	
	
	this.update = function(){
		if(self.button.on) self.slider.setPercent(stories.currentFrame()/self.maxFrames);
	}
	
	this.frameCB = function(){
		self.maxFrames = stories.currentFrame();
		stories.firstFrame();
		stories.play();
		
		console.log("Last frame is "+self.maxFrames);
	}
	
	this.recalcMaxFrames = function(){
		stories.pause();
		stories.lastFrame();
		setTimeout(self.frameCB,500);
	}
	
	this.reset = function(){
		self.button.turnOff();
		self.slider.setPercent(0);
	}
	
	//this.recalcMaxFrames();
	
	this.reload = function(){
		self.recalcMaxFrames();
	}
	
	this.start = function(){
		self.button.turnOn();
	}
	
	//stories.pause();
	
	setInterval(self.update,100);
}

var controller = new function(){
	
}

//setInterval(function(){location.reload(true)},6000);
var stories = new function(){

	this.frameRate = 20.0;
	this.rotationRate = 4;
	this.frame = 0;

	this.onload = function () {
		StoryTeller.url = "tcp://192.168.137.107:8080/StoryTeller"
		console.log("connecting...");
	}


	this.loadScene = function(chapter, page) {
		StoryTeller.Chapter = chapter;
		StoryTeller.Page = page;
	}


	this.pause = function() {
		StoryTeller.Pause
	}


	this.play = function() {
		StoryTeller.FrameRate = this.frameRate;
		StoryTeller.Play
	}


	this.rotate = function() {
		StoryTeller.RotationRate = this.rotationRate;
		StoryTeller.Rotating = true
	}

	this.stopRotation = function() {
		StoryTeller.Rotating = false
	}


	this.flip = function() {
		if ((a = StoryTeller.flippoles) == true)
			StoryTeller.FlipPoles = false
		else
			StoryTeller.FlipPoles = true
	}


	this.priorPage = function() {
		StoryTeller.PreviousPage
	}

	this.nextPage = function() {
		StoryTeller.NextPage
	}
	
	this.nextFrame = function(){
		this.frame = StoryTeller.Frame
		StoryTeller.frame = ++this.frame;
	}
	
	this.prevFrame = function(){
		this.frame = StoryTeller.Frame
		StoryTeller.frame = --this.frame;
	}
	
	this.currentFrame =function(){
		return this.frame = StoryTeller.Frame;
	}
	
	this.setFrame = function(frm){
		StoryTeller.Frame = frm;
	}
	
	this.setRotationAngle = function(ang){
		StoryTeller.RotationAngle = ang;
	}
	
	this.currentAngle = function(){
		return StoryTeller.RotationAngle;
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
		stories.setRotationAngle(Math.round(-180+359*sldr.getPercent()));
		self.button.turnOff();
	});
	
	self.button.onFxn = stories.rotate();
	self.button.offFxn = stories.stopRotation();
	
	
	this.update = function(){
		if(self.button.on) self.slider.setPercent(stories.currentAngle()/359.);
	}
	
	this.reset = function(){
		self.button.turnOff();
		self.slider.setPercent(0);
	}
}

var animation = new function(){
	var self = this;
	
	this.maxFrames= 0;
	
	this.button = new playButton($("animBtn"));
	this.slider = new smmSlider($("animSlider"));
	
	self.slider.addChangeCallback(function(sldr){
		stories.setFrame(Math.round(self.maxFrames*sldr.getPercent()));
		self.button.turnOff();
	});
	
	self.button.onFxn = stories.play();
	self.button.offFxn = stories.pause();
	
	
	this.update = function(){
		if(self.button.on) self.slider.setPercent(stories.currentFrame()/self.maxFrames);
	}
	
	this.recalcMaxFrames = function(){
		StoryTeller.LastFrame;
		self.maxFrames = stories.currentFrame();
		StoryTeller.FirstFrame;
	}
	
	this.reset = function(){
		self.button.turnOff();
		self.slider.setPercent(0);
	}
}

var controller = new function(){
	
}
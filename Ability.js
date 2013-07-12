function Ability (){
	this.name = "";
	this.tooltip = "";
	this.order = "";
	this.value = "";
	this.pic = "";
	
	this.click = function(){
		
	}
	
	this.setName = function(value){
		this.name = value;
	}
	this.setTooltip = function(value){
		this.tooltip = value;
	}
	this.setOrder = function(value){
		this.order = value;
	}
	this.setValue = function(value){
		this.value = value;
	}
	this.setPic = function(value){
		this.pic = value;
	}
	this.getPic = function(){
		return this.pic;
	}
}
function readAbility(Path){
	document.getElementById('buttonDiv').innerHTML = ""
	var txtFile = new XMLHttpRequest();
	var newAbi = "";
	_isif=false;
	Path = rootFolder + Path;
	console.debug(Path);
	txtFile.open("GET", "TextReader.php?path=" + Path, false);
	txtFile.onreadystatechange = function() {
	  if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
		  allText = txtFile.responseText;
		  blocks = txtFile.responseText.split("$"); // Will separate each line into an array
		  blocks.shift();
		  blocks.pop();
		  console.debug(blocks);
		  newAbi = parseAbility(blocks);
		  
	  }
	}
	txtFile.send(null);
	return newAbi;
}

function parseAbility(Blocks){
	var orderHash = {};
	var newAbi = document.createElement("img");	
	for(var i = 0; i < Blocks.length; i++){
		//Erstelle neues Object
		
		
		//Entferne Whitespaces
		Blocks[i] = Blocks[i].replace(/^\s+|\s+$/g,'');
		sp = Blocks[i].split(": ");
		order = sp[0];
		value = sp[1];
		orderHash[order] = value;
		for(var h = 2; h < sp.length; h++){
			value = value + " " + sp[h];
		}
		switch(order){
			case "name":
				console.debug('Ability Name = ' + value);
				newAbi.dataset.name = value;
				break;
			case "tooltip":
				console.debug('Tooltip = ' + value);
				newAbi.dataset.tooltip = value;
				break;
			case "order":
				console.debug('Order = ' + value);
				newAbi.dataset.order = value;
				break;
			case "value":
				console.debug('Value = ' + value);
				newAbi.dataset.value = value;
				break;
			case "pic":
				console.debug('Pic = ' + value);
				newAbi.setAttribute('src', value);
				break;
		}
	}
	console.log(orderHash);
	newAbi.setAttribute('class', 'Ability');
	newAbi.setAttribute('OnMouseOver', "SetTooltip('" + newAbi.dataset.tooltip + "')");
	newAbi.setAttribute('OnMouseUp', "ClickAbility('" + newAbi.dataset.order + "', '" + value + "')");
	return newAbi;	
}
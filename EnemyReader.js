function readEnemy(Path){
	document.getElementById('buttonDiv').innerHTML = ""
	var txtFile = new XMLHttpRequest();
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
		  parseEnemy(blocks);
	  }
	}
	txtFile.send(null);
}

function parseEnemy(Blocks){
	var orderHash = {};
	for(var i = 0; i < Blocks.length; i++){
		//Entferne Whitespaces
		Blocks[i] = Blocks[i].replace(/^\s+|\s+$/g,'');
		sp = Blocks[i].split(": ");
		order = sp[0];
		value = sp[1];
		orderHash[order] = value;
		for(var h = 2; h < sp.length; h++){
			value = value + " " + sp[h];
		}
		console.debug("Da kommt der Switch");
		switch(order){
			case "name":
				console.debug('Setze Name auf: ' + value);
				document.getElementById('enemyName').innerHTML = value;
				break;
			case "abi":
				console.debug('Adding Ability: ' + value);
				var newAbi = readAbility(value);
				newAbi.setAttribute('OnMouseUp', "");
				enemyAbilities.push(newAbi);
				document.getElementById("enemyAbilityDiv").appendChild(newAbi);
				break;
		}
	}
	console.log(orderHash);
}
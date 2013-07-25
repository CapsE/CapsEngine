function readFile(Path){
	document.getElementById('buttonDiv').innerHTML = ""
	var txtFile = new XMLHttpRequest();
	_isif=false;

	txtFile.open("GET", "TextReader.php?path=" + Path, false);
	txtFile.onreadystatechange = function() {
	  if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
		  allText = txtFile.responseText;
		  blocks = txtFile.responseText.split("$"); // Will separate each line into an array
		  blocks.shift();
		  blocks.pop();
		  console.debug(blocks);
		  parseBlocks(blocks);
	  }
	}
	txtFile.send(null);
}

function parseBlocks(Blocks){
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
		
		switch(order){
			case "text":
				console.debug('Setze Text auf: ' + value);
				document.getElementById('text').innerHTML = value;
				break;
			case "AddText":
				console.debug('Hinzufügen Text: ' + value);
				document.getElementById('text').innerHTML = document.getElementById('text').innerHTML + value;
				break;
			case "background":				
				console.debug('Lade Bild: ' + rootFolder + "/" + value);
				
				document.getElementById('bg2').src = rootFolder + "/" + value;
				fading = window.setInterval("fade()", 1000/30);
				
				break;
			case "option":
				console.debug('Erstelle Option: ' + value);
				sp = value.split(" => ");
				name = sp[0];
				
				ziel = rootFolder + "/" + sp[1] + ".txt";
				console.debug(ziel);
				if(name == "Weiter"){
					nextRoom = ziel;
				}else{
					nextRoom = "";
					btn = document.createElement("div");
					btn.innerHTML = name;
					btn.setAttribute("onclick", "readFile('" + ziel + "');");
					//btn.setAttribute("onclick", "nextRoom = '" + ziel + "';");
					btn.isOption = true;
					btn.id = "buttonText";
					document.getElementById('buttonDiv').appendChild(btn);
				}
				break;
			case "music":
				console.debug("Lade Musik" + value);
				musicpath= rootFolder + "/" + value;
				console.debug("musicpath: " + musicpath);
			//##########################################################					
					audioElement.setAttribute('src', ''+musicpath+'.ogg');
					audioElement.play();			
			//##########################################################
 				/* audiodiv = '<audio preload="auto" autoplay="autoplay" loop="loop" controls><source src="' + musicpath + '.mp3" type="audio/mpeg"><source src="' + musicpath + '.ogg" type="audio/ogg"><source src="' + musicpath + '.wav" type="audio/wav">Your browser does not support this audio format.</audio> ';
				document.getElementById('audiodiv').innerHTML = audiodiv;
				console.debug(document.getElementById('audiodiv').innerHTML); */
				break;
			case "sound":
				console.debug("Lade Sound" + value);
				soundpath= rootFolder + "/" + value;
				console.debug("soundpath" + soundpath);
 				sounddiv = '<audio preload="auto" autoplay="autoplay"><source src="' + soundpath + '" type="audio/wav">Your browser does not support this audio format.</audio> ';
				document.getElementById('sounddiv').innerHTML = sounddiv;
				console.debug(document.getElementById('sounddiv').innerHTML);
				break;
			case "endDialog":
				//Am 28.05. Vorläufig abgeschafft
				break;
				
			case "end":
				
				break;
			
			case "dialog":
				//Am 28.05. Vorläufig abgeschafft
				break;
				
			case "set":
				var splitted = value.split(' => ');
				console.debug('Setze: ' + splitted[0] + ' = ' + splitted[1]); 
				attr[splitted[0]] = eval(splitted[1]);
				console.debug(attr); 
				break;
				
  			case "if":
				var _isif= true;
				var _isthen = false;
				var _iselse = false;
				value = value.replace(/(\r\n|\n|\r)/gm," ");
				
				var words = value.split(" ");
				console.debug(words);
				var _if = "";
				var _then = "";
				var _else = "";
				for(var i = 0; i < words.length; i++){
					if(_isif){
						_if = _if + " " + words[i];						
					}
					if(_isthen){
						_then = _then + " " + words[i];
					}
					if(_iselse){
						_else = _else + " " + words[i];
					}
					if(words[i] == "then"){
						_isthen = true;
						_isif = false;
					}
					if(words[i] == "else"){
						_isthen = false;
						_iselse = true;
					}
				}
				_if = _if.split(" ");
				_if.pop();
				_if = _if.join(" ");
				_then = _then.split(" ");
				_then.pop();
				_then[1] = _then[1] + ":";
				_then = _then.join(" ");
				_else = _else.split(" ");
				_else[1] = _else[1] + ":";
				_else = _else.join(" ");
				_thenBlock = [_then];
				_elseBlock = [_else];
				
				console.debug("if: " + _if);
				console.debug("then: " + _thenBlock);
				console.debug("else: " + _elseBlock);
				if(eval(_if)){
					console.debug("Es stimmt!");
					parseBlocks(_thenBlock);
				}else{
					console.debug("Es stimmt NICHT!");
					parseBlocks(_elseBlock);
				}
				
				break;
			case "root":
				console.debug("Rootfolder: " + value);
				rootFolder = value;
				break;
			case "watermark":
				//document.getElementById("watermarkHolder").setAttribute("style","background-image: url(" + value + ");");
				break;
			case "code":
				eval(value);
				break;
			case "always":
				alwaysRead = value;
				break;
			case "fight":
				document.getElementById("normalView").style.display = "none";
				document.getElementById("fightView").style.display = "inline";
				
				document.getElementById('myHPBar').max = hero["maxHp"];
				document.getElementById('myHPBar').value = hero["hp"];
				document.getElementById("myHP").innerHTML = hero["hp"] + "/" + hero["maxHp"];
				readEnemy(value);
				break;
			case "abi":
				console.debug('Adding Ability: ' + value);
				var newAbi = readAbility(value);
				myAbilities.push(newAbi);
				document.getElementById("myAbilityDiv").appendChild(newAbi);
				break;
			case "bar":
				console.debug('Adding Bar: ' + value);
				value = value.split(",");
				if(bars[value[0]] == null){
					var curBar = document.createElement("progress");
					curBar.setAttribute("class", "progressBar");
					var label = document.createElement("div");
					label.innerHTML = value[0];
					label.setAttribute("class", "barLabel");
					document.getElementById("barHolder").appendChild(label);
					document.getElementById("barHolder").appendChild(curBar);
					
					
				}else{
					var curBar = bars[value[0]];
				}
				curBar.value = value[1];
				curBar.max = value[2];
				if(value[3] != null){
					curBar.style.color = value[3];
				}	
				break;
		}
	}
	console.log(orderHash);
}
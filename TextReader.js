function readFile(Path){
	console.debug("################################################");
	console.debug("Lade Raum: " + Path);
	console.debug("################################################");
	var txtFile = new XMLHttpRequest();
	_isif=false;

	txtFile.open("GET", Path, false);
	txtFile.onreadystatechange = function() {
	  if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
		  allText = txtFile.responseText;
		  blocks = txtFile.responseText.split("$"); // Will separate each line into an array
		  blocks.shift();
		  blocks.pop();
		  console.debug("Blocks: "+blocks);
		  parseBlocks(blocks);
	  }
	}
	txtFile.send(null);
}

function parseBlocks(Blocks){
	var orderHash = {};
	if (_isif==true){_length=Blocks.length;}else{_length=Blocks.length}
	
	for(var i = 0; i < _length; i++){
		console.debug("i: "+i);
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
				var newdiv = document.createElement('div');
				newdiv.setAttribute("class", "textField");
				newdiv.style.left = rnd(10,69) + "%";
				newdiv.style.top = rnd(10,69) + "%";
				newdiv.innerHTML = value;
				document.getElementById('normalView').appendChild(newdiv);
				roomDivs.push(newdiv);
				break;
			case "background":
				
				console.debug('Lade Bild: ' + value);
				var old = background;
				background = paper.image(value,0,0,"100%", "100%");
				old.toFront();
				old.animate({opacity: 0}, 2000);  
				
				break;
			case "option":
				document.getElementById('buttonDiv').innerHTML = ""
				console.debug('Erstelle Option: ' + value);
				sp = value.split(" => ");
				name = sp[0];
				name = name.replace(/^\s+|\s+$/g,'');
				
				ziel = rootFolder + sp[1] + ".txt";
				console.debug(ziel);
				if(name != "Weiter"){
					console.debug("IF Aktiviert");
					btn = '<a id="buttonText" OnClick="readFile(' +"'"+ ziel +"'"+ ');">' + name + '</a>';
					document.getElementById('buttonDiv').innerHTML = document.getElementById('buttonDiv').innerHTML + btn;
					console.debug(document.getElementById('buttonDiv').innerHTML);
					roomToRead = "t";
				}else{
					console.debug("Else Aktiviert");
					document.getElementById('buttonDiv').innerHTML = "";
					roomToRead = ziel;
				}
				break;
			case "music":
				console.debug("Lade Musik" + value);
				musicpath=value;
				console.debug("musicpath" + musicpath);
			//##########################################################
					var audioElement = document.createElement('audio');
					audioElement.setAttribute('src', ''+musicpath+'.ogg');
					audioElement.play();			
			//##########################################################
 				/* audiodiv = '<audio preload="auto" autoplay="autoplay" loop="loop" controls><source src="' + musicpath + '.mp3" type="audio/mpeg"><source src="' + musicpath + '.ogg" type="audio/ogg"><source src="' + musicpath + '.wav" type="audio/wav">Your browser does not support this audio format.</audio> ';
				document.getElementById('audiodiv').innerHTML = audiodiv;
				console.debug(document.getElementById('audiodiv').innerHTML); */
				break;
			case "sound":
				console.debug("Lade Sound" + value);
				soundpath=value;
				console.debug("soundpath" + soundpath);
 				sounddiv = '<audio preload="auto" autoplay="autoplay"><source src="' + soundpath + '" type="audio/wav">Your browser does not support this audio format.</audio> ';
				document.getElementById('sounddiv').innerHTML = sounddiv;
				console.debug(document.getElementById('sounddiv').innerHTML);
				break;
			case "endDialog":
				document.getElementById('buttonDiv').innerHTML = ""
				console.debug('Erstelle Option: ' + value);
				sp = value.split(" => ");
				name = sp[0];
				name = name.replace(/^\s+|\s+$/g,'');
				
				ziel = rootFolder + sp[1] + ".txt";
				console.debug(ziel);
				if(name != "Weiter"){
					console.debug("IF Aktiviert");
					btn = '<a id="buttonText" OnClick="readFile(' +"'"+ ziel +"'"+ ');">' + name + '</a>';
					document.getElementById('buttonDiv').innerHTML = document.getElementById('buttonDiv').innerHTML + btn;
					console.debug(document.getElementById('buttonDiv').innerHTML);
					roomToRead = "t";
				}else{
					console.debug("Else Aktiviert");
					document.getElementById('buttonDiv').innerHTML = "";
					roomToRead = ziel;
				}
				break;
				
			case "end":
				
				break;
			
			case "dialog":
				document.getElementById('buttonDiv').innerHTML = ""
				console.debug('Erstelle Option: ' + value);
				sp = value.split(" => ");
				name = sp[0];
				name = name.replace(/^\s+|\s+$/g,'');
				
				ziel = rootFolder + sp[1] + ".txt";
				console.debug(ziel);
				if(name != "Weiter"){
					console.debug("IF Aktiviert");
					btn = '<a id="buttonText" OnClick="readFile(' +"'"+ ziel +"'"+ ');">' + name + '</a>';
					document.getElementById('buttonDiv').innerHTML = document.getElementById('buttonDiv').innerHTML + btn;
					console.debug(document.getElementById('buttonDiv').innerHTML);
					roomToRead = "t";
				}else{
					console.debug("Else Aktiviert");
					document.getElementById('buttonDiv').innerHTML = "";
					roomToRead = ziel;
				}
				break;
			case "set":

				var splitted = value.split(' => ');
				console.debug('Setze: ' + splitted[0] + ' = ' + splitted[1]); 
				attr[splitted[0]] = eval(splitted[1]);
				console.debug(attr); 
				break;
  			case "if":
				_isisf= true;
				lines = value.split("\r\n");
				_if = lines[0];
				_then = [];
				_else = [];
				for(var i = 1; i < lines.length; i++){
					words = lines[i].split(" ");
					words[1] = words[1] + ":";
					line = "";
					if(words[0] === "then"){
						line = words[1];
						for(var h = 2; h < words.length; h++){
							line = line + " " + words[h];
						}
						_then.push(line);
					}
					if(words[0] === "else"){
						line = words[1];
						for(var h = 2; h < words.length; h++){
							line = line + " " + words[h];
						}
						_else.push(line);
					}
				}
				console.debug("if: " + _if);
				console.debug("then: " +_then);
				console.debug("else: " +_else);
				if(eval(_if)){
					_then.push("text: halooooooo");
					parseBlocks(_then);
				}else{
					_else.push("text: halooooooo");
					parseBlocks(_else);
				}
				break;
			case "root":
				rootFolder = value;
				break;
			case "watermark":
				document.getElementById("watermarkHolder").setAttribute("style","background-image: url(" + value + ");");
				break;
			case "code":
				eval(value);
				break;
			case "always":
				alwaysRead = value;
				break;
		}
	}
	console.log(orderHash);
}
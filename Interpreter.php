<!DOCTYPE xhtml PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de">	
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
		<script language="javascript" src="EnemyReader.js"></script>
		<script language="javascript" src="TextReader.js"></script>
		<script language="javascript" src="jQuery.js"></script>
		<script language="javascript" src="raphael.js"></script>
		<script language="javascript" src="UTF-Encode.js"></script>
		<meta name="author" content="Laura Gohl, Lars Krafft, Mensur Muratovic und Jan Ryklikas"/>
		<meta name="keywords" lang="de" content="Dark History"/>
		<meta name="description" content="Dies ist ein Projekt von Laura Gohl, Lars Krafft und Mensur Muratovic! Enjoy the story of "Dark History" "/>
		<meta http-equiv="language" content="de"/>
		<meta http-equiv="imagetoolbar" content="no"/>
		<meta name="robots" content="noindex, nofollow"/>
		<link rel="shortcut icon" href="Pics/Story.ico" type="image/x-icon"/>
		
		<meta name="viewport" content="width=1024" />
		<link href="Style.css" rel="stylesheet" type="text/css">
		<title>Dark History</title>
	</head>
	<?php
		$startRoom = $_GET["r"];
	?>
	<div id="center">
		
<!--################################################### normal View-->
		<div id="barHolder">
			<div id="controlBar" onclick="toggleBar()">
				<div class="controlButton">-</div>
				<div class="controlButton">Mute</div>
				<div class="controlButton">+</div>		
			</div>	
			<div id="toggleButton" class="controlButton" onclick="toggleBar()" style="float:right; cursor:pointer;">hide</div>
		</div>
		<div id="normalView" style="">
			<canvas id="myCanvas"></canvas>
			<img id="bg2" class="background" src="Pics/button.png" onclick="readNextRoom()"></img>
			<img id="bg1" class="background" src="Pics/button.png" onclick="readNextRoom()"></img>
			<img id="nextButton" src="Pics/NextButton.png" style="position:absolute; right:20%; top:80%; cursor:pointer; opacity:0.9" onclick="readNextRoom()"></img>
			
			<div id="textField"> 
				<div id="text" onclick="readNextRoom()">
					Moose sind gr�ne Landpflanzen, die in der Regel kein St�tz- und Leitgewebe ausbilden. Nach heutiger Auffassung haben sie sich vor etwa 400 bis 450 Millionen Jahren aus Gr�nalgen der Gezeitenzone entwickelt. Die Moose sind durch einen Generationswechsel gekennzeichnet, bei dem die geschlechtliche Generation (Gametophyt) gegen�ber der ungeschlechtlichen (Sporophyt) dominiert. Der haploide Gametophyt ist die eigentliche Moospflanze, er kann lappig (thallos) oder bebl�ttert (folios) sein. Kennzeichen der Moose sind die Photosynthesepigmente Chlorophyll a und b, St�rke als Speichersubstanz und Zellw�nde aus Zellulose, aber ohne Lignin. Es gibt rund 16.000 bekannte Arten. Die Wissenschaft von den Moosen hei�t Bryologie. Die drei klassischen Sippen Hornmoose, Lebermoose und Laubmoose bilden einzeln jeweils nat�rliche Abstammungslinien, die Moose insgesamt sind jedoch keine nat�rliche Verwandtschaftsgruppe.
				</div>
				<div id="buttonDiv">
					<a id="buttonText" OnClick="readFile('Rooms/Room002.txt');">Raum2</a>
				</div>				

				<!--<div id="audiodiv" style="display: block; top: 0px; position: absolute; z-index: 1000;margin: -35px 0px 0px 0px;></div>-->
			</div>
			
			<div id="sounddiv"></div>
				
		</div>
<!--################################################### fight View-->
		<div id="fightView" style="display: none">
			<div id="enemyName">Gegner</div>
				<div id="enemyAP">1</div>
				<div id="enemyHP">100/100</div>
				<progress value="100" max="100" id="enemyHPBar" class="HPBar"></progress>
				<div id="enemyAbilityDiv">
					<img src="Pics/Icons/heal.jpg" class="enemyAbility"></img> 
					<img src="Pics/Icons/moon.jpg" class="enemyAbility"></img> 
					<img src="Pics/Icons/potion.jpg" class="enemyAbility"></img> 
				</div>
			<div id="myRegion"></div>
			<div id="myAP">1</div>
				<div id="myHP">100/100</div>
				<progress value="100" max="100" id="myHPBar" class="HPBar"></progress>
				<div id="myAbilityDiv">
					<img src="Pics/Icons/heal.jpg" class="myAbility"></img> 
					<img src="Pics/Icons/moon.jpg" class="myAbility"></img> 
					<img src="Pics/Icons/potion.jpg" class="myAbility"></img> 
				</div>
			<div id="battleLog">Der Kampf beginnt</div>
			<div id="tooltip">Tooltip missing</div>
			<img src="Pics/Paris.jpg" id="enemyPic"></img>			
		</div>
<!--###################################################-->
	</div>
	<script language='javascript'>
		var barShown = true;
		var nextRoom = "";
		
		var attr = {};
		var rootFolder = "Rooms";
		var fading;
		var opacity = 1;
		var audioElement = document.createElement('audio');
		attr['hp'] = 1;
		attr['init'] = 1;

		//var textfeld = new Picture('Pics/wei�.png',[canvas.width-270,canvas.height-140],[canvas.width-100, canvas.height-50],ctx);
		var startRoom = '<?php echo $startRoom;?>';
		console.debug("StartRoom: " + startRoom);
		readFile(startRoom);
		//background.setTransparency(50);
		var element = document.getElementById("textField");
		//var test = new Shadow([0,0],[element.offsetWidth, element.offsetHeight], ctx, 5);
		//test.append(document.getElementById("textField"));
				
		function toggleBar(){
			if(barShown){
				barShown = false;
				document.getElementById("controlBar").style.display = "none";
				document.getElementById("toggleButton").innerHTML = "show";
			}else{
				barShown = true;
				document.getElementById("controlBar").style.display = "block";
				document.getElementById("toggleButton").innerHTML = "hide";
			}
		}
		
		function readNextRoom(){
			console.debug("click");
			if(document.getElementById("buttonDiv").innerHTML == ""){
				readFile(nextRoom);
			}
			console.debug(attr);
		}
		
		function rnd(x,y){
			var v = Math.floor((Math.random()*(y-x))+x); 
			return v;		
		}
		
		function fade(){			
			if(opacity > 0){
				opacity -= 0.05;
				document.getElementById("bg1").style.opacity = opacity;
			}else{
				window.clearInterval(fading);
				document.getElementById("bg1").src = bg2.src;
				document.getElementById("bg1").opacity = 1;
				opacity = 1;
			}
		}

	</script>
</html>
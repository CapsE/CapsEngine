<!DOCTYPE xhtml PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de">	
	<head>
		<script language="javascript" src="Obj2D.js"></script>
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
		<link rel="shortcut icon" href="Pics/Watermark2.ico" type="image/x-icon"/>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
		<meta name="viewport" content="width=1024" />
		<link href="Style.css" rel="stylesheet" type="text/css">
		<title>Dark History</title>
	</head>
	<?php
		$startRoom = $_GET["r"];
	?>
	<div id="center">
		<canvas id="myCanvas" onclick="fullClick()"></canvas>
		<div id="menuBar">
			<div id="musicControl" class="menuItem">Musik kontrolle</div>
			<div id="safeLoadControl" class="menuItem">Laden und Speichern</div>
			<div id="sizeControl" class="menuItem">Größe einstellen</div>			
		</div>
		<div id="showHide"><a onclick="toggleMenu()">Show/hide</a></div>
<!--################################################### normal View-->
		<div id="normalView" style="">
			<div id="watermarkHolder" onclick="fullClick()"></div>
			<div id= "textField" class="textField" onclick="fullClick()"> 
				<div id="text" class="text">
					Moose sind grüne Landpflanzen, die in der Regel kein Stütz- und Leitgewebe ausbilden. Nach heutiger Auffassung haben sie sich vor etwa 400 bis 450 Millionen Jahren aus Grünalgen der Gezeitenzone entwickelt. Die Moose sind durch einen Generationswechsel gekennzeichnet, bei dem die geschlechtliche Generation (Gametophyt) gegenüber der ungeschlechtlichen (Sporophyt) dominiert. Der haploide Gametophyt ist die eigentliche Moospflanze, er kann lappig (thallos) oder beblättert (folios) sein. Kennzeichen der Moose sind die Photosynthesepigmente Chlorophyll a und b, Stärke als Speichersubstanz und Zellwände aus Zellulose, aber ohne Lignin. Es gibt rund 16.000 bekannte Arten. Die Wissenschaft von den Moosen heißt Bryologie. Die drei klassischen Sippen Hornmoose, Lebermoose und Laubmoose bilden einzeln jeweils natürliche Abstammungslinien, die Moose insgesamt sind jedoch keine natürliche Verwandtschaftsgruppe.
				</div>	
				<!--<div id="audiodiv" style="display: block; top: 0px; position: absolute; z-index: 1000;margin: -35px 0px 0px 0px;></div>-->
			</div>
			<div id="buttonDiv">
				<a id="buttonText" OnClick="readFile('Rooms/Room002.txt');">Raum2</a>
			</div>
			<br/>
			
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
		var canvas = document.getElementById('myCanvas');
		var menuVis = true;
		var roomToRead = "t";
		var roomDivs = [];
		roomDivs.push(document.getElementById('textField'));
		var paper = new Raphael(document.getElementById('center'),"100%","100%");
		
		var attr = {};
		var rootFolder = "Rooms";
		attr['hp'] = 1;
		attr['init'] = 1;

		var background = paper.image('Pics/button.png',0,0,"100%", "100%");
		//var textfeld = new Picture('Pics/weiß.png',[canvas.width-270,canvas.height-140],[canvas.width-100, canvas.height-50],ctx);
		var startRoom = '<?php echo $startRoom;?>';
		console.debug("StartRoom: " + startRoom);
		readFile(startRoom);
		//background.setTransparency(50);
		var element = document.getElementById("textField");
		//var test = new Shadow([0,0],[element.offsetWidth, element.offsetHeight], ctx, 5);
		//test.append(document.getElementById("textField"));
				
		function run(){			
			
		}
		
		function draw(){
			ctx.clearRect(0,0,1000,1000);
			//test.draw();
			background.draw();
			//textfeld.draw();
		}
		
		function toggleMenu(){
			if(menuVis == true){
				document.getElementById("menuBar").style.display = "none";
				document.getElementById("showHide").style.top = "0%";
				menuVis = false;
			}else{
				document.getElementById("menuBar").style.display = "";
				document.getElementById("showHide").style.top = "3%";
				menuVis = true;
			}
		}
		
		function fullClick(){
			console.debug("click");
			if(roomToRead != "t"){	
				for(var i = 0; i < roomDivs.length; i++){
					roomDivs[i].style.opacity = 0.2;
				}
				
				if(roomDivs.length >= 5){
					document.getElementById('normalView').removeChild(roomDivs.shift());
				}
				readFile(roomToRead);
			}
		}
		
		function rnd(x,y){
			r = Math.floor((Math.random()*(y-x))+x); 
			return r;
		}

	</script>
</html>
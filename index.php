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
	<div id="center">
		<canvas id="myCanvas"></canvas>
<!--################################################### normal View-->
		<div id="normalView" style="">
			<div id="watermarkHolder"></div>
			<div id="textField"> 
				<div id="text">Ohah das ist mal ein Text sag ich euch</div>

				<div id="buttonDiv">
					<a id="buttonText" OnClick="readFile('Rooms/Room002.txt');">Raum2</a>
				</div>

				<!--<div id="audiodiv" style="display: block; top: 0px; position: absolute; z-index: 1000;margin: -35px 0px 0px 0px;></div>-->
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
	<script>
		var canvas = document.getElementById('myCanvas');
		var paper = new Raphael(document.getElementById('center'),"100%","100%");
		
		var attr = {};
		attr['hp'] = 1;
		attr['init'] = 1;

		var background = paper.image('Pics/Paris_unscharf.jpg',0,0,"100%", "100%");
		//var textfeld = new Picture('Pics/weiß.png',[canvas.width-270,canvas.height-140],[canvas.width-100, canvas.height-50],ctx);
		readFile('Rooms/Room001.txt');
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
		
		function update(){
		
		}

	</script>
</html>
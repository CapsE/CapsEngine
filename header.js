		function rnd(v,b){
			num = Math.random()*(b-v) + v;
			num = Math.round(num);
			return num;
		}
		
		//frontend
		function addFoto(){			
			var i = rnd(0, fotoCol.length);
			var z = rnd(1,5);
			var foto = paper.image(fotoCol[i], rnd(0,800), rnd(0,100), 50*z, 50*z);
			foto.attr("opacity", 0);
			foto.data("z", z);
			foto.attr("transform", "r" + rnd(-45, 45));
			foto.animate({
				opacity: 1
			},2000);
			foto.animate({
				transform: "t" + (500*z+800) + ",0"
			},35000);
			fotos.push(foto);
			
			//Nach Ebenen sortieren
			for(var x = 1; x <= 5; x++){
				for(var y = 0; y < fotos.length; y++){
					if(fotos[y].data("z") == x){
						fotos[y].toFront();
					}
				}
			}
			//Überflüssige rausschmeißen damit es nicht zu viele werden
			if(fotos.length > 8){
				fotos[0].animate({opacity: 0}, 2000, function() {  
					this.remove();  
				});  
				fotos.shift();
			}
			
		}
(function() {
    var context;
    var width;
    var height; 
	var creator=false;
    var moveRight = false;
    var moveUp = false;
    var moveDown = false;
    var moveLeft= false;
    var score=0;
    var interval_id;
	var box={
		x:20,
		y:20,
		size: 100,
	};
	var myarr=new Array();
	var mx = 0;
	var mn;
	var ni;

	myarr=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	
	
	document.addEventListener('DOMContentLoaded', init, false);

function init(){
	
	var canvas = document.querySelector('canvas');
	context=canvas.getContext('2d');
	width=canvas.width;
	height=canvas.height;
	random_number();
	random_number();
	myarr=myarr;
	window.addEventListener('keydown',activate,false);
    interval_id=window.setInterval(draw,33);
}

function gameover(max) {
	clearInterval(interval_id);
	window.removeEventListener('keydown',activate);
	document.getElementById('gametitle').innerHTML="Gameover~  You got highest score is "+max+"&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:window.location.reload();'>Try Again~</a>";
}

function draw() {
	context.clearRect(0,0,width,height);
	var bkcolor;
	for (var i=0;i<4;i++){
		for (var j=0;j<4;j++){
			switch (myarr[i][j]){
				case 0:
					bkcolor = '#ccc0b2';
					break;
				case 2:
					bkcolor = '#eee4da';
					break;
				case 4:
					bkcolor = '#f0d1b6';
					break;
				case 8:
					bkcolor = '#f2b179';
					break;
				case 16:
					bkcolor = '#f59563';
					break;
				case 32:
					bkcolor = '#f57c5f';
					break;
				case 64:
					bkcolor = '#f65d3b';
					break;
				case 128:
					bkcolor = '#edce71';
					break;
				case 256:
					bkcolor = '#edcc61';
					break;
				case 512:
					bkcolor = '#ecc850';
					break;
				case 1024:
					bkcolor = '#edc53f';
					break;
				case 2048:
					bkcolor = '#eec22e';
					break;
				case 4096:
					bkcolor = '#cc3333';
					break;
				case 8192:
					bkcolor = '#ff9900';
					break;
			}
			context.fillStyle = bkcolor;
			context.fillRect(10*i+i*60+10,10*j+j*60+10,60,60);
		}
	}
	for (var i=0;i<4;i++){
		for (var j=0;j<4;j++){
			context.font="20px Arial";
			context.textAlign="center";
			context.fillStyle = '#333333';
			context.fillText(myarr[i][j],10*i+i*60+40,10*j+j*60+50)
		}
	}
	for (var i=0;i<4;i++){
		for (var j=0;j<4;j++){
			context.font="10px Arial";
			context.textAlign="center";
			context.fillStyle = '#333333';
			context.fillText(i+""+j,10*i+i*60+60,10*j+j*60+70)
		}
	}
	
	var over_flag=true;
	for (var i=0;i<4;i++){
		for (var j=0;j<4;j++){
			if(myarr[i][j]>mx){mx=myarr[i][j];}
			if(myarr[i][j]==0){over_flag=false;}
			if (i==3&&j<3){
				if(myarr[i][j]==myarr[i][j+1]){over_flag=false;}
			}
			if (i<3&&j==3){
				if(myarr[i][j]==myarr[i+1][j]){over_flag=false;}
			}
			if (i<3&&j<3){
				if(myarr[i][j]==myarr[i][j+1] || myarr[i][j]==myarr[i+1][j]){over_flag=false;}
			}
		}
	}
	mn = mx;
	for (var i=0;i<4;i++){
		for (var j=0;j<4;j++){
			if(myarr[i][j]>0 && myarr[i][j]<mn){mn=myarr[i][j];}
		}
	}
	ni = 0;
	for (var i=0;i<4;i++){
		for (var j=0;j<4;j++){
			if(myarr[i][j]==mn){ni=ni+1}
		}
	}
	ni=ni%2;
	if(over_flag==true){
		alert("gameover");
		gameover(mx);
	}
	
	if (moveRight){
		moveRight=false;
		mr();
		if (creator===true){
			random_number();
			creator=false;
		}
	}

	if (moveLeft){
		moveLeft=false;
		ml();
		if (creator===true){
			random_number();
			creator=false;
		}
	}

	if (moveUp){
		moveUp=false;
		mu();
		if (creator===true){
			random_number();
			creator=false;
		}
	}
	
	if (moveDown){
		moveDown=false;
		md();
		if (creator===true){
			random_number();
			creator=false;
		}
	}
}


function getRandomNumber(min, max){
	return Math.round(Math.random() * (max - min)) + min;
}
	
function random_number(){
	var basev = mx;
	if (mx>2048){
		if (ni==0){
			for(var k=0;k<10;k++){
				basev = basev/2;
			}
		} else if (ni==1){
			for(var k=0;k<11;k++){
				basev = basev/2;
			}
		}
	}else{
		basev=2;
	}
	var i = getRandomNumber(0,3);
	var j = getRandomNumber(0,3);
	if(myarr[i][j]===0){
		if (Math.random()<0.8){
			myarr[i][j]=basev;
		}else{
			myarr[i][j]=basev*2;
		}
	}else{
		random_number();
	}
}

		function md(){
			for (var i=0;i<4;i++){
				var ds = 3;
				var dt = 3;
				for (var j=3;j>=0;j--){
					if (myarr[i][j]>0){
						if (j != ds){
							myarr[i][ds] = myarr[i][j];
							myarr[i][j] = 0;
							creator=true;
						}
						ds = ds-1;
					}
				}
				for (var j=3;j>0;j--){
					if (myarr[i][j]>0){
						if (myarr[i][j] == myarr[i][j-1]){
							myarr[i][j] = myarr[i][j]*2;
							myarr[i][j-1] = 0; 
							creator=true;
						}
					}
				}
				for (var j=3;j>=0;j--){
					if (myarr[i][j]>0){
						if (j != dt){
							myarr[i][dt] = myarr[i][j];
							myarr[i][j] = 0;
							creator=true;
						}
						dt = dt-1;
					}
				}
			}
		}
		
		function mr(){
			for (var j=0;j<4;j++){
				var rs = 3;
				var rt = 3;
				for (var i=3;i>=0;i--){
					if (myarr[i][j]>0){
						if (i != rs){
							myarr[rs][j] = myarr[i][j];
							myarr[i][j] = 0;
							creator=true;
						}
						rs = rs-1;
					}
				}
				for (var i=3;i>0;i--){
					if (myarr[i][j]>0){
						if (myarr[i][j] == myarr[i-1][j]){
							myarr[i][j] = myarr[i][j]*2;
							myarr[i-1][j] = 0; 
							creator=true;
						}
					}
				}
				for (var i=3;i>=0;i--){
					if (myarr[i][j]>0){
						if (i != rt){
							myarr[rt][j] = myarr[i][j];
							myarr[i][j] = 0;
							creator=true;
						}
						rt = rt-1;
					}
				}
			}
		}	
		
		function mu(){	
			for (var i=0;i<4;i++){
				var us = 0;
				var ut = 0;
				for (var j=0;j<=3;j++){
					if (myarr[i][j]>0){
						if (j != us){
							myarr[i][us] = myarr[i][j];
							myarr[i][j] = 0;
							creator=true;
						}
						us = us+1;
					}
				}
				for (var j=0;j<3;j++){
					if (myarr[i][j]>0){
						if (myarr[i][j] == myarr[i][j+1]){
							myarr[i][j] = myarr[i][j]*2;
							myarr[i][j+1] = 0; 
							creator=true;
						}
					}
				}
				for (var j=0;j<=3;j++){
					if (myarr[i][j]>0){
						if (j != ut){
							myarr[i][ut] = myarr[i][j];
							myarr[i][j] = 0;
							creator=true;
						}
						ut = ut+1;
					}
				}
			}
		}
		
		function ml(){
			for (var j=0;j<4;j++){
				var ls = 0;
				var lt = 0;
				for (var i=0;i<=3;i++){
					if (myarr[i][j]>0){
						if (i != ls){
							myarr[ls][j] = myarr[i][j];
							myarr[i][j] = 0;
							creator=true;
						}
						ls = ls+1;
					}
				}
				for (var i=0;i<3;i++){
					if (myarr[i][j]>0){
						if (myarr[i][j] == myarr[i+1][j]){
							myarr[i][j] = myarr[i][j]*2;
							myarr[i+1][j] = 0; 
							creator=true;
						}
					}
				}
				for (var i=0;i<=3;i++){
					if (myarr[i][j]>0){
						if (i != lt){
							myarr[lt][j] = myarr[i][j];
							myarr[i][j] = 0;
							creator=true;
						}
						lt = lt+1;
					}
				}
			}
		}	

		
function activate(event){ 
	var keyCode=event.keyCode;
	if (keyCode===37){
		moveLeft=true;
		moveDown=false;
		moveRight=false;
		moveUp=false;   
	}
	if (keyCode===38){
		moveUp=true;
		moveLeft=false;
		moveDown=false;
		moveRight=false;   
	}
	if(keyCode===39){
		moveRight=true;
		moveUp=false;
		moveLeft=false;
		moveDown=false;    
	}
	if(keyCode===40){
		moveDown=true;
		moveRight=false;
		moveUp=false;
		moveLeft=false;
	}
} 

})();
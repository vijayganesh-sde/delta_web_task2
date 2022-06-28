document.addEventListener('keydown', function(event) {
    if(event.keyCode == 87 || event.keyCode == 38) {
        moveup();
    }
    else if(event.keyCode == 83 || event.keyCode == 40) {
        movedown();
    }
    else if(event.keyCode == 65 || event.keyCode == 37) {
        moveleft();
    }
    else if(event.keyCode == 68 || event.keyCode == 39) {
        moveright();
    }
});
document.addEventListener('keyup', function(event) {
    if(event.keyCode == 87 || event.keyCode == 38) {
        myGamePiece.speedY=0;
    }
    else if(event.keyCode == 83 || event.keyCode == 40) {
        myGamePiece.speedY=0;
    }
    else if(event.keyCode == 65 || event.keyCode == 37) {
        myGamePiece.speedX=0;
    }
    else if(event.keyCode == 68 || event.keyCode == 39) {
        myGamePiece.speedX=0;
    }
});
var life=3;
var myGamePiece;
var myObstacles = [];

function startGame() {
    myGamePiece = new component(80, 60, "red", 35, 130,false);
    xran=Math.floor(Math.random()*200)+100;
    yran=Math.floor(Math.random()*300)+100;
    myGameArea.start();
    spikeArea.start();
}
function time_int_spawn(){
    my_spawn= new component(10,10,"red",xran,yran);
}
var spikeArea={
	canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 600;
        this.canvas.height = 50;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        ceiling();
    }
}
function ceiling(){
    ctx = spikeArea.context;
    var j=1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    for(let i=1;i<17;i++){
        ctx.fillStyle="red";
        ctx.lineTo(22*j,50);
        ctx.lineTo(44*i,0);
        ctx.fill();
        j+=2;
    }
}
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[1]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 12);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y,bool) {
	this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    var score=0;
    this.addSpawn=function(){
        ctx= myGameArea.context;
        ctx.font = "30px Georgia";
        ctx.fillText("❤️",this.x,this.y);
    }
    if(bool==true){   
        this.update = function() {
          ctx = myGameArea.context;
          ctx.fillStyle = color;
          ctx.fillRect(this.x, this.y, this.width, this.height);
    	}	
    }
    else{
    	this.update = function() {
          ctx = myGameArea.context;
          ctx.fillStyle = "blue";
          ctx.beginPath();
          ctx.arc(this.x,this.y,20,0, 2 * Math.PI);
          ctx.fill();
    	}
    }
    this.clear = function(){
        this.y=-10;
        this.x=0;
    }
    this.newPos = function() {
        if(!(this.x + this.speedX < 18 || this.x + this.speedX > 580)){
            this.x += this.speedX;
        }
        this.y += this.speedY + 1;
        score+=1;
        document.getElementById("score").innerHTML=`Your Score:${Math.floor(score/10)}`;        
    }    
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + 20;
        var mytop = this.y;
        var mybottom = this.y + 20;
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}
function disp_lives(){
    if(life==3){
        document.getElementById('lives').innerText="Lives: ❤️❤️❤️";
    }
    else if(life==2){
        p="Lives: ❤️❤️"
        document.getElementById('lives').innerText=p;
        
    }
    else if(life==1){
        p="Lives: ❤️";
        document.getElementById('lives').innerText=p;
        
    }
    else{
        document.getElementById('lives').innerText="Game Over";
        myGameArea.stop();
    }
}
function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGamePiece.y=myObstacles[i].y-22;
            return true;
        } 
        
        if(myGamePiece.y-20<=0 || myGamePiece.y+22>=600){
            life-=1;
            setTimeout(time_int_spawn,5000);
            disp_lives();
            myGamePiece.y = 55;
            myGamePiece.newPos();
        }
        if(myGamePiece.x==600){
            myGamePiece.speedX=0;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(200)) {
        x = myGameArea.canvas.height;
        minWidth = 20;
        maxWidth = 200;
        height = Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth);
        x_rand=Math.floor(Math.random()*150);
        y_rand=Math.floor(Math.random()*300)+300;
        y_rand1=Math.floor(Math.random()*300)+250;
        x_rand1=Math.floor(Math.random()*200)+250;
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(150,10, "green", x_rand, 300,true));
        myObstacles.push(new component(150,10, "green", x_rand1,y_rand1,true)); 
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].y -=1;
        myObstacles[i].update();
    }
    myGamePiece.newPos();    
    myGamePiece.update();
    my_spawn.addSpawn();
    if((my_spawn.y+10>=myGamePiece.y && my_spawn.y-10<=myGamePiece.y) && (my_spawn.x+10>=myGamePiece.x && my_spawn.x-10<=myGamePiece.x)){
        if(life<3){
            my_spawn.clear();
            life+=1;
            disp_lives();
        }  
    }
    return false;
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function moveup(){
	myGamePiece.speedY = -3; 
}

function movedown() {
    myGamePiece.speedY = 3; 
}

function moveleft() {
    myGamePiece.speedX = -3; 
}

function moveright() {
    myGamePiece.speedX = 3; 
}

function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}
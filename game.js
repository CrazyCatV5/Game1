var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height/2;
var dx = 2;
var dy = -2;
var shipH = 904/30;
var shipW = 862/30;
var shipX = 20;
var shipY = y;
var UP=false;
var DOWN=false;
var LEFT=false;
var RIGHT=false;
var time = 0;
document.addEventListener("keydown",keyDownHandler, false);
document.addEventListener("keyup",keyUpHandler, false);
class Player {
    constructor(a, b){
        this.lives = 3;
    }
    get live(){
        return this.lives;
    }
    damag(){
        this.lives-=1;
    }
}
class Obstacle {}
class Enemy {}
class Bullet {}
var met = new Image(); 
met.src = 'images/kisspng-asteroid-sprite-clip-art-5afc5b72af87c6.282203891526487922719.png';
var ship = new Image(); 
ship.src = 'images/alienshiptex.png';
var shipDamag = new Image(); 
shipDamag.src = 'images/alienshiptex (2).png';
var Gamer = new Player();

function keyDownHandler(e){
    if(e.keyCode == 38){
        UP = true;
    }
    else if(e.keyCode == 40){
        DOWN = true;
    }
    else if(e.keyCode == 37){
        LEFT = true;
    }
    else if(e.keyCode == 39){
        RIGHT = true;
    }
}
function keyUpHandler(e){
    if(e.keyCode == 38){
        UP = false;
    }
    else if(e.keyCode == 40){
        DOWN = false;
    }
    else if(e.keyCode == 37){
        LEFT = false;
    }
    else if(e.keyCode == 39){
        RIGHT = false;
    }
}
function drawLives(){
    ctx.beginPath();
    var health = toString(3)
    var lives = Gamer.live.toString().concat(" ", "lives");
    ctx.font='10px sans-serif';
    ctx.fillStyle='#f24343';
    ctx.strokeStyle='#FFF';
    ctx.fillText(lives, 10 , 10, 80);
    ctx.strokeText(lives, 10 , 10, 80);
    ctx.closePath();
}
function drawBall() {
    ctx.beginPath();
    ctx.drawImage(met, x, y, 768/60, 829/60)
    ctx.closePath();
    x += dx;
    y += dy;
}
function drawShip() {
    ctx.beginPath();
    if (time > 50){
        ctx.drawImage(ship, shipX, shipY, shipH, shipW);
    }
    else{
        ctx.drawImage(shipDamag, shipX, shipY, shipH, shipW);
    }
    ctx.closePath();
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawShip();
    drawLives();
    if (x+dx < 0 || x+dx > canvas.width-15){
        dx = -dx;
    }
    if (y+dy < 0||y+dy>canvas.height-15){
        dy=-dy
    }
    
    if(UP && shipY >0){
        shipY -= 5;
    }
    if(DOWN && shipY < canvas.height - shipH){
        shipY += 5;
    }
    if(RIGHT && shipX <canvas.width - shipW*2){
        shipX += 5;
    }
    if(LEFT && shipX > 0){
        shipX -= 5;
    }
    if (shipX < x + 768/60  && shipX + shipW  > x &&
		shipY < y + 829/60 && shipY + shipH > y && time > 50) {
        Gamer.damag();
        dx = -dx;
        dy = -dy;
        time = 0;
    }
    time+=1;
}

setInterval(draw, 30);
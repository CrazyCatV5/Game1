var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - window.innerHeight/75;
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height/2;
var dx = 10;
var dy = -10;
var shipH = 788/5;
var shipW = 818/5;
var shipX = 20;
var shipY = y;
var UP=false;
var DOWN=false;
var LEFT=false;
var RIGHT=false;
var SPACE=false;
var MOUSEDOWN=false;
var time = 0;
var bullets = [];
var menu = true;
var control = 0;
var shipSpeed = 20;
var clickX = 0;
var clickY = 0;
var BulletSpeed = 20;
var laserW = 499/5;
var laserH = 125/5;
var reload = 0;
document.addEventListener("keydown",keyDownHandler, false);
document.addEventListener("keyup",keyUpHandler, false);
document.addEventListener("mousedown", mouseDown, false);
document.addEventListener("mouseup", mouseUp, false);
document.addEventListener("mousemove", mousemove, false);
var laser = new Image(); 
laser.src = 'images/laser.png';
class Player {
    constructor(a, b){
        this.lives = 3;
    }
    get live(){
        return this.lives;
    }
    reset(){
        this.lives = 3;
    }
    damag(){
        this.lives-=1;
    }
}
class Obstacle {}
class Enemy {}
class Bullet {
    constructor(x, y, z){
        this.px = x;
        this.py = y;
        this.way = z;
    }
    draw(){
        ctx.beginPath();
        ctx.drawImage(laser, this.px, this.py, laserW, laserH);
        ctx.closePath();
        this.px += BulletSpeed;
    }
}
var met = new Image(); 
met.src = 'images/oster.png';
var menus = new Image(); 
menus.src = 'images/Sss.webp';
var touch = new Image(); 
touch.src = 'images/touch.png';
var keyboard = new Image(); 
keyboard.src = 'images/Keyboard.png';
var ship = new Image(); 
ship.src = 'images/alienshiptex.png';
var shipDamag = new Image(); 
shipDamag.src = 'images/alienshiptex (2).png';
var Gamer = new Player();
function mouseDown(e){
    MOUSEDOWN = true;
}
function mouseUp(e){
    MOUSEDOWN = false;
}
function mousemove(e){
    clickX = e.clientX;
    clickY = e.clientY;
}
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
    else if(e.keyCode == 32){
        SPACE = true;
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
    else if(e.keyCode == 32){
        SPACE = false;
    }
}
function drawLives(){
    ctx.beginPath();
    var health = toString(3)
    var lives = Gamer.live.toString().concat(" ", "lives");
    ctx.font='100px sans-serif';
    ctx.fillStyle='#f24343';
    ctx.strokeStyle='#FFF';
    ctx.fillText(lives, 100 , 100, 800);
    ctx.strokeText(lives, 100 , 100, 800);
    ctx.closePath();
}
function drawBall() {
    ctx.beginPath();
    ctx.drawImage(met, x, y, 768/10, 829/10)
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
function drawMenu(){
    ctx.beginPath();
    ctx.drawImage(menus, 0, 0, canvas.width, canvas.height);
    ctx.closePath();
    ctx.beginPath();
    ctx.imageSmoothingEnabled = false;
    ctx.font='100px sans-serif';
    ctx.fillStyle='#00ff60';
    ctx.strokeStyle='#000';
    ctx.fillText("Menu", canvas.width/2 - canvas.width/20 , 100, 800);
    ctx.strokeText("Menu", canvas.width/2 - canvas.width/20 , 100, 800);
    ctx.closePath();
    ctx.beginPath();
    ctx.drawImage(touch, canvas.width/2 - canvas.width/4, canvas.height/2 - canvas.height/10, canvas.width/2 - canvas.width/3, canvas.height/2 - canvas.height/3);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(canvas.width/2 - canvas.width/4, canvas.height/2 - canvas.height/10, canvas.width/2 - canvas.width/3, canvas.height/2 - canvas.height/3);
    ctx.drawImage(keyboard, canvas.width/2+canvas.width/10, canvas.height/2 - canvas.height/10, canvas.width/2- canvas.width/4, canvas.height/2 - canvas.height/3);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(canvas.width/2+canvas.width/10, canvas.height/2 - canvas.height/10, canvas.width/2 - canvas.width/4, canvas.height/2 - canvas.height/3);
    ctx.closePath();
    if(MOUSEDOWN && clickX>canvas.width/2+canvas.width/10 && clickX < canvas.width/2 + canvas.width/3
        && clickY > canvas.height/2 - canvas.height/10 && clickY < canvas.height/2 + canvas.height/10){
            menu = false;
            control = 1;
    }
    if(MOUSEDOWN && clickX>canvas.width/2 - canvas.width/4 && clickX < canvas.width/2 - canvas.width/10
        && clickY > canvas.height/2 - canvas.height/10 && clickY < canvas.height/2 + canvas.height/10){
            menu = false;
            control = 0;
    }
}
function draw() {
    if (menu == false){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawShip();
        drawLives();
        bullets.forEach(Bullet => {Bullet.draw()});
        if (x+dx < 0 || x+dx > canvas.width-80){
            dx = -dx;
        }
        if (y+dy < 0||y+dy>canvas.height-80){
            dy=-dy
        }
        if(control == 1){
            if(UP && shipY >0){
                shipY -= shipSpeed;
            }
            if(DOWN && shipY < canvas.height - shipH-20){
                shipY += shipSpeed;
            }
            if(RIGHT && shipX <canvas.width - shipW-20){
                shipX += shipSpeed;
            }
            if(LEFT && shipX > 0){
                shipX -= shipSpeed;
            }
            if (shipX < x + 768/60  && shipX + shipW  > x 
                && shipY < y + 829/60 && shipY + shipH > y && time > 50) {
                Gamer.damag();
                dx = -dx;
                dy = -dy;
                time = 0;
            }
            if(SPACE && reload>10){
                bullets.push(new Bullet(shipX + shipW, shipY + shipH/2, 1))
                reload = 0;
            }
            reload+=1;
        }
        else {
            if (MOUSEDOWN){
                if(clickY>0 && clickY < canvas.height - shipH-20){
                    shipY = clickY - shipH/2;
                }
                if(clickX>0 && clickX < canvas.width - shipW-20){
                    shipX = clickX - shipW/2;
                }
            }
            if (shipX < x + 768/60  && shipX + shipW  > x
                && shipY < y + 829/60 && shipY + shipH > y && time > 50) {
                Gamer.damag();
                dx = -dx;
                dy = -dy;
                time = 0;
            }
            if(reload>10){
                bullets.push(new Bullet(shipX + shipW, shipY + shipH/2, 1))
                reload = 0;
            }
            reload+=1;
        }
        time+=1;
    }
    if(menu == true){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMenu();
    }
    if (Gamer.live == 0){
        menu = true;
        Gamer.reset();
        shipH = 788/5;
        shipW = 818/5;
        shipX = 20;
        shipY = canvas.height/2;
    }
}

setInterval(draw, 30);
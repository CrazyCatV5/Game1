var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - window.innerHeight/40;
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height/2;
var dx = 10;
var dy = -10;
var shipH = 788/(1/canvas.height*4000);
var shipW = 818/(1/canvas.width*8000);
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
var ebulets = [];
var obstacles = [];
var bosses = [];
var menu = true;
var control = 0;
var shipSpeed = 20;
var clickX = 0;
var clickY = 0;
var BulletSpeed = 20;
var laserW = 499/(1/canvas.width*8000);;
var laserH = 125/(1/canvas.height*4000);;
var reload = 0;
var warspeed = 10;
var bossspeed = 1;
var BossW = 900/(1/canvas.height*800);;
var BossH = 700/(1/canvas.height*1000);;
var BossTime=0;
var score = 0;
var bestscore = 0; 
var restart = false;
var finalscore = 0;
document.addEventListener("keydown",keyDownHandler, false);
document.addEventListener("keyup",keyUpHandler, false);
document.addEventListener("mousedown", mouseDown, false);
document.addEventListener("mouseup", mouseUp, false);
document.addEventListener("mousemove", mousemove, false);
document.addEventListener("touchstart", touchS, false);
document.addEventListener("touchmove", touchM, false);
document.addEventListener("touchcancel", touchF, false);
var back = new Image(); 
back.src = 'images/mlechnyy-put-kosmos-zvezdy-3734.jpg';
var elaser = new Image(); 
elaser.src = 'images/elaser.png';
var BossIm = new Image(); 
BossIm.src = 'images/starshippixelart.png';
var laser = new Image(); 
laser.src = 'images/laser.png';
var war = new Image(); 
war.src = 'images/klipartz.com-1.png';
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
class Obstacle {
    constructor(x,y,dx,dy){
        this.x = x;
        this.y = y;
        this.dx =dx;
        this.dy = dy;
    }
    draw(){
        ctx.beginPath();
        ctx.drawImage(met, this.x, this.y, 768/(1/canvas.width*16000), 829/(1/canvas.height*8000));
        ctx.closePath();
        this.x += this.dx;
        this.y += this.dy;
        if (this.y+this.dy < 0||this.y+this.dy>canvas.height-80){
            this.dy=-this.dy;
        }
    }
    damag(){
        if (shipX < this.x + 768/10  && shipX + shipW  > this.x
            && shipY < this.y + 829/10 && shipY + shipH > this.y && time > 50){
                return true;
            }
        return false;
    }
}
class Enemy {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    draw(){
        ctx.beginPath();
        ctx.drawImage(war, this.x, this.y, 646/(1/canvas.width*8000), 560/(1/canvas.height*4000));
        ctx.closePath();
        this.x -= warspeed;
    }
    damag(){
        if (shipX < this.x + 646/10  && shipX + shipW  > this.x
            && shipY < this.y + 560/10 && shipY + shipH > this.y && time > 50){
                return true;
            }
        return false;
    }
}
class Boss {
    constructor(){
        this.x = canvas.width;
        this.y = canvas.height/5;
        this.healthes = 100;
    }
    draw(){
        ctx.beginPath();
        ctx.drawImage(BossIm, this.x, this.y, BossW, BossH);
        ctx.closePath();
        if (this.x>canvas.width-canvas.width/5){
            this.x -= bossspeed;
        }
        ctx.beginPath();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.strokeRect(canvas.width/2 - canvas.width/4, canvas.height/25, canvas.width/2 + canvas.width/100, canvas.height/25 + canvas.height/320);
        ctx.closePath();
        ctx.beginPath();
        ctx.fillRect(canvas.width/2 - canvas.width/4, canvas.height/25, canvas.width/2 + canvas.width/100 - (100-this.healthes)*(canvas.width/2 + canvas.width/100)/100, canvas.height/25 + canvas.height/320,"red");
        ctx.closePath();
    }
    damag(){
        if (shipX < this.x + BossW  && shipX + shipW  > this.x
            && shipY < this.y + BossH && shipY + shipH > this.y && time > 50){
                return true;
            }
        return false;
    }
    getdamag(){
        this.healthes -=1;
    }
    get healthget(){
        return this.healthes;
    }
    get Xget(){
        return this.x;
    }
}
class eBullet{
    constructor(x, y, z){
        this.px = x;
        this.py = y;
        this.way = z;
    }
    draw(){
        ctx.beginPath();
        ctx.drawImage(elaser, this.px, this.py, laserW, laserH);
        ctx.closePath();
        this.px -= BulletSpeed;
    }
    damag(){
        if (shipX < this.px + laserW  && shipX + shipW  > this.px
            && shipY < this.py + laserH && shipY + shipH > this.py && time > 50){
                return true;
            }
        return false;
    }
}
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
function touchS(e){
    MOUSEDOWN = true;
}
function touchF(e){
    MOUSEDOWN = false;
}
function touchM(e){
    clickX = e.targetTouches[0].pageX;
    clickY = e.targetTouches[0].pageY;
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
function drawBack(){
    ctx.beginPath();
    ctx.drawImage(back, 0, 0, canvas.width, canvas.height);
    ctx.closePath();
}
function drawScore(){
    ctx.beginPath();
    var health = score.toString()
    ctx.font='100px sans-serif';
    ctx.fillStyle='#f24343';
    ctx.strokeStyle='#FFF';
    ctx.fillText(health, canvas.width*0.9, canvas.height/8, canvas.width/15);
    ctx.strokeText(health, canvas.width*0.9, canvas.height/8, canvas.width/15);
    ctx.closePath();
}
function drawLives(){
    var lives = Gamer.live.toString().concat(" ", "lives");
    ctx.font='100px sans-serif';
    ctx.fillStyle='#f24343';
    ctx.strokeStyle='#FFF';
    ctx.fillText(lives, canvas.width*0.05, canvas.height/8, canvas.width/15);
    ctx.strokeText(lives, canvas.width*0.05, canvas.height/8, canvas.width/15);
    ctx.closePath();
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
    score = 0;
    ctx.beginPath();
    ctx.drawImage(menus, 0, 0, canvas.width, canvas.height);
    ctx.closePath();
    ctx.beginPath();
    ctx.font='100px sans-serif';
    ctx.fillStyle='#00ff60';
    ctx.strokeStyle='#000';
    ctx.fillText("Menu", canvas.width/2 - canvas.width/20 , 100, canvas.width/10);
    ctx.strokeText("Menu", canvas.width/2 - canvas.width/20 , 100, canvas.width/10);
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
    ctx.beginPath();
    ctx.font='100px sans-serif';
    ctx.fillStyle='#00ff60';
    ctx.strokeStyle='#000';
    ctx.fillText("Best score " + bestscore.toString(), canvas.width/2-canvas.width/7 , canvas.height/2+canvas.height/3, canvas.width/4);
    ctx.strokeText("Best score " + bestscore.toString(), canvas.width/2-canvas.width/7, canvas.height/2+canvas.height/3, canvas.width/4);
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
function drawRestart(){
    ctx.beginPath();
    ctx.drawImage(menus, 0, 0, canvas.width, canvas.height);
    ctx.closePath();
    ctx.beginPath();
    ctx.font='100px sans-serif';
    ctx.fillStyle='#00ff60';
    ctx.strokeStyle='#000';
    ctx.fillText("Restart", canvas.width/2-canvas.width/10 , canvas.height/2, canvas.width/5);
    ctx.strokeText("Restart", canvas.width/2-canvas.width/10, canvas.height/2, canvas.width/5);
    ctx.closePath();
    ctx.beginPath();
    ctx.font='100px sans-serif';
    ctx.fillStyle='#00ff60';
    ctx.strokeStyle='#000';
    ctx.fillText("Your score " + finalscore.toString(), canvas.width/2-canvas.width/7 , canvas.height*0.7, canvas.width/4);
    ctx.strokeText("Your score " + finalscore.toString(), canvas.width/2-canvas.width/7, canvas.height*0.7, canvas.width/4);
    ctx.closePath();
    ctx.beginPath();
    ctx.font='100px sans-serif';
    ctx.fillStyle='#00ff60';
    ctx.strokeStyle='#000';
    ctx.fillText("Best score " + bestscore.toString(), canvas.width/2-canvas.width/7 , canvas.height*0.9, canvas.width/4);
    ctx.strokeText("Best score " + bestscore.toString(), canvas.width/2-canvas.width/7, canvas.height*0.9, canvas.width/4);
    ctx.closePath();
    if(MOUSEDOWN && clickX>canvas.width/2-canvas.width/10 && clickX < canvas.width/2 + canvas.width/3
        && clickY > canvas.height/2 - canvas.height/10 && clickY < canvas.height/2 + canvas.height/10){
            restart = false;
            menu = true;
            control = 1;
    }
}
var music = 0;
function draw() {
    if (menu == false && restart == false){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBack();
        drawShip();
        drawLives();
        drawScore();
        if(BossTime==1000){
            bosses.push(new Boss());
        }
        bosses.forEach((Boss, index) => {
            Boss.draw();
            if(BossTime%30 == 0){
                ebulets.push(new eBullet(Boss.Xget, Math.floor(Math.random() * canvas.height/4)+canvas.height/3, 1))
            }
            if(Boss.healthget == 0){
                bosses.splice(index,1); 
                BossTime = 0;
                score += 1000;
            }   
        });
        BossTime+=1;
        bullets.forEach((Bullet, index) => {
            Bullet.draw()
            obstacles.forEach((Obstacle, indexO) =>{
                if (Bullet.px < Obstacle.x + 768/10  && Bullet.px + laserW  > Obstacle.x
                    && Bullet.py/1.2 < Obstacle.y + 829/60 && Bullet.py + laserH > Obstacle.y){
                        obstacles.splice(indexO,1);
                        bullets.splice(index, 1);
                        score += 10;
                    }
            })
            bosses.forEach((Boss, indexO) =>{
                if (Bullet.px < Boss.x + BossW  && Bullet.px + laserW  > Boss.x
                    && Bullet.py/1.2 < Boss.y + BossH && Bullet.py + laserH > Boss.y){
                        Boss.getdamag();
                        bullets.splice(index, 1);
                    }
            })
        });
        ebulets.forEach((eBullet, index) => {
            eBullet.draw()
            if (eBullet.damag()){
                Gamer.damag();
                ebulets.splice(index,1);
                time = 0;
            }
        });
        obstacles.forEach((Obstacle, index) => {
            if(Obstacle.damag()){
                Gamer.damag();
                obstacles.splice(index,1);
                time = 0;
            }
        });
        bosses.forEach((Boss, index) => {
            if(Boss.damag()){
                Gamer.damag();
                time = 0;
            }
        });
        obstacles.forEach(Obstacle => {Obstacle.draw()});
        if(Math.floor(Math.random() * 1000)<15){
            obstacles.push(new Obstacle( canvas.width, Math.floor(Math.random() * canvas.height/3)+canvas.height/4, -(Math.floor(Math.random() * 30)), (Math.floor(Math.random() * 3)-2)*10))
        }
        if(Math.floor(Math.random() * 1000)<15){
            obstacles.push(new Enemy( canvas.width, Math.floor(Math.random() * canvas.height/3)+canvas.height/4));
        }
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
            if(DOWN && shipY < canvas.height - shipH){
                shipY += shipSpeed;
            }
            if(RIGHT && shipX <canvas.width - shipW){
                shipX += shipSpeed;
            }
            if(LEFT && shipX > 0){
                shipX -= shipSpeed;
            }
            if(SPACE && reload>10){
                bullets.push(new Bullet(shipX + shipW, shipY + shipH/2, 1))
                reload = 0;
            }
            reload+=1;
        }
        else {
            if (MOUSEDOWN){
                if(clickY>0 +shipH/2&& clickY < canvas.height - shipH/2){
                    shipY = clickY - shipH/2;
                }
                if(clickX>0+shipH/2 && clickX < canvas.width - shipW/2){
                    shipX = clickX - shipW/2;
                }
            }
            if(reload>10){
                bullets.push(new Bullet(shipX + shipW, shipY + shipH/2, 1))
                reload = 0;
            }
            reload+=1;
        }
        time+=1;
        if(BossTime%10 == 0){
            score += 1
        }
    }
    if(menu){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMenu();
    }
    if(restart){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRestart();
    }
    if (Gamer.live <= 0){
        obstacles.splice(0,obstacles.length);
        bosses.splice(0,bosses.length);
        restart = true;
        Gamer.reset();
        shipH = 788/(1/canvas.height*4000);
        shipW = 818/(1/canvas.width*8000);
        shipX = 20;
        shipY = canvas.height/2;
        BossTime = 0;
        finalscore = score;
        if (finalscore>bestscore){
            bestscore = finalscore;
        }
        time = 0;
    }
}
setInterval(draw, 30);
var canvas, canvasContext;

var time = 1000;

var game = setInterval(mainLoop, time / 62);

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

    game;
}


//Player
var playerLives = 0;
var pXpos = 300;
var pYpos = 660;
var pXspeed = 5;
var pYspeed = 3;
const P_SIZE = 50;
var pSrc = new Image();
pSrc.src = 'spaceship.png';



//enemy
// var enemyXpos = 40;
// var enemyYpos = 0;
// const enemy_SIZE = 20;
// var enemyXspeed = 5;
// var enemyYspeed = 5;


var leftKeyPressed = false;
var rightKeyPressed = false;
var spaceKeyPressed = false;


const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const SPACE_KEY = 32;

var player = new Player(pSrc, pXpos, pYpos, P_SIZE, P_SIZE, pXspeed, pYspeed);

var bullets = [];

var enemies = [];

var walls = [];

var enemyBullets = [];



var setUp = true;
var totalEnemies = 10;
var hitting = false;


var wSetUp = true;
var totalWalls = 40;
var wHitting = false;

// var ship = new Image();
// ship.src = 'gun.png'
// cheemsX = pXpos - 12;
// cheemsY = 560;
// cheemsXs = 5;
// cheemsYs = 5;

var score = 0;

var canvasBackGround = new Image();
canvasBackGround.src = 'space.jpg';


function mainLoop() {
    drawImg(canvasBackGround, 0, 0, canvas.width, canvas.height);
    // var cheems = drawImg(ship, cheemsX, cheemsY, 50, 50);


    if (setUp == true) {
        for (i = 0; i < totalEnemies; i++) {
            makeEnemy();
        }
        setUp = false;
    }

    if (wSetUp == true) {
        for (i = 0; i < totalWalls; i++) {
            makeWall();
        }
        wSetUp = false;
    }

    // cheemsMove();

    player.draw();
    player.move();

    if (walls.length > 0) {
        walls.forEach(function(wall, i) {
            wall.draw();
        })
    }

    if (enemyBullets.length > 0) {
        enemyBullets.forEach(function(enemyBullet, i) {
            enemyBullet.draw();
            enemyBullet.move();



            if (enemyBullet.outOfBounds2()) {
              delete  enemyBullets[i];
            }
            if (enemyBullet.hasCollidedPlayer()) {
              playerLives += 1;
              console.log('playerLives' + playerLives);

              if (playerLives === 3) {
                   console.log('dead');
                   canvasContext.font = "30px Comic Sans MS";
                   canvasContext.fillStyle = "#3AE5F0";
                   canvasContext.fillText("Game Over", 300, 50);
                   clearInterval(game);
              }

              time = 0;
              delete enemyBullets[i];
            }
            if (enemyBullet.hasCollidedWall2()) {
              delete  enemyBullets[i];
            }
        });
        enemyBullets = enemyBullets.filter(item => item !== undefined);
    }

    if (bullets.length > 0) {
        bullets.forEach(function(bullet, i) {
            bullet.draw();
            bullet.move();


            if (bullet.outOfBounds()) {
                delete bullets[i];
            }
            if (bullet.hasCollided()) {
                delete bullets[i];
                score++;
                console.log(score);
            }
            if (bullet.hasCollidedWall()) {
                delete bullets[i];

            }
        });
        bullets = bullets.filter(item => item !== undefined);
    }

    if (enemies.length > 0) {
        hitting = enemies.some(enemy => enemy.hitWall());

        enemies.forEach(function(enemy, i) {
            enemy.draw();
            if (hitting) {
                enemy.specialMove();
            } else {
                enemy.normalMove();
            }
        });
    }
    if (bullets.length > 0) {
        bullets.forEach(function(bullet, i) {
            bullet.draw();
            bullet.move();

            if (bullets.length > 3) {
                delete bullets[i];
            }
        });
        bullets = bullets.filter(item => item !== undefined);
    }

    canvasContext.font = "30px Comic Sans MS";
    canvasContext.fillStyle = "#3AE5F0";
    canvasContext.fillText("Jouw   score is: " + score, 10, 50);


}

// if (playerLives === 0) {
//    time = 0;
   // canvasContext.font = "30px Comic Sans MS";
   // canvasContext.fillStyle = "red";
   // canvasContext.fillText("Game Over", 300, 50);
// }

function keyPressed(evt) {
    if (evt.keyCode == LEFT_KEY) {
        leftKeyPressed = true;
    }
    if (evt.keyCode == RIGHT_KEY) {
        rightKeyPressed = true;
    }
    if (evt.keyCode == SPACE_KEY) {
        makeBullet();
    }
}


function keyReleased(evt) {
    if (evt.keyCode == LEFT_KEY) {
        leftKeyPressed = false;
    }
    if (evt.keyCode == RIGHT_KEY) {
        rightKeyPressed = false;
    }
}

// function cheemsMove() {
//     if (leftKeyPressed) {
//         cheemsX -= cheemsXs;
//     }
//
//     if (rightKeyPressed) {
//         cheemsX += cheemsXs;
//     }
//     if (cheemsX <= 0) {
//         cheemsX += cheemsXs;
//     }
//     if (cheemsX >= canvas.width) {
//         cheemsX -= cheemsXs;
//     }
//
// }


function makeBullet() {
    const BULLET_SIZE = 5;
    var bulletXpos = player.x + player.w / 2 - BULLET_SIZE / 2;
    var bulletYpos = player.y - BULLET_SIZE;
    var bulletYspeed = 5;

    var bullet = new Bullet(bulletXpos, bulletYpos, BULLET_SIZE, BULLET_SIZE, 'black', bulletYspeed);

    bullets.push(bullet);
}

var enemyCounter = 1;

function makeEnemy() {
    const ENEMY_SIZE = 20;
    const gap = 30;
    var enemyXpos = enemyCounter * ENEMY_SIZE + gap * enemyCounter;
    var enemyYpos = 210;
    var enemyYpos2 = 160;
    var enemyYpos3 = 110;
    var enemyYpos4 = 61;
    var enemyXspeed = 1;
    var enemyYspeed = 30;
    var enemySrc = new Image();
    enemySrc.src = 'enemy.png';
    var enemySrc2 = new Image();
    enemySrc2.src = 'enemy_2.png';

    enemyCounter++;

    var enemy = new Enemy(enemySrc, enemyXpos, enemyYpos, ENEMY_SIZE, ENEMY_SIZE, enemyXspeed, enemyYspeed);
    var enemy2 = new Enemy(enemySrc, enemyXpos, enemyYpos2, ENEMY_SIZE, ENEMY_SIZE, enemyXspeed, enemyYspeed);
    var enemy3 = new Enemy(enemySrc2, enemyXpos, enemyYpos3, ENEMY_SIZE, ENEMY_SIZE, enemyXspeed, enemyYspeed);
    var enemy4 = new Enemy(enemySrc2, enemyXpos, enemyYpos4, ENEMY_SIZE, ENEMY_SIZE, enemyXspeed, enemyYspeed);



    enemies.push(enemy, enemy2, enemy3, enemy4);

    //enemy bullet time

    function makeEnemyBullet() {

        var yPos = [360, 310, 260, 211];
        var xPos = enemies.length * 30 * Math.random();

        var EnemyLocation = yPos[Math.floor(Math.random() * yPos.length)];

        const ENEMYBULLET_SIZE = 5;
        var enemyBulletXpos = xPos + enemy.w / 2 - ENEMYBULLET_SIZE / 2;
        var enemyBulletYpos = EnemyLocation - ENEMYBULLET_SIZE;
        var enemyBulletYspeed = 5;

        var enemyBullet = new EnemyBullet(enemyBulletXpos, enemyBulletYpos, ENEMYBULLET_SIZE, ENEMYBULLET_SIZE, 'white', enemyBulletYspeed);


        // enemyBullets.length = 7;
        enemyBullets.push(enemyBullet);

        console.log('shoot');
    }

    setInterval(makeEnemyBullet, 2000);


}



var wallCounter = 0;

//hallo

function makeWall() {
    const WALL_SIZE = 5;
    const wallGap = 10;
    var wallXpos = wallCounter * WALL_SIZE + wallGap * WALL_SIZE;
    var wallYpos = 550;
    var wallYpos2 = 555;
    var wallYpos3 = 560;
    var wallYpos4 = 565;
    var wallYpos5 = 570;
    var wallYpos6 = 575;
    var wallYpos7 = 580;
    var wallYpos8 = 585;

    var wallXpos2 = 350 + wallCounter * WALL_SIZE;

    wallCounter++;



    //linker wall
    var wall = new Wall(wallXpos, wallYpos, WALL_SIZE, WALL_SIZE, '#3AE5F0');
    var wall2 = new Wall(wallXpos, wallYpos2, WALL_SIZE, WALL_SIZE, '#3AE5F0');
    var wall3 = new Wall(wallXpos, wallYpos3, WALL_SIZE, WALL_SIZE, '#3AE5F0');
    var wall4 = new Wall(wallXpos, wallYpos4, WALL_SIZE, WALL_SIZE, '#3AE5F0');
    var wall5 = new Wall(wallXpos, wallYpos5, WALL_SIZE, WALL_SIZE, '#3AE5F0');
    var wall6 = new Wall(wallXpos, wallYpos6, WALL_SIZE, WALL_SIZE, '#3AE5F0');
    var wall7 = new Wall(wallXpos, wallYpos7, WALL_SIZE, WALL_SIZE, '#3AE5F0');
    var wall8 = new Wall(wallXpos, wallYpos8, WALL_SIZE, WALL_SIZE, '#3AE5F0');

    //rechter wall
    var wall9 = new Wall(wallXpos2, wallYpos, WALL_SIZE, WALL_SIZE, '#3AE5F0');
    var wall10 = new Wall(wallXpos2, wallYpos2, WALL_SIZE, WALL_SIZE, '#3AE5F0');
    var wall11 = new Wall(wallXpos2, wallYpos3, WALL_SIZE, WALL_SIZE, '#3AE5F0');
    var wall12 = new Wall(wallXpos2, wallYpos4, WALL_SIZE, WALL_SIZE, '#3AE5F0');
    var wall13 = new Wall(wallXpos2, wallYpos5, WALL_SIZE, WALL_SIZE, '#3AE5F0');
    var wall14 = new Wall(wallXpos2, wallYpos6, WALL_SIZE, WALL_SIZE, '#3AE5F0');
    var wall15 = new Wall(wallXpos2, wallYpos7, WALL_SIZE, WALL_SIZE, '#3AE5F0');
    var wall16 = new Wall(wallXpos2, wallYpos8, WALL_SIZE, WALL_SIZE, '#3AE5F0');



    walls.push(wall, wall2, wall3, wall4, wall5, wall6, wall7, wall8, wall9, wall10, wall11, wall12, wall13, wall14, wall15, wall16);


}



function drawImg(src, x, y, w, h) {
    canvasContext.drawImage(src, x, y, w, h);
}

function colorRect(x, y, w, h, c) {
    canvasContext.fillStyle = c;
    canvasContext.fillRect(x, y, w, h);
}

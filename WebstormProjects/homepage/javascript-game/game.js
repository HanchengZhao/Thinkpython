var context;
var queue;
var WIDTH = 1024;
var HEIGHT = 768;
var mouseXPosition;
var mouseYPosition;
var batImage;
var stage;
var animation;
var deathAnimation;
var spriteSheet;
var enemyXPos=100;
var enemyYPos=100;
var enemyXSpeed = 1.5;
var enemyYSpeed = 1.75;
var score = 0;
var scoreText;
var gameTimer;
var gameTime = 0;
var timerText;

//images https://i.ytimg.com/vi/AV48vINy134/maxresdefault.jpg
//
//sprite sheet :http://www.xojo3d.com/images/sprite1.png


window.onload = function()
{
    /*
     *      Set up the Canvas with Size and height
     *
     */
    var canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    context.canvas.width = WIDTH;
    context.canvas.height = HEIGHT;
    stage = new createjs.Stage("myCanvas");

    queue = new createjs.LoadQueue(false);
    queue.on("complete", queueLoaded, this);
    /*
     *      Create a load manifest for all assets
     *
     */
    queue.loadManifest([
        {id: 'backgroundImage', src: 'assets/sky.jpg'},
        {id: 'crossHair', src: 'assets/crosshair.png'},
        {id: 'birdSpritesheet', src: 'assets/bird.png'},
        {id: 'Explosion', src: 'assets/Explosion2.png'}
    ]);
    queue.load();

    /*
     *      Create a timer that updates once per second
     *
     */
    gameTimer = setInterval(updateTime, 1000);

}

function queueLoaded(event)
{
    // Add background image
    var backgroundImage = new createjs.Bitmap(queue.getResult("backgroundImage"));
    stage.addChild(backgroundImage);

    //Add Score
    scoreText = new createjs.Text("1UP: " + score.toString(), "36px Arial", "#FFF");
    scoreText.x = 10;
    scoreText.y = 10;
    stage.addChild(scoreText);

    //Ad Timer
    timerText = new createjs.Text("Time: " + gameTime.toString(), "36px Arial", "#FFF");
    timerText.x = 800;
    timerText.y = 10;
    stage.addChild(timerText);


    // Create bird spritesheet
    spriteSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('birdSpritesheet')],
        "frames": {"width": 92, "height": 64},
        "animations": { "flap": [0,2] }
    });

    // Create bat death spritesheet
    birdDeathSpriteSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('Explosion')],
        "frames": {"width": 96, "height" : 96},
        "animations": {"die": [0,19, false,1 ] }
    });

    // Create bat sprite
    createEnemy();

     ////Create crosshair
     //crossHair = new createjs.Bitmap(queue.getResult("crossHair"));
     //crossHair.x = WIDTH/2;
     //crossHair.y = HEIGHT/2;
     //stage.addChild(crossHair);


    // Add ticker
    createjs.Ticker.setFPS(15);
    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.addEventListener('tick', tickEvent);

    // Set up events AFTER the game is loaded
    // window.onmousemove = handleMouseMove;
    window.onmousedown = handleMouseDown;
}

function createEnemy()
{
    animation = new createjs.Sprite(spriteSheet, "flap");
    animation.regX = 99;
    animation.regY = 58;
    animation.x = enemyXPos;
    animation.y = enemyYPos;
    animation.gotoAndPlay("flap");
    stage.addChildAt(animation,1);
}

function birdDeath()
{
    deathAnimation = new createjs.Sprite(birdDeathSpriteSheet, "die");
    deathAnimation.regX = 99;
    deathAnimation.regY = 58;
    deathAnimation.x = enemyXPos;
    deathAnimation.y = enemyYPos;
    deathAnimation.gotoAndPlay("die");
    stage.addChild(deathAnimation);
}

function tickEvent()
{
    //Make sure enemy bat is within game boundaries and move enemy Bat
    if(enemyXPos < WIDTH && enemyXPos > 0)
    {
        enemyXPos += enemyXSpeed;
    } else
    {
        enemyXSpeed = enemyXSpeed * (-1);
        enemyXPos += enemyXSpeed;
    }
    if(enemyYPos < HEIGHT && enemyYPos > 0)
    {
        enemyYPos += enemyYSpeed;
    } else
    {
        enemyYSpeed = enemyYSpeed * (-1);
        enemyYPos += enemyYSpeed;
    }

    animation.x = enemyXPos;
    animation.y = enemyYPos;


}
//function handleMouseMove(event)
//{
//    //Offset the position by 45 pixels so mouse is in center of crosshair
//    crossHair.x = event.clientX-45;
//    crossHair.y = event.clientY-45;
//}

function handleMouseDown(event)
{

    //Display CrossHair
    crossHair = new createjs.Bitmap(queue.getResult("crossHair"));
    crossHair.x = event.clientX-45;
    crossHair.y = event.clientY-45;
    stage.addChild(crossHair);
    createjs.Tween.get(crossHair).to({alpha: 0},1000);


    //Increase speed of enemy slightly
    enemyXSpeed *= 1.05;
    enemyYSpeed *= 1.06;

    //Obtain Shot position
    var shotX = Math.round(event.clientX);
    var shotY = Math.round(event.clientY);
    var spriteX = Math.round(animation.x);
    var spriteY = Math.round(animation.y);

    // Compute the X and Y distance using absolte value
    var distX = Math.abs(shotX - spriteX);
    var distY = Math.abs(shotY - spriteY);

    // Anywhere in the body or head is a hit - but not the wings
    if(distX < 30 && distY < 64 )
    {
        //Hit
        stage.removeChild(animation);d
        birdDeath();
        score += 100;
        scoreText.text = "1UP: " + score.toString();

        //Make it harder next time
        enemyYSpeed *= 1.2;
        enemyXSpeed *= 1.2;

        //Create new enemy
        var timeToCreate = Math.floor((Math.random()*3500)+1);
        setTimeout(createEnemy,timeToCreate);

    } else
    {
        //Miss
        score -= 10;
        scoreText.text = "1UP: " + score.toString();

    }
}

function updateTime() {
    gameTime += 1;
    if (gameTime > 60) {
        //End Game and Clean up
        timerText.text = "GAME OVER";
        stage.removeChild(animation);
        stage.removeChild(crossHair);
        clearInterval(gameTimer);
    }
    else
    {
        timerText.text = "Time: " + gameTime;
        createjs.Sound.play("tick");
    }
}
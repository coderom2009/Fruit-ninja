//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

var knife,fruit,monster,fruitGroup,monsterGroup,score,r,randomFruit,position;
var knifeImage, fruit1, fruit2, fruit3, fruit4, monsterImage, gameOverImage;
var soundp, sounde;
function preload() {
knifeImage = loadImage("knife.png");
monsterImage = loadAnimation("alien1.png", "alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  soundp = loadSound("mixkit-impact-of-a-blow-2150.wav");
  sounde = loadSound("gameover.m4a");
  //load sound here
}

function setup() {
  createCanvas(600, 600);

  //creating sword
  knife = createSprite(40, 200, 20, 20);
  knife.addImage(knifeImage);
  knife.scale = 0.7;
  knife.setCollider("rectangle", 5, -20, 85, 100);
  //set collider for sword

  // Score variables and Groups
  score = 0;
  fruitGroup = createGroup();
  monsterGroup = createGroup();

  knife.debug = false;
}

function draw() {
  background("lightblue");

  if (gameState === PLAY) {
    //Call fruits and Monster function
    fruits();
    Monster();

    // Move sword with mouse
    knife.y = World.mouseY;
    knife.x = World.mouseX;

    // Increase score if sword touching fruit
    if (fruitGroup.isTouching(knife)) {
      fruitGroup.destroyEach();
      soundp.play();
      score = score + 1;
    } else {
      // Go to end state if sword touching enemy
      if (monsterGroup.isTouching(knife)) {
        gameState = END;

        //add gameover sound here

        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);

        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale = 2;
        knife.x = 300;
        knife.y = 300;
        sounde.play();
      }
    }
  }

  drawSprites();
  //Display score
  textSize(25);
  text("Score : " + score, 250, 50);
}

function Monster() {
  if (World.frameCount % 200 === 0) {
    monster = createSprite(400, 200, 20, 20);
    monster.addAnimation("moving", monsterImage);
    monster.x = Math.round(random(400, 500));
    monster.y = Math.round(random(100, 550));
    //update below give line of code for increase monsterGroup speed by 10
    var r = Math.round(random(1, -1));

    var num = Math.round(random(1, -1));
    switch (num) {
      case -2:
        monster.velocityXEach = 5 + score / 2;
        break;
      case -1:
        monster.velocityX = -5 - score / 2;
        break;
      case 0:
        monster.velocityX = -5 - score / 2;
        break;
      case 1:
        monster.velocityX = 5 + score / 2;
        break;
      case 2:
        monster.velocityX = -5 - score / 2;
        break;
      default:
        break;
    }

    monster.setLifetime = 100;

    monsterGroup.add(monster);
  }
}

function fruits() {
  if (World.frameCount % 80 === 0) {
    position = Math.round(random(1, 2, 3, 4));
    fruit = createSprite(400, 200, 20, 20);

    var f = Math.round(random(1, 2));
    switch (f) {
      case 2:
        fruit.velocityX = 5 + score / 2;
        break;
      case 1:
        fruit.velocityX = -5 - score / 2;
        break;
      default:
        break;
    }

    fruit.scale = 0.2;
    //fruit.debug=true;
    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }

    fruit.y = Math.round(random(50, 550));

    fruit.setLifetime = 100;

    fruitGroup.add(fruit);
  }
}

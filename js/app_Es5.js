"use strict";

// inserting Div tag to the page.
$('body').append('<div></div>');

//inserting h1 tag to the div.
$('div').prepend('<h1>classic arcade game clone</h1>');

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	
	this.x = x;//the enemy (x) position
	this.y = y;// the enemy (y) position
	this.speed = speed;// the speed of the enemy
	
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	
	this.x += this.speed * dt;
	
	if (this.x >= 400){
		this.x = 0;
	}
	this.x += this.speed;
	
	//checking for collisions between player and enemies.
	
	if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, speed){
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.sprite = 'images/char-horn-girl.png';

};

Player.prototype.update = function(){
	
	// Prevent player from getting crossed the end of the game screen.
	
	if (this.y > 380){
		this.y = 380;
	}
	
	if (this.x > 400){
		this.x = 400;
	}
	
	if (this.x < 0){
		this.x = 0;
	}
	
	// Check for player reaching top of canvas and winning the game.
	
	if (this.y < 0){
		this.x = 200;
		this.y = 380;
	}
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
	switch(key){
		case 'left':
			this.x -= this.speed + 50;
			break;
			
		case 'up' : 
			this.y -= this.speed + 30;
			break;
			
		case 'right' : 
			this.x += this.speed + 50;
			break;
			
		case 'down' : 
			this.y += this.speed + 30;
			break;
			  }
	
};

//  player's enemies based on the provided Enemy class
var firstEnemy = new Enemy(20, 150, 3);
var secondEnemy = new Enemy(20, 230, 6);
var thirdEnemy = new Enemy(20, 55, 4);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [firstEnemy,secondEnemy,thirdEnemy];
// Place the player object in a variable called player
var player = new Player(200, 380, 50);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

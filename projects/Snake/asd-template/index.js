/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 10;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects

  $("#Rematch").hide(); // This code makes the button to retry hidden  until the game is over


//  The function forthe snake game object values
function Factory (id, x, y, speedX, speedY) {
  var instance = {
    id: id,
    x: x,
    y: y,
    speedX: speedX,
    speedY: speedY,
    height: $(id).height(),
    width: $(id).width()
  };
  return instance;
};

  var snakeHead = Factory("#snake", 100, 100, 0, 0); // factory values for the snake's head
  var snakeBody = [snakeHead];  // the code that keeps the snake's body segments
  var apple = Factory("#apple", 100, 200, 0, 0); // factory values for  the apple
  var score = 0; // the code that keeps score

  var BOARD_WIDTH = $("#board").width(); // code that tracks board width
  var BOARD_HEIGHT = $("#board").height(); // code that tracks board height


  KEY = {  // key-value pairs for the movement of the snake
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40
  };
  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // calls newFrame every 60 Frames per second
  /*
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle
  */
  $(document).on('keydown', setSnakespeed); // calls setPlayerspeed() in response to keydown events
  /*
	$(document).on('keyup', stopSnakespeed);
  */

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    
    repositionSnake(snakeHead);
    redrawGameItem(snakeHead);
    appleEatDetect();
    redrawGameItem(apple);
    repositionBody();
    borderDetectSnake();
    snakeCollision();
    
  }
  

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function addSnakeSegment() { // code that adds a new segment to the snake when it eats an apple
    var newID = "snake" + snakeBody.length; // code that gives the new id of each snake segment


    $("<div>").addClass("snake").attr("id", newID).appendTo("#board"); // code that appends the new snake segment to the board


    var tail = snakeBody[snakeBody.length-1]; // array that keeps the snake at it's length when it ate an apple


    var newSegment = Factory("#" + newID, tail.x, tail.y, 0, 0); // code that calls the new segment
    /*
    redrawGameItem(newSegment);
    */

    snakeBody.push(newSegment); // pushes the new segment into the body
  }

  function repositionBody() { // repositions the body segments to follow with the head like in Snake
    for(var i = snakeBody.length-1;i >= 1;i--){
      snakeBody[i].x = snakeBody[i-1].x;
      snakeBody[i].y = snakeBody[i-1].y;

      redrawGameItem(snakeBody[i]);
    }
  }

  function endGame() { // code that tells you when the game is over and ask for a rematch
    clearInterval(interval);
		$(document).off();
		$("#Rematch").show(); // code for a button that you can click to play Snake again
		$("#Rematch").on("click", Rematch); // makes the button register clicks in order to play Snake again
  }

  // reloads the game by reloading the webpage
	function Rematch() { // simple function that just resets the page
		location.reload();
	}

  function repositionSnake(obj) { // The code that makes the snake move
    obj.x += obj.speedX;
    obj.y += obj.speedY;
    /*
    redrawGameItem(snakeHead);
    */
  }

  function redrawGameItem(obj) { // function used to redraw game items to make them consistently reappear to appear to move across the screen
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  }
  
  function generateApple() { // function that is called whenever apple is eaten, generates a new apple in a random place where the snake isn't there either
    apple.x = Math.floor(Math.random() * 25) * 20;
    apple.y = Math.floor(Math.random() * 25) * 20;
    
    for(var i = snakeBody.length-1;i >= 1;i--) { // checks if the newly appeared apple from the last one code didn't go on the snake
      if (snakeHead.y === apple.y && snakeHead.x === apple.x || snakeBody[i].y === apple.y && snakeBody[i].x === apple.x) {
        generateApple();
      }
    }
  }

  function appleEatDetect() { // detects when the apple is eaten with a simple collision check with the snake's head coordinates and the apple's coordinates
    if (snakeHead.y === apple.y && snakeHead.x === apple.x) {
      // make increase score and add a segment
      score += 1; // adds to the score with each apple eaten
      $('#score').text("Score:" + score); // updates the score on the screen as text
      generateApple(); // calls the generateApple function to make a new apple
      addSnakeSegment(); // calls the addSnakeSegment function to add segment to snake
    }
  }
  
  function borderDetectSnake() {  // simple border collision check to see if snake's head collides with the border, and if it does endGame is called to end the game
    if (snakeHead.y >= BOARD_HEIGHT - snakeHead.height + 20) {
      endGame(); 
    }
    if (snakeHead.y <= BOARD_HEIGHT - BOARD_HEIGHT - 20) {
      endGame(); 
    }
    if (snakeHead.x >= BOARD_WIDTH - snakeHead.width + 20) {
      endGame(); 
    }
    if (snakeHead.x <= BOARD_WIDTH - BOARD_WIDTH - 20) {
      endGame();
    }
  }

  function snakeCollision() { // function used to check if the snake collides with itself
    for(var i = snakeBody.length-1;i >= 2;i--) { // the loop goes through each segment of the snake's body starting after 2 segments already exist (head and the first body part because it, for some reason, spawns within the head and would immediately be registered as colliding) and checks to see if they collide with the head
      if ((snakeHead.y === snakeBody[i].y) && (snakeHead.x === snakeBody[i].x)) {
       endGame(); // game ends if the snake collides with itself
      }
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// KEYBOARD FUNCTIONS //////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function setSnakespeed(event) { // keyboard function used to make the snake move, there is another if under each event.which key check to ensure that the snake can only move if it isn't already moving in that coordinate (y or x). For example, this prevents it from turning back into itself if it were moving to the right, forcing it to move either up or down, just like the real Snake game
		if (event.which === KEY.UP) {
      if (snakeHead.speedY === 0) {
        snakeHead.speedY = -20; 
        snakeHead.speedX = 0;
      }
		}
		if (event.which === KEY.DOWN) {
      if (snakeHead.speedY === 0) {
        snakeHead.speedY = 20; 
        snakeHead.speedX = 0;
      }

		}
		if (event.which === KEY.LEFT) {
      if (snakeHead.speedX === 0) {
			snakeHead.speedX = -20; 
      snakeHead.speedY = 0;
      }
		}
		if (event.which === KEY.RIGHT) {
      if (snakeHead.speedX === 0) {
        snakeHead.speedX = 20; 
        snakeHead.speedY = 0;
      }
		}

	}

  
}

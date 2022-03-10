$(document).ready(function() {
	////////////////////////////////////////////////////////////////////////////////
	///////////////////////// INITIALIZATION ////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////

	// declaring framerate of game
	var FPS = 60;

	// variables that don't fit within the factory function
	var BOARD_WIDTH = $("#board").width();
	var BOARD_HEIGHT = $("#board").height();
	var paddle1Score = 0;
	var paddle2Score = 0;

	// Hiding play again button
	$("#Rematch").hide();

	// key for movement keys on paddle1 and paddle2
	KEY = {
		"UP": 38,
		"DOWN": 40,
  
		"W": 87,
		"S": 83,
	}

	// factory function in order to store many essential parts of the core moving game-objects like the id, x, y, speed of X, and speed of Y
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

	// declaration of factory function for paddle1 to define parameters
	var paddle1 = Factory("#paddle1", 30, 200, 0, 0);

	// declaration of factory function for paddle2 to define parameters
	var paddle2 = Factory("#paddle2", BOARD_WIDTH - 30, 200, 0, 0);
  
	// declaration of factory function for ball to define parameters
	var ball = Factory("#ball",BOARD_WIDTH/2, BOARD_HEIGHT/2, (Math.random() > 0.5 ? -3 : 3), (Math.random() > 0.5 ? -3 : 3));
 

	////////////////////////////////////////////////////////////////////////////////
	////////////////////////////// CORE LOGIC //////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////

	let interval = setInterval(newFrame, 1000 / FPS); // execute newFrame() 60 times per second

	$(document).on('keydown', setspeed); // execute setspeed() in response to keydown events
	$(document).on('keyup', stopspeed);  // execute stopspeed() in response to keydown events
  
	// used to constantly perform checks on functions that move game objects and detect game object interaction
	function newFrame() {
        repositionInstance(paddle1);
		repositionInstance(paddle2);
		repositionInstance(ball);
        redrawInstance(paddle1);
		redrawInstance(paddle2);
		redrawInstance(ball);
        borderStopInstance(paddle1);
		borderStopInstance(paddle2);
		ballCollidescore();
		ballBounce();
		hitPaddle();
        paddle1Score();
        paddle2Score();
	}

	////////////////////////////////////////////////////////////////////////////////
	////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////
	// repositions the game object coordinates on the screen as they move
    function repositionInstance(object) {
      	object.x += object.speedX;
		object.y += object.speedY;
    }

	// repeatedly redraws the game objects to convey motion
    function redrawInstance(object) {
        $(object.id).css("left", object.x);
		$(object.id).css("top", object.y);
    }
  
	// sees if the paddle are touching the top and bottom of the border
    function borderStopInstance(paddle) {
        if (paddle.y >= BOARD_HEIGHT - paddle.height) {
			paddle.y += -5; 
		}
		if (paddle.y <= BOARD_HEIGHT - BOARD_HEIGHT) {
			paddle.y += 5; 
		}
    }

	//makes sure that the ball bounces when it hits the top and bottom of the board
	function ballBounce() {
		if (ball.y >= BOARD_HEIGHT - ball.height) {
			ball.speedY = -ball.speedY; 
		}
		if (ball.y <= BOARD_HEIGHT - BOARD_HEIGHT) {
			ball.speedY = -ball.speedY; 
		}
	}

	// makes sure that when the ball hit a wall it score a point for the oposing side and re-centers the ball to be in the middle. This code also ends the game when the score is 11 for either side
	function ballCollidescore() {
		if (ball.x >= BOARD_WIDTH - ball.width) {
			   // paddle2 scores
			   paddleScore(paddle2);
			   resetBall();
			   
			   if (paddle2Score === 11) {
					endGame(paddle2);
			   }
			  
		   }
		   if (ball.x <= BOARD_WIDTH - BOARD_WIDTH) {
			   // paddle1 scores
			   paddleScore(paddle1);
			   resetBall();
			 
			   if (paddle1Score === 11) {
				   endGame(paddle1);
			   }
		   }
	}

	// used to detect the collision of game objects against one another
	function doCollide(obj1, obj2) {
		obj1.leftX = obj1.x;
		obj1.topY = obj1.y;
		obj1.rightX = obj1.leftX + $(obj1.id).width();
		obj1.bottomY = obj1.y + $(obj1.id).height();
		obj2.leftX = obj2.x;
		obj2.topY = obj2.y;
		obj2.rightX = obj2.leftX + $(obj2.id).width();
		obj2.bottomY = obj2.y + $(obj2.id).height();
		if ((obj1.rightX > obj2.leftX) && 
		    (obj1.leftX < obj2.rightX) &&
		    (obj1.bottomY > obj2.topY) &&
		    (obj1.topY < obj2.bottomY)) {
			
			return true;
		} else {
		
			return false;
		  
		}
	}

	//This code makes sure that when the ball hits a paddle it will go faster
	function hitPaddle() {
		if (doCollide(paddle1, ball)) {
			ball.speedX = -ball.speedX;
			ball.speedX -= 0.5;
		}
		if (doCollide(paddle2, ball)) {
			ball.speedX = -ball.speedX;
			ball.speedX += 0.5;
		}
	}

	//This makes the number of how many points a player has made be kept tracked
	function paddleScore(paddle) {
		if (paddle.id === paddle1.id) {
		paddle1Score += 1;
		$('#paddle1Score').text(paddle1Score);
		}
		else if (paddle.id === paddle2.id) {
		paddle2Score += 1;
		$('#paddle2Score').text(paddle2Score);
		
		}
	}

	// This re-centers the ball and starts it off at normal it's speed
	function resetBall() {
		ball.x = BOARD_WIDTH/2;
		ball.y = BOARD_HEIGHT/2;
		if (ball.speedX > 5) {
			ball.speedX = -5;
		}
		else if (ball.speedX < -5) {
			ball.speedX = 5;
		}
		else {
		ball.speedX = -5;
		}
		ball.speedY = -ball.speedY;
	}

	//This ends the games as well as congrats the winner and has a way to replay the game.
	function endGame(paddle) {
		if (paddle.id === paddle1.id) {
			clearInterval(interval);
			$(document).off();
			$('#paddleWinScreen').text("Gamer 1 Wins!");
			$("#Rematch").show();
			$("#Rematch").on("click", Rematch);
		}
		else if (paddle.id === paddle2.id) {
			clearInterval(interval);
			$(document).off();
			$('#paddleWinScreen').text("Gamer 2 Wins!");
			$("#Rematch").show();
			$("#Rematch").on("click", Rematch);
		}
	}

	// reloads the game
	function Rematch() {
		location.reload();
	}

	////////////////////////////////////////////////////////////////////////////////
	////////////////////////// KEYBOARD FUNCTIONS //////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////

	// makes the paddles move depending on which key is pressed
	function setspeed(event) {
		if (event.which === KEY.W) {
			paddle1.speedY = -5; 
		}
		if (event.which === KEY.S) {
			paddle1.speedY = 5; 
		}

		if (event.which === KEY.UP) {
			paddle2.speedY = -5; 
		}
		if (event.which === KEY.DOWN) {
			paddle2.speedY = 5; 
		}
	
	}

	// stops the paddles' movement after it has been pressed
	//might keep it out on purpose
	function stopspeed(event) {
		if (event.which === KEY.W || event.which === KEY.S) {
			paddle1.speedY = 0; 
		}

	

		if (event.which === KEY.UP || event.which === KEY.DOWN) {
			paddle2.speedY = 0; 
		}

	}
  

});
var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                { "type": "Spikes_in_Sonic_the_Hedgehog_4(1)", "x": 500, "y": groundY },
                { "type": "Spikes_in_Sonic_the_Hedgehog_4(1)", "x": 700, "y": groundY },
                { "type": "Spikes_in_Sonic_the_Hedgehog_4(1)", "x": 1000, "y": groundY },
            ]
        };
         /*for (var i = 0; i < levelData.gameItems.length; i++){
              var firstObj = levelData.gameItems[i];
              var firstX = firstObj.x;
              var firstY = firstObj.y;
              var firstType = firstObj.type;

              if (firstObj.type === "sawblade"){}
                   creatSawBlade(firstX, firstY);
                } else if (if)*/


        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        /* This is the function*/
        function createSawBlade (x, y){ var hitZoneSize = 25;
        var damageFromObstacle = 10;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        
        sawBladeHitZone.x = 435;
        sawBladeHitZone.y = 545;
       game.addGameItem(sawBladeHitZone);

       var obstacleImage = draw.bitmap('img/sawblade.png');
        sawBladeHitZone.addChild(obstacleImage);
        obstacleImage.x = -25;
        obstacleImage.y = -25;
    }
        createSawBlade(600, groundY - 110);
        createSawBlade(700, groundY - 110);
        createSawBlade(800, groundY - 110);

        for (var i = 0; i < levelData.gameItems.length; i++){
              var gameItemObject = levelData.gameItems[i];
              if (gameItemObject.type === 'sawblade'){
                  createSawBlade(gameItemObject.x, gameItemObject.y);
              } 
        if (gameItemObject.type === 'Spikes_in_Sonic_the_Hedgehog_4(1)'){
                  createSpikes(gameItemObject.x, gameItemObject.y);
              } 
            }
            /* spikes*/
            function createSpikes(x,y) { var hitZoneSize = 25;
        var damageFromObstacle = 10;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        
        sawBladeHitZone.x = 435;
        sawBladeHitZone.y = 545;
       game.addGameItem(sawBladeHitZone);

       var obstacleImage = draw.bitmap('img/Spikes_in_Sonic_the_Hedgehog_4(1).png');
        sawBladeHitZone.addChild(obstacleImage);
        obstacleImage.x = -25;
        obstacleImage.y = -25;
        obstacleImage.scale
    };
        /*enemy*/
        var enemy = game.createGameItem('enemy',25);
        var redSquare = draw.rect(52,52,'purple');
        redSquare.x = -25;
        redSquare.y = -25;
        enemy.addChild(redSquare);

        enemy.x = 400;
        enemy.y = groundY-50;

        game.addGameItem(enemy);

        enemy.velocityX = -1;

        enemy.onPlayerCollision = function() {
    game.changeIntergrity(-30);
    enemy.fadeOut();
};

      enemy.onPlayerCollision = function() {
          game.increaseScore(69);
          enemy.fadeOut();
      };

        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}

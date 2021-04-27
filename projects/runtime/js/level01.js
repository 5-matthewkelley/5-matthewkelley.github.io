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
                { "type": "sawblade", "x": 600, "y": groundY - 110 },
                { "type": "sawblade", "x": 700, "y": groundY - 110 },
                { "type": "sawblade", "x": 800, "y": groundY - 110 },
                { "type": "spikes", "x": 900, "y": groundY - 30},
                { "type": "spikes", "x": 1200, "y": groundY - 30},
                { "type": "spikes", "x": 1500, "y": groundY - 30},
                { "type" :"redSquare", "x": 400, "y": groundY - 50 },
                { "type": "reward", "x": 1000, "y": groundY - 50},
                { "type": "sawblade", "x": 1600, "y": groundY},
                { "type": "sawblade", "x": 1800, "y": groundY},
                { "type": "sawblade", "x": 2000, "y": groundY},
                { "type": "sawblade", "x": 2200, "y": groundY - 110 },
                { "type": "spikes", "x": 2350, "y": groundY - 30},
                { "type" :"redSquare", "x": 1800, "y": groundY - 50 },
                { "type" :"redSquare", "x": 1660, "y": groundY - 50 },
                { "type": "sawblade", "x": 2850, "y": groundY - 110 },
                { "type": "sawblade", "x": 3050, "y": groundY - 110 },
                { "type": "sawblade", "x": 3250, "y": groundY - 110 },
                { "type" :"redSquare", "x": 1870, "y": groundY - 50 },
                { "type" :"redSquare", "x": 1550, "y": groundY - 50 },
                { "type" :"redSquare", "x": 1440, "y": groundY - 50 },
                { "type": "reward", "x": 1985, "y": groundY - 50},
                 { "type": "sawblade", "x": 2650, "y": groundY - 110 },
                
            ]
        };
        for (var i = 0; i < levelData.gameItems.length; i++){
              var obj = levelData.gameItems[i];
              var objX = obj.x;
              var objY = obj.y;
              var objType = obj.type;

              if (objType === "sawblade"){
                   createSawBlade(objX, objY);
               }  else if (objType === "redSquare"){
                   createEnemy(objX, objY);
                } else if (objType === "reward") {
                    createPrize(objX, objY);
                } else {
                   createSpikes(objX, objY);
                }
        }

        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        /* This is the function*/
        function createSawBlade (x, y){ var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);

            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }       
            /* spikes*/
            function createSpikes(x,y) { 
                var hitZoneSize = 20;
                var damageFromObstacle = 10;
                var spikesHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
                
                spikesHitZone.x = x;
                spikesHitZone.y = y;
                game.addGameItem(spikesHitZone);

                var obstacleImage = draw.bitmap('img/spikes.png');
                spikesHitZone.addChild(obstacleImage);
                obstacleImage.x = -35;
                obstacleImage.y = -55;
            };


        /*enemy*/
            function createEnemy(x, y){
                var enemy = game.createGameItem('enemy',25);
                var redSquare = draw.rect(52,52,'red');
                redSquare.x = -25;
                redSquare.y = -25;
                enemy.addChild(redSquare);

                enemy.x = x;
                enemy.y = y;

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
            }
            /*healing*/
            function createPrize(x, y) {
                var prize = game.createGameItem('prize', 25);
                var greenSquare = draw.rect(50,50,'green');
                greenSquare.x = -25;
                greenSquare.y = -25;
                prize.addChild(greenSquare);
                prize.x = x;
                prize.y = y;
                prize.velocityX = -1

                game.addGameItem(prize);
                prize.onPlayerCollision = function() {
                    game.changeIntegrity(10);
                    game.increaseScore(100);
                    prize.fadeOut();
                }
        }
      
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}

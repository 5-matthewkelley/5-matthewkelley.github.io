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
                { "type": "spikes", "x": 900, "y": groundY - 30}
            ]
        };
        for (var i = 0; i < levelData.gameItems.length; i++){
              var obj = levelData.gameItems[i];
              var objX = obj.x;
              var objY = obj.y;
              var objType = obj.type;

              if (objType === "sawblade"){
                   createSawBlade(objX, objY);
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

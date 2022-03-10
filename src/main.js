'use strict';

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function createMap(){
    var map = new Map(10,10);
    return map;
}

function showPathFromTile(gameMap, xLocation, yLocation){
    //get connections of tile from gameMap    
    var connections = gameMap.tiles[xLocation][yLocation].countConnections;
    //calculate random connection to neighboring tiles
    //0 - North, 1 - East, 2 - South, 3 - West
    var showRoom = Math.floor(getRandomArbitrary(0, 4));
    var clockWise = Math.floor(getRandomArbitrary(0, 2));
    clockWise = clockWise == 1 ? 1 : -1;
    for (let index = 0; index <= connections; index++) {        
        switch (showRoom) {
            case 0:
                var x = xLocation;
                var y = yLocation + 1;
                break;
            case 1:
                var x = xLocation + 1;
                var y = yLocation;
                break;
            case 2:
                var x = xLocation;
                var y = yLocation - 1;
                break;
            case 3:
                var x = xLocation - 1;
                var y = yLocation;
                break;
        }
        //show Room by changing classes, concat two numbers as string
        //test if x and y are out of bounds
        var fromClass = 'light';
        var toClass = 'info';
        if(x >= 0 && y >= 0) replaceButtonClassFromTo('' + x + y, fromClass, toClass);
        //set showRoom for next iteration
        if((showRoom + 1 * clockWise) > 3 || (showRoom + 1 * clockWise) < 0){
            showRoom = 0;
        } else {
            showRoom = showRoom + 1 * clockWise;
        } 
    }
}

function replaceButtonClassFromTo(xyLocation, from, to){
    if($('#'+xyLocation).hasClass('btn-'+from)){
        $('#'+xyLocation).removeClass('btn-'+from);
        $('#'+xyLocation).addClass('btn-'+to);
    }    
}


function createColumn(Tile, startTile, targetTile){
    var tileType = 'btn-light';
    var isStartTile = Tile.x == startTile[0] && Tile.y == startTile[1];
    var isTargetTile = Tile.x == targetTile[0] && Tile.y == targetTile[1];
    var margin = Math.abs(Tile.size-3);
    //normal tiles, no text
    if(isTargetTile) tileType = 'btn-warning';
    if(!isStartTile) {
        return '<button type="button" class="btn ' + tileType + ' m-' + margin + ' p-' + Tile.size + '" id="' + Tile.x + Tile.y + '">&nbsp;&nbsp;&nbsp;</button>';
    }
    //only for start tile show content
    if(isStartTile) tileType = 'btn-primary';
    return '<button type="button" class="btn ' + tileType + ' m-' + margin + ' p-' + Tile.size + '" id="' + Tile.x + Tile.y + '">You</button>';
}

function drawTile(tileColumn, startTile, targetTile){
    var string = '<div class="col">'
    for (let index = 0; index < tileColumn.length; index++) {
        string = string + createColumn(tileColumn[index], startTile, targetTile);
    }
    string = string +  '</div>';
    string = '<div class="row">' + string + '</div>';
    $('#container').append(string);
}

$(document).ready(function() {
    var gameMap = createMap();
    console.log(gameMap);
    //initialise game board
    for (let index = 0; index < gameMap.tiles.length; index++) {
        drawTile(gameMap.tiles[index], gameMap.startTile, gameMap.targetTile);
    }
    //process starttile
    showPathFromTile(gameMap, gameMap.startTile[0], gameMap.startTile[1]);

    $(".btn").click(function() {
        if($(this).hasClass('btn-info')){
            var id = $(this).attr('id');
            showPathFromTile(gameMap, parseInt(id.charAt(0)), parseInt(id.charAt(1)));
            //change color for visited tile
            var fromClass = 'info';
            var toClass = 'primary';
            replaceButtonClassFromTo(id, fromClass, toClass);
        }
    });
});

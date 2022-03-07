'use strict';

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function createMap(){
    var map = new Map(10,10);
    return map;
}

function createColumn(Tile, startTile, targetTile){
    var tileType = 'btn-light';
    if(Tile.x == startTile[0] && Tile.y == startTile[1]) tileType = 'btn-primary';
    if(Tile.x == targetTile[0] && Tile.y == targetTile[1]) tileType = 'btn-info';
    var margin = Math.abs(Tile.size-3);
    return '<button type="button" class="btn ' + tileType + ' m-' + margin + ' p-' + Tile.size + '">' + Tile.countConnections +  '|' + Tile.size + ' ' + '</button>';
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
    for (let index = 0; index < gameMap.tiles.length; index++) {
        drawTile(gameMap.tiles[index], gameMap.startTile, gameMap.targetTile);
    }
});

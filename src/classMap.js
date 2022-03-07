'use strict';

class Map {
    constructor(height, width) {
      this.height = height;
      this.width = width;
      this.tiles = [];
      this.startTile = [Math.floor(getRandomArbitrary(0, height-1)) ,Math.floor(getRandomArbitrary(0, width-1))];
      this.targetTile = [Math.floor(getRandomArbitrary(0, height-1)) ,Math.floor(getRandomArbitrary(0, width-1))];
      //special case, start tile is target file. calculate target new
      if (this.startTile[0] == this.targetTile[0] && this.startTile[1] == this.targetTile[1]){
        this.targetTile = [Math.floor(getRandomArbitrary(0, height-1)) ,Math.floor(getRandomArbitrary(0, width-1))];
      }
      for (let indexWidth = 0; indexWidth < width; indexWidth++) {
        var tileArr = Array();
        for (let indexHeight = 0; indexHeight < height; indexHeight++) {
            var size = Math.floor(getRandomArbitrary(1,3));
            //set restrictions for corners for borders
            if((indexWidth == 0 && indexHeight == 0) ||
                (indexWidth == 0 && indexHeight == (height-1)) ||
                (indexWidth == (width-1) && indexHeight == 0) ||
                (indexWidth == (width-1) && indexHeight == (height-1))){
                //set restrictions for corner
                var countConnections = Math.floor(getRandomArbitrary(1,3));
            } 
            else if(indexWidth == 0 || indexHeight == 0 || indexHeight == (height-1) || indexWidth == (width-1)){
                //set restrictions for borders
                var countConnections = Math.floor(getRandomArbitrary(1,4));
            } else {
                //all other tiles
                var countConnections = Math.floor(getRandomArbitrary(2,5));
            }
            var x = indexWidth;
            var y = indexHeight;
            tileArr[indexHeight] = new Tile(countConnections, size, x, y);
        }
        this.tiles[indexWidth] = tileArr;
      }      
    }
}
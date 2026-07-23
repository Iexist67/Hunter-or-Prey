export class verticalWall{

    constructor(x, y){
        this.style = `margin:0px; z-index: 999; height:11%; width: 1%; position: absolute; transform:translate(-50%, -50%); top:${y}%; left:${x}%; border:2px solid black;`;
        this.minY = y - 6.0;
        this.maxY = y + 6.0;
        this.minX = x - 1.0;
        this.maxX = x + 1.0;
    }

}
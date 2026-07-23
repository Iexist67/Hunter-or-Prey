export class horizontalWall{
     constructor(x, y){
        this.style = `margin:0px; z-index: 999; height:1%; width: 11%; position: absolute; transform:translate(-50%, -50%); top:${y}%; left:${x}%; border:2px solid black;`;
        this.minY = y - 1.0;
        this.maxY = y + 1.0;
        this.minX = x - 6.0;
        this.maxX = x + 6.0;
    }
}
console.log("Script loaded!");
import {verticalWall} from './verticalWall.js';
import {horizontalWall} from './horizontalWall.js';

//player movement and coords
let player1 = document.getElementById("player1");
let positionX = 50;
let positionY = 50;
let up = false;
let down = false;
let left = false;
let right = false;
let movementId;

//game ARena and stuff
let gameArena = document.getElementById("gameArena");
let gameAX = 50;
let gameAY = 50;

// size and friction and acc
const SIZE = 1;
const FRICTION = 0.005;
const ACC = 0.0125;

// constant for movement speed
let speedY = 0;
let speedX = 0;

// arrays for walls
let horArray = [];
let verArray = [];

// array for horizontal walls
let minYVals = [];
let minXVals = [];
let maxYVals = [];
let maxXVals = [];

document.addEventListener("keydown", function(event) {
    if (event.key === "w") up = true;

    if (event.key === "s") down = true;

    if (event.key === "a") left = true;

    if (event.key === "d") right = true;

});
document.addEventListener("keyup", function(event) {
    if (event.key === "w") up = false;

    if (event.key === "s") down = false;

    if (event.key === "a") left = false;

    if (event.key === "d") right = false;

});

function player1Movement(frame){

        if (distanceWallCalculator(positionX, positionY)){
            // movement code
            speedY = movement(speedY, player1, down, up, positionY);
            speedX = movement(speedX, player1, right, left, positionX);
            hitboxChecker();
            positionY = updateMovement(speedY, positionY);
            positionX = updateMovement(speedX, positionX);
            convertPosToPlayer(player1, positionX, positionY);
        } else {
            // bouncing on the edges 
            if((positionY > (100 - SIZE * 0.5) || positionY < (SIZE * 0.5))){
                if(Math.abs(speedY) > 0.01){
                    speedY = (movement(speedY, player1, down, up, positionY)) * -1;
                    positionY = updateMovement(speedY, positionY);
                } else {
                    positionY = stopStopping(positionY, speedY);
                }
            } 
            if((positionX > (100 - SIZE * 0.5) || positionX < (SIZE * 0.5))){
                if(Math.abs(speedX) > 0.01){
                    speedX = (movement(speedX, player1, right, left, positionX)) * -1;
                    positionX = updateMovement(speedX, positionX);
                }  else {
                    positionX = stopStopping(positionX, speedX);
                }
            }

            convertPosToPlayer(player1, positionX, positionY);
        }

    movementId = requestAnimationFrame(player1Movement);
}
movementId = requestAnimationFrame(player1Movement);

function stopStopping(position, speed){
    speed = 0;
    position = updateMovement(speed, position);
    if(position > (100 - SIZE * 0.5)){
        position = 100 - SIZE * 0.5;
    }
    if(position < (SIZE * 0.5)){
        position = SIZE * 0.5;
    }
    return position
}

//wall distance claculator
function distanceWallCalculator(x, y){
    //checks for distance from wall
    if((x > (100 - SIZE * 0.5) || x < (SIZE * 0.5)) || (y < (SIZE * 0.5) || y > (100 - SIZE * 0.5))){
        return false;
    } else {
        return true;
    }
}

function updateMovement(speed, pos){
    // updates movement
    pos += speed;
    return pos;
}

// moves player changes speed
function movement(speed, player, keyPos, keyNeg, position){
     let direction = 0;

     // Check for direction of the W and S key
        if (keyNeg){
            direction = -1;
        }
        if (keyPos){
            direction = 1;
        }
        if (!keyPos && !keyNeg){
            direction = 0;
        }
    // Friction, slows down object
        if (speed > 0.007 || speed < -0.007){ // sets range betwen 0.07 and -0.07
            // finds the right side and gets speedY closer to 0
            if(speed > 0.007){
                speed -= FRICTION;
            }
            if(speed < -0.007){
                speed += FRICTION;
            }
        } else {
            // sets speedY to 0 if inside -0.07 and 0.07 range
            speed = 0;
        }
        // Sets a absolute speed, 0.35
        if(Math.abs(speed) < 0.35){
            speed += ACC * direction;
        }
        // changes position
        return speed;
}

function convertPosToPlayer(object, x, y){
    object.style.top = y + "%";
    object.style.left = x + "%";
}

// creates walls randomly
const RANDCONST = 5;
let vertiWallCount = 0;
let randomChoosing;

for(let j = 5; j < 95; j = j + 10){
    vertiWallCount = 0;
    for (let i = 10; i < 100; i = i + 10){
        randomChoosing = (Math.random() * 1);
        if(randomChoosing >= 0.5){
            vertiWallCount ++;
            if (vertiWallCount <= RANDCONST){
                createVerticalWall(i,j);
            }   
        }
    }
}

let horiWallCount = 0;
let randomChoosingHori;

for (let j = 10; j < 100; j = j + 10){
    horiWallCount = 0;
    for (let i = 0; i < 100 ; i = i + 10){
        randomChoosingHori = (Math.random() * 1)
        if(randomChoosingHori >= 0.5){
            horiWallCount ++;
            if (horiWallCount <= RANDCONST){
                createHorizontalWall(i, j);
            }
        }
    }
}


//creates horizontal and vertical walls and displays them
function createHorizontalWall(x,y){
    const horizontalWalls = document.getElementById("horizontalWalls");
    const newObjHori = new horizontalWall(x,y);
    minYVals.push(newObjHori.minY);
    minXVals.push(newObjHori.minX);
    maxYVals.push(newObjHori.maxY);
    maxXVals.push(newObjHori.maxX);
    

    let makeWall = document.createElement('p');
    makeWall.style.cssText = newObjHori.style;
    horizontalWalls.append(makeWall);
}
function createVerticalWall(x, y){

    const verticalWalls = document.getElementById("verticalWalls");
    const newObjVerti = new verticalWall(x, y);
    minYVals.push(newObjVerti.minY);
    minXVals.push(newObjVerti.minX);
    maxYVals.push(newObjVerti.maxY);
    maxXVals.push(newObjVerti.maxX);


    let makeWall = document.createElement("p");
    makeWall.style.cssText = newObjVerti.style;
    verticalWalls.append(makeWall);

}

// hitbox
// thats for later i guess it doesn't work tho ugghghghghghhh
function hitboxChecker(){

    for (let i = 0; i < minYVals.length; i++){
        if ((minYVals[i] <= positionY) && (maxYVals[i] >= positionY) && (minXVals[i] <= positionX) && (maxXVals[i] >= positionX)){
            console.log('inside object');
            if (minYVals[i] <= positionY && maxYVals[i] >= positionY && (minXVals[i] <= positionX || maxXVals[i] >= positionX)){
                speedX *= -1;
            }
            if (minXVals[i] <= positionY && maxXVals[i] >= positionX && (minYVals[i] <= positionY || maxYVals[i] >= positionX)){
                speedY *= -1;
            }
        }
    }

}


"use strict";

var canvas, ctx;

var frame = 0;
var frameDivider = 10;

var grid;
var prevGrid;

var GRID_WIDTH = 150;
var GRID_HEIGHT = 50;
var CELL_WIDTH;
var CELL_HEIGHT;

window.onload = function() {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    canvas.onmouseup = update;

    init();
    update();
}

function init() {
    //create and populate the grid
    createRandomGrid(GRID_WIDTH, GRID_HEIGHT);

    CELL_WIDTH = canvas.width / GRID_WIDTH;
    CELL_HEIGHT = canvas.height / GRID_HEIGHT;

    //start the update loop
    update();
}

//called once per frame, calls draw
function update() {
    requestAnimationFrame(update);

    if (++frame % frameDivider != 0) {
        return;
    }

    draw();

    for (var i = 0; i < GRID_WIDTH; i++) {
        for (var j = 0; j < GRID_HEIGHT; j++) {
            prevGrid[i][j] = grid[i][j];
        }
    }

    for (var x = 0; x < GRID_WIDTH; x++) {
        for (var y = 0; y < GRID_HEIGHT; y++) {
            updateCell(x, y);
        }
    }

}

//called by update once per frame
function draw() {
    for (var x = 0; x < GRID_WIDTH; x++) {
        for (var y = 0; y < GRID_HEIGHT; y++) {
            if (grid[x][y]) {
                ctx.fillStyle = "white";
            } else {
                ctx.fillStyle = "black";
            }

            ctx.fillRect(x * CELL_WIDTH - 2, y * CELL_HEIGHT - 2, x * (CELL_WIDTH + 1), y * (CELL_HEIGHT + 1));
        }
    }

}

//creates the 2d grid array
function createGrid(width, height) {
    grid = new Array(width);
    prevGrid = new Array(height);

    //populate the 1d array "grid" with arrays,
    //thus creating a 2d grid
    for (var i = 0; i < width; i++) {
        grid[i] = new Array(height);
        prevGrid[i] = new Array(height);
        for (var j = 0; j < height; j++) {
            grid[i][j] = false;
            prevGrid[i][j] = false;
        }
    }
}

//creates the 2d grid array and populates it randomly
function createRandomGrid(width, height) {
    grid = new Array(width);
    prevGrid = new Array(height);

    //populate the 1d array "grid" with arrays,
    //thus creating a 2d grid
    for (var i = 0; i < width; i++) {
        grid[i] = new Array(height);
        prevGrid[i] = new Array(height);
        for (var j = 0; j < height; j++) {
            if (Math.random() < 0.5) {
                grid[i][j] = false;
            } else {
                grid[i][j] = true;
            }
            prevGrid[i][j] = false;
        }
    }
}

function updateCell(x, y) {
    var liveNeighbors = 0;
    var isAlive = prevGrid[x][y];

    //Calculate the number of live neighbors for the current cell
    for (var xDif = -1; xDif < 2; xDif++) {
        for (var yDif = -1; yDif < 2; yDif++) {
            var neighborX = x + xDif;
            var neighborY = y + yDif;

            //If the neighbor coordinates are outside of the grid, skip to the next iteration
            if(neighborX < 0 || neighborY < 0 || neighborX >= GRID_WIDTH || neighborY >= GRID_HEIGHT) {
                continue;
            }

            //Don't count itself as a neighbor
            if (xDif == 0 && yDif == 0) {
                continue;
            }

            if(prevGrid[neighborX][neighborY]) {
                liveNeighbors++;
            }
        }
    }


    if(isAlive) {
        if (liveNeighbors < 2) {
            grid[x][y] = false;
        }
        if (liveNeighbors > 3) {
            grid[x][y] = false;
        }
    } else {
        if (liveNeighbors == 3) {
            grid[x][y] = true;
        }
    }
}

//A square still life
function spawnSquare(x, y) {
    grid[x][y] = true;
    grid[x + 1][y] = true;
    grid[x][y + 1] = true;
    grid[x + 1][y + 1] = true;
}

//A beehive still life
function spawnBeehive(x, y) {
    grid[x + 1][y] = true;
    grid[x + 2][y] = true;
    grid[x][y + 1] = true;
    grid[x + 3][y + 1] = true;
    grid[x + 1][y + 2] = true;
    grid[x + 2][y + 2] = true;
}

//A boat still life
function spawnBoat(x, y) {
    grid[x][y] = true;
    grid[x + 1][y] = true;
    grid[x][y + 1] = true;
    grid[x + 1][y + 2] = true;
    grid[x + 2][y + 1] = true;
}

//A tub still life
function spawnTub(x, y) {
    grid[x + 1][y] = true;
    grid[x][y + 1] = true;
    grid[x + 1][y + 2] = true;
    grid[x + 2][y + 1] = true;
}

//A blinker oscillator
function spawnBlinker(x, y) {
    grid[x + 1][y] = true;
    grid[x + 1][y + 1] = true;
    grid[x + 1][y + 2] = true;
}

function spawnToad(x, y) {
    grid[x + 1][y] = true;
    grid[x + 2][y] = true;
    grid[x + 3][y] = true;
    grid[x][y + 1] = true;
    grid[x + 1][y + 1] = true;
    grid[x + 2][y + 1] = true;
}

function spawnBeacon(x, y) {
    grid[x][y] = true;
    grid[x + 1][y] = true;
    grid[x][y + 1] = true;
    grid[x + 1][y + 1] = true;
    grid[x + 2][y + 2] = true;
    grid[x + 3][y + 2] = true;
    grid[x + 2][y + 3] = true;
    grid[x + 3][y + 3] = true;
}
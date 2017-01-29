"use strict";

var canvas, ctx;

var grid;
var prevGrid;

var GRID_WIDTH = 20;
var GRID_HEIGHT = 20;
var CELL_WIDTH;
var CELL_HEIGHT;

window.onload = function() {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    init();
    update();
}

function init() {
    //create and populate the grid
    createGrid(GRID_WIDTH, GRID_HEIGHT);

    CELL_WIDTH = canvas.width / GRID_WIDTH;
    CELL_HEIGHT = canvas.height / GRID_HEIGHT;

    //start the update loop
    update();
}

//called once per frame, calls draw
function update() {
    requestAnimationFrame(update);

    prevGrid = grid;

    for (var x = 0; x < GRID_WIDTH; x++) {
        for (var y = 0; y < GRID_HEIGHT; y++) {
            updateCell(x, y);
        }
    }

    draw();
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

            ctx.fillRect(x * CELL_WIDTH, y * CELL_HEIGHT, x * (CELL_WIDTH + 1), y * (CELL_HEIGHT + 1));
        }
    }

}

//creates the 2d grid array
function createGrid(width, height) {
    grid = new Array(width);

    //populate the 1d array "grid" with arrays,
    //thus creating a 2d grid
    for (var i = 0; i < width; i++) {
        grid[i] = new Array(height);
        for (var j = 0; j < height; j++) {
            grid[i][j] = false;
        }
    }
}

function updateCell(x, y) {
    var liveNeighbors = 0;

    //calculate number of liveNeighbors
    for (var xDif = -1; xDif < 2; xDif++) {
        for (var yDif = -1; yDif < 2; yDif++) {
            
        }
    }

    //Any live cell with fewer than 2 neighbors, or more than 3 neighbors, dies
    if (liveNeighbors < 2 || liveNeighbors > 3) {
        grid[x][y] = false;
    }
    
    //Any dead cell with exactly 3 neighbors, comes to life
    if (liveNeighbors == 3) {
        grid[x][y] = true;
    }
}
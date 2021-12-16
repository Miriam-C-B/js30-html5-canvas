const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d"); //this is the context we actually draw on! Can be 2D or 3D

//resizing the canvas to fit the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//styles the lines we're drawing onto the canvas
ctx.strokeStyle = "#BADA55";  // initial colour
ctx.lineJoin = "round"; //when lines join the end is round
ctx.lineCap = "round"; //line ends in a round ending

let isDrawing = false; //captures if someone is clicking down to draw or just moves their mouse

//These two make the line start and stop when you click down
let lastX = 0;
let lastY = 0;

//function and eventlisteners to capture drawing
function draw(e) {
    if(!isDrawing) return; //stops the fn from running when you're not moused down (hold down the click)
    console.log(e);
    //the following bit inside the function actually displays the drawing!
    ctx.beginPath(); // start from
    ctx.moveTo(lastX, lastY); //go to wherever the user's mouse stops
    ctx.lineTo(e.offsetX, e.offsetY); // offsetX and offsetY are values from the event e (=when you move the mouse); they are collected by the eventlisteners below
    ctx.stroke();
    
    //updates lastX and lastY to where the mouse actually is so you can draw lines on the canvas
    lastX = e.offsetX;
    lastY = e.offsetY;
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", () => isDrawing = true); //runs function if isDrawing is true
canvas.addEventListener("mouseup", () => isDrawing = false); //won't run function if you don't click anything
canvas.addEventListener("mouseout", () => isDrawing = false); //when you move mouse off screen it will stop drawing
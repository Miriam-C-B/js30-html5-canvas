const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d"); //this is the context we actually draw on! Can be 2D or 3D

//resizing the canvas to fit the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//styles the lines we're drawing onto the canvas
ctx.strokeStyle = "#BADA55";  // initial colour
ctx.lineJoin = "round"; //when lines join the end is round
ctx.lineCap = "round"; //line ends in a round ending
ctx.globalCompositeOperation = "xor"; //blends the different layers of strokes when you draw over them; look up different blend modes online

let isDrawing = false; //flag = condition you want to try out, see if it is true-> sth happens, if it's false something else happens

//These two make the line start and stop when you click down
let lastX = 0;
let lastY = 0;

//hsl colours
let hue = 0;

//variable that determines that line width grows
let direction = true;

//function and eventlisteners to capture drawing
function draw(e) {
    if(!isDrawing) return; //stops the fn from running when you're not moused down (hold down the click)
    console.log(e);
    //the following bit inside the function actually displays the drawing!
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; //hsl=colours of the rainbow, 100% saturation and 50% lightness
    ctx.beginPath(); // start from
    ctx.moveTo(lastX, lastY); //go to wherever the user's mouse stops
    ctx.lineTo(e.offsetX, e.offsetY); // offsetX and offsetY are values from the event e (=when you move the mouse); they are collected by the eventlisteners below
    ctx.stroke();
    
    //updates lastX and lastY to where the mouse actually is so you can draw lines on the canvas
    // lastX = e.offsetX;
    // lastY = e.offsetY;
    //you can do the same by restructuring an array:
    [lastX, lastY] = [e.offsetX, e.offsetY];

    //colour and changing line thickness stuff
    hue++; //changes the hue every time we draw and gives the stroke a rainbow colour
    if(hue > 360) {
        hue = 0;
    } //resets the hue once it reached 360; otherwise the console keeps counting
    
    if(ctx.lineWidth >= 100 || ctx.lineWidth <=1) {
        direction = !direction; //if it's greater than 100 OR smaller than 1, flip the direction
    }

    if(direction) { //depending on what the direction is, the line width grows or shrinks
        ctx.lineWidth++; //line width grows
    } else {
        ctx.lineWidth--; //line width shrinks
    }
}

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]; //updates these values so the line starts wherever the mouse is
}); //runs function if isDrawing is true

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => isDrawing = false); //won't run function if you don't click anything
canvas.addEventListener("mouseout", () => isDrawing = false); //when you move mouse off screen it will stop drawing


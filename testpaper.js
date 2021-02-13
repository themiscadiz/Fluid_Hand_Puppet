// Create a Paper.js Path to draw a line into it:
var path = new Path();
path.strokeColor = 'black';
var start = new Point(100, 100);
path.moveTo(start);

// Use the global variables a and b defined in the JavaScript
path.lineTo(start + [ globals.a, globals.b ]);

// Define a global function inside the window scope.
globals.lineTo = function(c,d) {
    path.lineTo(new Point(c, d));
}
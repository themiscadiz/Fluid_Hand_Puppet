
// // PAPER.JS

// var sizeCircle = 20;

// //Background Rectangle
// var rect = new Path.Rectangle({
//     point: [0, 0],
//     size: [view.size.width, view.size.height],
//     strokeColor: 'white',
//     selected: true
// });

// rect.sendToBack();
// rect.fillColor = '#32a852';

// // var myCircle = new Path.Circle(new Point(100,100), sizeCircle);

// // myCircle.strokeColor = 'black';
// // myCircle.fillColor = '#1d4a29';
// // myCircle.selected = true; 

// var testCircle = new Path.Circle({
//         center: new Point(100,100),
//         radius: 50,
//         fillColor: 'white',
//         strokeColor: 'black'
//     }); 

//     var testCircle2 = new Path.Circle({
//         center: new Point(100,100),
//         radius: 50,
//         fillColor: 'blue',
//         strokeColor: 'black'
//     }); 

// tool.onMouseMove = function(event){
//         // testCircle.position = [globals.a, globals.b] ;

// }

// function onMouseDrag(event) {

//     // testCircle.center.x += 1;

//     // // The radius is the distance between the position
//     // // where the user clicked and the current position
//     // // of the mouse.

//     //     var path = new Path.Circle({
//     //     center: event.downPoint,
//     //     // center: (event.clientX, event.clientY),
//     //     radius: (event.downPoint - event.point).length,
//     //     fillColor: 'white',
//     //     strokeColor: 'black'
//     // }); 

//     // // Remove this path on the next drag event:
//     // path.removeOnDrag();

//     // sizeCircle += 2;
// };


// // var myCircle2 = new Path.Circle(new Point(200, 200), sizeCircle);
// // myCircle2.strokeColor = 'black';
// // myCircle2.fillColor = 'red';


// function onFrame(event) {
//     testCircle.position = [globals.a, globals.b] ;

//     testCircle2.position = [globals.c, globals.d] ;
//     // console.log(testCircle.position);

//     // myCircle2.fillColor.hue += 1;
// }


// ******************************************************************************************


// ******************************


//Background Rectangle

// var rect = new Path.Rectangle({
//     point: [0, 0],
//     size: [view.size.width, view.size.height],
//     strokeColor: 'white',
//     selected: true
// });

// rect.sendToBack();
// rect.fillColor = '#32a852';

// ******************************
var smooth = true;
var values = {
    paths: 1,
    minPoints: 5,
    maxPoints: 5,
    minRadius: 50,
    maxRadius: 50
};

var hitOptions = {
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 5
};

var globalPath;

var blinkMotion = false;

var eyesMovementMap = 0;

// var color1 = 'blue';

// createPaths(color1);
var hue = new Color({ hue: Math.random() * 360, saturation: .50, brightness: 1 })
createPaths(hue);

function createPaths(hue) {
    var radiusDelta = values.maxRadius - values.minRadius;

    var pointsDelta = values.maxPoints - values.minPoints;

    for (var i = 0; i < values.paths; i++) {

        var radius = values.minRadius + Math.random() * radiusDelta;

        var points = values.minPoints + Math.floor(Math.random() * pointsDelta);

        globalPath = createBlob(view.size / 2, radius, points);

        // var hue = new Color({ hue: Math.random() * 360, saturation: .50, brightness: 1 })
        globalPath.fillColor = hue;
        globalPath.strokeColor = hue;


        globalPath.strokeWidth = 20;
        globalPath.strokeCap = 'round';

    };
}

function createBlob(center, maxRadius, points) {
    var path = new Path();
    path.closed = true;

    for (var i = 0; i < points; i++) {
        var delta = new Point({
            // length: (maxRadius * 0.5) + (Math.random() * maxRadius * 0.5),
            length: 100,
            angle: (-180 / points) * i
        });

        path.add(center + delta);
    }

    // path.smooth();

    if (smooth)
        // path.smooth({ type: 'continuous', from: -1, to: 1 }); 
        // path.smooth({ type: 'catmull-rom', factor: 0.0 });
        path.smooth({ type: 'continuous' });


    return path;
}

// face
var face = new Path.Circle({

    center: new Point(100, 100),
    radius: 70,
    fillColor: hue,
    strokeColor: hue
});

// if (blinkMotion) {
//     console.log("eyes open");
// }
// else if(blinkMotion===false) {
//     console.log("eyes close");
// }

// ****eyes circle****
var eyeLOpen = new Path.Circle({
    center: [0, 0],
    radius: 20
});

var eyeROpen = new Path.Circle({
    center: [60, 0],
    radius: 20
});

var eyesOpen = new Group();
eyesOpen.children = [eyeLOpen, eyeROpen];

// The path is the first child of the group:
// eyesOpen.firstChild.fillColor = 'black';
// eyesOpen.lastChild.fillColor = 'black';

// eyesOpen.fillColor = 'black';

// eyesOpen.position = [globals.n, globals.o];


// ****eyes glow****
var eyeLGlow = new Path.Circle({
    center: [0, 0],
    radius: 5,
    fillColor: 'white'
});

var eyeRGlow = new Path.Circle({
    center: [60, 0],
    radius: 5,
    fillColor: 'white'
});

var eyesGlow = new Group();
eyesGlow.children = [eyeLGlow, eyeRGlow];


// eyes arc
var eyeL = new Path.Arc({
    from: [20, 20],
    through: [30, 30],
    to: [40, 20]
});

var eyeR = new Path.Arc({
    from: [80, 20],
    through: [90, 30],
    to: [100, 20]
});

var eyes = new Group();
eyes.children = [eyeL, eyeR];

// The path is the first child of the group:
// eyes.firstChild.fillColor = 'white';
// eyes.lastChild.fillColor = 'white';

// eyes.strokeColor = 'black';
eyes.position = [0, 0];
eyes.strokeWidth = 10;
eyes.strokeCap = 'round';


// mouth arc smile
var mouth = new Path.Arc({
    from: [40, 90],
    through: [50, 100],
    to: [60, 90]
});

mouth.strokeColor = 'black';
// mouth.position = [30, 30];
mouth.strokeWidth = 5;
mouth.strokeCap = 'round';


// mouth open
// .
// .
// .

var segment, path;
var movePath = false;



function onFrame(event) {

    blinkMotion = globals.p;
    mouthMotion = globals.q;

    if (blinkMotion) {
        console.log("eyes close");
        eyes.strokeColor = 'black';
        eyesOpen.fillColor = hue;
        eyesGlow.fillColor = hue;
    }
    else if (blinkMotion === false) {

        console.log("eyes open");
        eyesOpen.fillColor = 'black';
        eyes.strokeColor = 'black';
        eyesGlow.fillColor = hue;
        // eyes.fillColor = 'blue';
        eyes.strokeWidth = 5;
    }

    // mouthMotion

    if (mouthMotion) {
        console.log("mouth open");
        mouth.strokeWidth = 20;

    }
    else if (mouthMotion === false) {
        console.log("mouth close");
        mouth.strokeWidth = 7;


    }

    var itemTest1 = project.getItem({
        class: Path
        // fillColor: 'black'
    });

    // var itemTest2 = project.getItem({
    //     class: Path,
    //     fillColor: 'blue'
    // });

    face.position = [globals.e, globals.f];

    eyes.position = [globals.e, globals.f + 5];

    // eyesGlow.position = [globals.e, globals.f - 10];

    mouth.position = [globals.e, globals.f + 30];

    // eyesOpen.position = [globals.n, globals.o];


    // map function example
    // function mapRange(value, in_min, in_max, out_min, out_max) {
    //   return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    // }

    eyesMovementMap = mapRange(globals.n, 100, 1100, face.position.x + 20, face.position.x - 20);
    eyesOpen.position = [eyesMovementMap, globals.f];
    eyesGlow.position = [eyesMovementMap, globals.f - 10];
    // eyes.position = [eyesMovementMap, globals.f];

    // eyesOpen.position = [globals.e, globals.f];





    //thumb
    itemTest1.segments[0].point.x = globals.a;
    itemTest1.segments[0].point.y = globals.b;

    //index
    itemTest1.segments[1].point.x = globals.c;
    itemTest1.segments[1].point.y = globals.d;

    //middle
    itemTest1.segments[2].point.x = globals.e;
    itemTest1.segments[2].point.y = globals.f;

    //ring
    itemTest1.segments[3].point.x = globals.g;
    itemTest1.segments[3].point.y = globals.d;

    //pinky
    itemTest1.segments[4].point.x = globals.i;
    itemTest1.segments[4].point.y = globals.j;


}


function mapRange(value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
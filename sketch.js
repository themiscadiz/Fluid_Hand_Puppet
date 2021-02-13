// p5 sketch

// ********************
// VARIABLES FOR PAPER
window.globals = { a:800, b:100, c:500, d:100, e:800, f:100, g:500, h:100, i:800, j:100, k:100, l:100, m:100, n: 100, o:100, p:false, q:false};



let handpose;
let video;
let predictions = [];

// let s1, s2, s3;
// let gravity = 9.0;
// let mass = 2.0;
// let newIndicator;
let smoothMov = 0.3;
// let smoothMov = 0.5;


// ****HAND****
let lerp_X = 0;
let lerp_Y = 0;

let lerpPoints = [];

let keypoint;

let previousKeypoint;

let lerpLength = 21;


let thumpFinger;

let indexFinger;

let middleFinger;

let ringFinger;

let pinkyFinger;

let palm;
let floorH;


// ****FACE****

let faceapi;
// let video;
let detections;

// let smoothMov = 0.1;
let lerpPos = [];
let x = 0;
let y = 0;
let pointsLength = 30;

// FACE:
// by default all options are set to true
const detection_options = {
  withLandmarks: true,
  withDescriptors: false,
}

// ****SET UP****

function setup() {
  createCanvas(windowWidth, windowHeight);
  floorH = windowHeight;
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", results => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();

  // HAND
  
    for (let i = 0; i < lerpLength; i++) {
    let thispoint = createVector(0, 0);
    lerpPoints.push(thispoint);
  }


  // FACE
  faceapi = ml5.faceApi(video, detection_options, modelReadyFace)
    //  LERP
    for (let i = 0; i < pointsLength; i++) {
      let thispoint = createVector(0, 0);
      lerpPos.push(thispoint);
    }
}

function modelReady() {
  console.log("Model ready!");
}

function modelReadyFace() {
  console.log('ready!')
  console.log(faceapi)
  faceapi.detect(gotResults)
}

function draw() {
  
  drawKeypoints();

}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {

 

  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      
      if (predictions.length != 0){
         keypoint = prediction.landmarks[j];
      }
      if(predictions.length < 0){
         keypoint = previousKeypoint;
      }
     
      
        fill(0, 255, 0);
        noStroke();

        //       //  LERP
        lerp_X = lerp(lerpPoints[j].x, prediction.landmarks[j][0], smoothMov);
        lerp_Y = lerp(lerpPoints[j].y, prediction.landmarks[j][1], smoothMov);
      

      let keypointPos = createVector(lerp_X, lerp_Y);
      
      lerpPoints[j] = keypointPos;
      
      // // All Point after Lerp
     previousKeypoint = prediction.landmarks[j];

    }

    

    
    
    thumpFinger = createVector(lerpPoints[4].x, lerpPoints[4].y);

    indexFinger = createVector(lerpPoints[8].x, lerpPoints[8].y);

    middleFinger = createVector(lerpPoints[12].x, lerpPoints[12].y);

    ringFinger = createVector(lerpPoints[16].x, lerpPoints[16].y);

    pinkyFinger = createVector(lerpPoints[20].x, lerpPoints[20].y);

    palm = createVector(lerpPoints[0].x, lerpPoints[0].y);


    let distance = indexFinger.dist(thumpFinger);

    if(distance < 90){
      window.globals.p = true;
    }
    else{
      window.globals.p = false;
    }

    // access global variables for paper.js
      window.globals.c = indexFinger.x;
      window.globals.d = indexFinger.y;

      window.globals.a = thumpFinger.x;
      window.globals.b = thumpFinger.y;

      window.globals.e = middleFinger.x;
      window.globals.f = middleFinger.y;

      window.globals.g = ringFinger.x;
      window.globals.h = ringFinger.y;

      window.globals.i = pinkyFinger.x;
      window.globals.j = pinkyFinger.y;

      window.globals.k = palm.x;
      window.globals.l = palm.y;

      window.globals.m = floorH;
  }
}



// Face analysis


function gotResults(err, result) {
  if (err) {
    console.log(err)
    return
  }
  detections = result;
  image(video, 0, 0, width, height)
  if (detections) {
    if (detections.length > 0) {
      drawLandmarks(detections)
    }

  }
  faceapi.detect(gotResults)
}


function drawLandmarks(detections) {
  noFill();
  stroke(161, 95, 251)
  strokeWeight(2)

  for (let i = 0; i < detections.length; i++) {
    const allPoints = detections[i].landmarks._positions;
    drawCircles(allPoints);

  }
}

function drawCircles(feature) {
  for (let i = 0; i < feature.length; i++) {

    // WITH LERP
    lerpPos[i] = createVector(feature[i]._x, feature[i]._y);

    x = lerp(lerpPos[i].x, feature[i]._x, smoothMov);
    y = lerp(lerpPos[i].y, feature[i]._y, smoothMov);

    let smoothPoints = createVector(x, y);
    lerpPos[i] = smoothPoints;

  }
  
  let focalPoint = createVector(lerpPos[27].x, lerpPos[27].y);



  let mouthTop = createVector(lerpPos[51].x, lerpPos[51].y);
  let mouthBottom = createVector(lerpPos[57].x, lerpPos[57].y);
  
  let mouthDist = mouthTop.dist(mouthBottom);

  if(mouthDist > 40){
    window.globals.q = true;
  }
  else{
    window.globals.q = false;
  }
  // ellipse(focalPoint.x, focalPoint.y, 10);
  
  // eyes movement
  fill(255);
  let sides = {
    l_x: 100,
    l_y: 0,
    r_x: 175,
    r_y: 50
  }
  
  // rect(sides.l_x, sides.l_y, sides.r_x, sides.r_y);
  
  // let xMap = map(focalPoint.x, 0, width, sides.r_x*1.5,  sides.l_x);

  // fill(0);
  // ellipse(xMap, 25, 20,20);
  // ellipse(xMap+ 20, 25, 20,20);

  window.globals.n = focalPoint.x;
  window.globals.o = focalPoint.y;
  
}


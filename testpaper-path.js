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

createPaths();

function createPaths() {
	var radiusDelta = values.maxRadius - values.minRadius;
	
	var pointsDelta = values.maxPoints - values.minPoints;
	
	for (var i = 0; i < values.paths; i++) {
	    
		var radius = values.minRadius + Math.random() * radiusDelta;
// 		console.log("radius", radius);
		
		var points = values.minPoints + Math.floor(Math.random() * pointsDelta);
		
// 		var path = createBlob(view.size * Point.random(), radius, points);
//      position
        globalPath = createBlob(view.size /2, radius, points);
		
		var lightness = (Math.random() - 0.5) * 0.4 + 0.4;
// 		color
		var hue = Math.random() * 360;
		globalPath.fillColor = { hue: hue, saturation: 1, lightness: lightness };
		globalPath.strokeColor = 'black';
		
		
	};
	
}

function createBlob(center, maxRadius, points) {
	var path = new Path();
	path.closed = true;
	
	for (var i = 0; i < points; i++) {
		var delta = new Point({
			length: (maxRadius * 0.5) + (Math.random() * maxRadius * 0.5),
			angle: (360 / points) * i
		});
		
		path.add(center + delta);
// 		console.log(delta);
	}
	
	path.smooth();

	return path;
}

var segment, path;
var movePath = false;

    
    var itemTest = project.getItem({
                    class: Path
                    });
    
    itemTest.segments[0].point.x =  globals.a;
    itemTest.segments[0].point.y =  globals.b;

    
    
	
    
	
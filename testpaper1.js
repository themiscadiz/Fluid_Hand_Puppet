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

function onMouseDown(event) {
    
    var itemTest = project.getItem({
                    class: Path
                    });
    
    // console.log(itemTest.segments[0]);
    itemTest.segments[0].point =  event.point;
    // console.log(itemTest.segments[0]);

    
    
	segment = path = null;
	
    
	var hitResult = project.hitTest(event.point, hitOptions);
	

	
	if (!hitResult)
		return;

	if (event.modifiers.shift) {
		if (hitResult.type == 'segment') {
		    
			hitResult.segment.remove();
			
		};
		return;
	}

	if (hitResult) {
		path = hitResult.item;
		if (hitResult.type == 'segment') {
			segment = hitResult.segment;
		} 
		
// 		console.log(segment);
		else if (hitResult.type == 'stroke') {
			var location = hitResult.location;
			
			segment = path.insert(location.index + 1, event.point);
			
			path.smooth();
		}
	}
	movePath = hitResult.type == 'fill';
	if (movePath)
	
		project.activeLayer.addChild(hitResult.item);
// 		console.log(hitResult.item);


    
}

function onMouseMove(event) {
    
	project.activeLayer.selected = false;
	
	if (event.item)
		event.item.selected = true;
		
}

function onMouseDrag(event) {
    
    var itemTest = project.getItem({
                    class: Path
                    });
    
    // console.log(itemTest.segments[0]);
    itemTest.segments[0].point =  event.point;
    
    // // accessing points directly
    // if (path.segments[0]) {
        // globalPath.segments[0] += event.delta;
    // }
    
	if (segment) {
		segment.point += event.delta;
		path.smooth();
		
// 		for(var i = 0; i < path.segments.length; i++){
// 	        console.log("point ",i,' ', path.segments[i]);
// 	    }
	}
	
// 	console.log(path);
// 	console.log("x: ", segment.point.x, " y: ", segment.point.y );
    // console.log(segment);
// 	else if (path) {
// 		path.position += event.delta;
// 	}
}
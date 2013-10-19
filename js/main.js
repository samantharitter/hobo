
var cvs;
var ctx;

var cvsLeft;
var cvsTop;

var symbols = [];

var sounds = [];

// a symbol = {
//     name: 'name',
//     story: 'id',
//     coordinates: [ [0, 1], [0, 3] ]
//     }

// takes a set of coordinates of the form
// [ [x, y], [x, y] ]
// and draws a polygon using them.
// for now, fills it in black.
function drawPolygon(coordinates) {

	ctx.beginPath();
	ctx.moveTo(coordinates[0][0], coordinates[0][1]);

	for (var i = 1; i < coordinates.length; i++) {
		ctx.lineTo(coordinates[i][0], coordinates[i][1]);
	}

	ctx.closePath();
	ctx.fillStyle = "#e9e9e9";
	ctx.fill();
	ctx.strokeStyle = "#000000";
	ctx.stroke();
}

function loadSounds() {
	for (var i = 0; i < 8; i++) {
		var path = "audio/n" + i + ".wav";
		var sound = new Audio(path);
		sounds.push(sound);
	}
}

function setup() {
	cvs = document.getElementById("buttonsCanvas");
	ctx = cvs.getContext("2d");

	cvsLeft = cvs.offsetLeft;
	cvsTop = cvs.offsetTop;
	console.log(cvsTop);
	
	loadSounds();
	generateDummyShapes();

	// draw all the shapes
	for (var i = 0; i < symbols.length; i++) {
		drawPolygon(symbols[i]["coordinates"]);
	}

	// set up the listener
	$("#buttonsCanvas").click( function(e) {
			console.log("click at: " + e.pageX + ", " + e.pageY);
			testClick(e);
		});	
}

//+ thank you to Jonas Raoni Soares Silva
//@ adapted from http://jsfromhell.com/math/is-point-in-poly [rev. #0]
function isPointInPoly(poly, pt){
	for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
		((poly[i][1] <= pt[1] && pt[1] < poly[j][1]) || (poly[j][1] <= pt[1] && pt[1] < poly[i][1]))
			&& (pt[0] < (poly[j][0] - poly[i][0]) * (pt[1] - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0])
			&& (c = !c);
	return c;
}

function testClick(e) {

	// TODO: move the click, by canvas offset
	var clickPt = [ e.pageX - cvsLeft, e.pageY - cvsTop ];

	// is click in any polygon?
	for (var i = 0; i < symbols.length; i++) {
		if (isPointInPoly(symbols[i].coordinates, clickPt)) {
			// if yes, play that polygon's sound
			console.log("within");
			var n = symbols[i]["story"];
			sounds[n].volume = 0.5;
			sounds[n].play();			
		}
	}
}

function generateDummyShapes() {
	// generate some square buttons, for testing
	var shape1 = { name : "shape1", 
				  story: "1",
				  coordinates: [ [10, 10], [60, 10], [60, 60], [10, 60], [10, 10] ]
	};

	var shape2 = { name : "shape2", 
				  story: "2",
				  coordinates: [ [100, 100], [160, 100], [160, 160], [100, 160], [100, 100] ]
	};

	var shape3 = { name : "shape3", 
				  story: "3",
				  coordinates: [ [310, 310], [360, 310], [360, 360], [310, 360], [310, 310] ]
	};								 

	symbols.push(shape1);
	symbols.push(shape2);
	symbols.push(shape3);
}
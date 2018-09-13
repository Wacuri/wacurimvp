
// WARINING: THIS IS DUPLICATED!!
    // Our basic design is to make sure that two sqares fit in
    // the view port (not counting the header), arranged either
    // vertically for portrait mode or horiontally for landscape.
export function setSizes() {
	var fs = document.getElementById("flex-squares-main");	
	var w = window.innerWidth;
	var h = window.innerHeight;
	// TODO: this should actually be pulled from the header height
	var headerHeight = 100;
	var h = h - headerHeight;

	var mi = Math.min(w,h);
	// now a fourth of this minimum is our basic size...
	var mi_half = mi / 2;

	// video-square0 is the Thumbnail
	// video-square4 is the empty one
	var s0 = document.getElementById("video-square0");
	var s1 = document.getElementById("video-square1");
	var s2 = document.getElementById("video-square2");
	var s3 = document.getElementById("video-square3");
	var s4 = document.getElementById("video-square4");    

	s0.style.height = mi_half*2+"px";
	s0.style.width = mi_half*2+"px";
	
	s1.style.height = mi_half+"px";
	s2.style.height = mi_half+"px";
	s3.style.height = mi_half+"px";
	s4.style.height = mi_half+"px";    


	s1.style.width = mi_half+"px";
	s2.style.width = mi_half+"px";
	s3.style.width = mi_half+"px";
	s4.style.width = mi_half+"px";
	console.log("mi_half " ,mi_half);
    }




    // Our basic design is to make sure that two sqares fit in
    // the view port (not counting the header), arranged either
    // vertically for portrait mode or horiontally for landscape.
export function setSizes() {
    var fs = document.getElementById("flex-squares-main");

    var tb_and_h = document.getElementById("topbar_and_header");

    var debug = 0;
    
	var w = window.innerWidth;
    var h = window.innerHeight;
    if (debug) console.log(w,h);
	// TODO: this should actually be pulled from the header height
    var headerHeight = tb_and_h.offsetHeight;
    var h = h - headerHeight;

    // one square width...
    var osw = Math.min(Math.max(w,h)/2,Math.min(w,h));

    if (debug) console.log(osw);
    
    var osw_h = osw/2;

    // The square frame
    var sf = document.getElementById("bigsquares");
    sf.style.display = "flex";
    sf.style.flexFlow = (w >= h) ? "row wrap" : "column wrap";
    if (debug) console.log("flex flow",sf.style.flexFlow);
    
    var square2 = document.getElementById("secondsquare");
    square2.style.width = osw+"px";
    square2.style.maxWidth = osw+"px";    

	// video-square0 is the Thumbnail
	// video-square4 is the empty one
	var s0 = document.getElementById("video-square0");
	var s1 = document.getElementById("video-square1");
	var s2 = document.getElementById("video-square2");
	var s3 = document.getElementById("video-square3");
	var s4 = document.getElementById("video-square4");    

	s0.style.height = osw+"px";
	s0.style.width = osw+"px";
	
	s1.style.height = osw_h+"px";
	s2.style.height = osw_h+"px";
	s3.style.height = osw_h+"px";
	s4.style.height = osw_h+"px";    


	s1.style.width = osw_h+"px";
	s2.style.width = osw_h+"px";
	s3.style.width = osw_h+"px";
    s4.style.width = osw_h+"px";
    
    var tb = document.getElementById("titlebar");
    tb.style.maxWidth = osw*2+"px";

    }



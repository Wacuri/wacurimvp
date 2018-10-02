// utility.js -- This is needed to do some reposition in javascript
// Copyright (C) 2018 Robert L. Read <read.robert@gmail.com>

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.


export var ONE_SQUARE_WIDTH = 0;
export var LANDSCAPE_NOT_PORTRAIT = true;
    // Our basic design is to make sure that two sqares fit in
    // the view port (not counting the header), arranged either
    // vertically for portrait mode or horiontally for landscape.
export function setSizes() {
    
    var tb_and_h = document.getElementById("topbar_and_header");
    if (!tb_and_h) { // if we can't find an element, we are on the wrong page
	return;
    }
    

    var debug = 0;
    
	var w = window.innerWidth;
    var h = window.innerHeight;
	// TODO: this should actually be pulled from the header height
    var headerHeight = tb_and_h.offsetHeight;
    var h = h - headerHeight;

    // one square width...
    var osw = Math.min(Math.max(w,h)/2,Math.min(w,h));

    var LANDSCAPE_NOT_PORTRAIT = w > h;
    ONE_SQUARE_WIDTH = osw;

    if (debug) {
	console.log("w, h", w, h);
	console.log(osw);
        console.log("landscape_not_portrati",LANDSCAPE_NOT_PORTRAIT);
    }
    
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
	var jt = document.getElementById("journey-timeline0");        

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

    // This is fragile and stupid, i need to do better.
    jt.style.width = (osw/2)+"px";

    
    var tb = document.getElementById("titlebar");

    console.log("landsacpeNotPortrait",LANDSCAPE_NOT_PORTRAIT);
    tb.style.maxWidth = ((LANDSCAPE_NOT_PORTRAIT ) ? osw*2 : osw)+"px";

    }



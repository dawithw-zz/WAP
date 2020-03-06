(function(){
	"use strict";
	
	let textarea;
	let checkbox;
	let button;
	let timerId;
	let switchOn = false;

	function alertBox() {
		alert("Hello, world!");
	}

	function biggerText() {
		let size = window.getComputedStyle(textarea).getPropertyValue("font-size");
		textarea.style.fontSize = parseInt(size)+2+"px";
	}

	function funkyStyle() {
		if(checkbox.checked) 
		{
			textarea.style.fontWeight="bold";
			textarea.style.color="green";
			textarea.style.textDecoration="underline";
			document.body.style.backgroundImage = "url('http://www.cs.washington.edu/education/courses/190m/CurrentQtr/labs/6/hundred-dollar-bill.jpg')";
			document.body.style.backgroundRepeat = "repeat";
		} else {
			textarea.style.fontWeight="unset";
			textarea.style.color="unset";
			textarea.style.textDecoration="unset";
			document.body.style.backgroundImage = "unset";
		}
		
	}

	function click() {
		if (switchOn){
			clearInterval(timerId);
			switchOn = false;	
		}
		else {
			timerId = setInterval(biggerText, 500);
			switchOn = true;
		}			
	}

	window.onload = function() {
		textarea = document.getElementById("textarea");
		checkbox = document.getElementById("checkbox");
		button = document.getElementById("button");

		checkbox.onchange=funkyStyle;
		button.onclick = click;
	}

})();

 
	




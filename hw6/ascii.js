(function() {
    "use strict";

    // font map
    const fontSize = {
        Tiny : "7pt",
        Small : "10pt",
        Medium : "12pt",
        Large : "16pt",
        "Extra Large" : "24pt",
        XXL : "32pt"
    };

    let textbox = document.getElementById("textbox");
    let startButton = document.getElementById("start");
    let stopButton = document.getElementById("stop");
    let animationList = document.getElementById("animation-list");
    let sizeList = document.getElementById("size");
    let turboCheckBox = document.getElementById("checkbox");

    let frameTime = 250;
    let memory = "";
    let currentFrame = 0;
    let timerID = null;


    function start() {
        startButton.disabled = animationList.disabled = true;
        stopButton.disabled = false;
        memory = textbox.value;     // save initial text
        animate();
    }

    function stop() {
        stopButton.disabled = true;
        startButton.disabled = animationList.disabled = false;
        
        stopAnimation();
        currentFrame = 0;
        // return the inital text
        if (memory) { 
            textbox.value = memory;
            memory = "";
        }
    }

    function selectAnimation() {
        let animationSelections = animationList.getElementsByTagName("option");
        for(const selection of animationSelections) {
            if (selection.selected) {
                let selectedAnimation = selection.innerHTML;
                textbox.value = ANIMATIONS[selectedAnimation];
                return;
            }
        }
    }

    function selectSize() {
        let sizeSelections = sizeList.getElementsByTagName("option");
        for(let selection of sizeSelections) {
            if (selection.selected) {
                let size = selection.innerHTML;
                textbox.style.fontSize = fontSize[size];
            }   
        }
    }

    function turboMode() {
        // set frame rate
        if (turboCheckBox.checked) {
            frameTime = 50;
        } else {
            frameTime = 250;
        }
        
        if (timerID) {
            // if timerID is set, there must be an animation in progress
            stopAnimation();
            animate();
        }
    }

    function animate() {
        timerID = setInterval(displayFrame,frameTime);
    }

    function stopAnimation() {
        clearInterval(timerID);
        timerID = null;
    }

    function displayFrame() {
        let animation = memory.split("=====\n");
        textbox.value = animation[currentFrame++];
        if (currentFrame == animation.length)
            currentFrame = 0;
    }

    // Assign handlers to DOM elements and set default state
    function init(){
        textbox = document.getElementById("textbox");
        startButton = document.getElementById("start");
        stopButton = document.getElementById("stop");
        animationList = document.getElementById("animation-list");
        sizeList = document.getElementById("size");
        turboCheckBox = document.getElementById("checkbox");

        stopButton.disabled = true;
        startButton.onclick = start;
        stopButton.onclick = stop;
        animationList.onchange = selectAnimation;
        sizeList.onchange = selectSize;
        turboCheckBox.onchange = turboMode;
    }

    window.onload = init;

})();
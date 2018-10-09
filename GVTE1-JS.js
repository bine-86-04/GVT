"use strict";

var requestID = undefined;
var startTime = undefined;
var startBtn,
    nextStepBtn,
    resetBtn,
    elem;
var divRuns;

document.addEventListener('DOMContentLoaded', function () {
    // markup is on the page
    //adding keyevent-listener to document
    document.addEventListener("keydown", keyPressed);
    //defining method that is executed everytime an key-Pressed event ist fired
    startBtn = document.getElementById('loopBtn');
    nextStepBtn = document.getElementById('stepBtn');
    resetBtn = document.getElementById('resetBtn');
    elem = document.getElementById("anim");
    divRuns = document.getElementById("isRunning");

    resetBtn.addEventListener('click', function () {
        spriteanimation.stopAnimation();
        startTime = undefined;
    });

    nextStepBtn.addEventListener('click', function () {
        divRuns.setAttribute("data-step", "true");
        spriteanimation.star();
        spriteanimation.stopAnimation();
    });

});
var running = false;
// var canvas = document.getElementById("canvas");
// var ctx = canvas.getContext("experimental-webgl");

function keyPressed(evt) {
    //if key "L" is presseg, let slider look previous image
    if (evt.keyCode == "76") {
        slider.stepLeft();
    } else if (evt.keyCode == "82") { //if key "R" is presseg, let slider look next image
        slider.stepRight();
    } else if (evt.keyCode == "65") {
        // alert("a gedrückt!")
        spriteanimation.init();
        spriteanimation.gameLoop(running);
    }

}

var slider = (function () {
    var count = 0;
    var defaultFilename = "kiwi-1.png";
    var filePrefix = "kiwi-";
    var fileType = ".png";
    var reset = true;


    function init(_val) {
        loadImage(defaultFilename, _val);
    }

    function stepRight() {
        var next = increase(1);
        if (next > 35) {
            // override method to continue loop
            increase = createCounter(0.00);
            next = increase(1);
        }
        var nextFile = filePrefix + next + fileType;
        loadImage(nextFile, next)
    }

    function stepLeft() {
        var prev = increase(-1);
        var prevFile;
        if (prev < 1) {
            // override method to continue loop
            increase = createCounter(36.00);
            prev = increase(-1);
        }
        prevFile = filePrefix + prev + fileType;
        loadImage(prevFile, prev)
    }


    function createCounter(initvalue) {
        if (initvalue !== 'undefined') {
            var count = initvalue;
        } else {
            var count = 0;
        }
        return function (neg) {
            if (neg < 0) {
                count = count + neg;
                return count;
            } else {
                return count += 1;
            }
        };
    }


    // replaces the src-attribute of the img, with id="imagesgohere",
    function loadImage(filename, index) {
        var imageObj = new Image();
        imageObj.onload = function () {
            var img = document.getElementById("imagesgohere");
            img.setAttribute('src', this.src);
        };
        imageObj.src = "data/" + filename;
    }

    var increase = createCounter(1, 0);
    //interface
    return {
        //public methods
        init: init,
        stepRight: stepRight,
        stepLeft: stepLeft,
    };
}());

var spriteanimation = (function () {
    var star,
        starImage,
        canvas;


    function init(_val) {
        // Get canvas
        canvas = document.getElementById("spriteanimtaion");
        canvas.width = 110;
        canvas.height = 100;
        // Create sprite sheet
        starImage = new Image();

        // Create sprite
        star = sprite({
            context: canvas.getContext("2d"),
            width: 1220,
            height: 150,
            image: starImage,
            numberOfFrames: 11,
            ticksPerFrame: 0
        });
        if (divRuns.getAttribute("data-step") == "false") {

            // Load sprite sheet
            starImage.addEventListener("load", gameLoop);
        }
        starImage.src = "data/sprite_star_small.png";

    }

    function gameLoop() {
        star.update();
        star.render();
        requestID = window.requestAnimationFrame(gameLoop, starImage);

    }

    function getStar() {
        // Create sprite sheet
        if (!star) {
            divRuns.setAttribute("data-step", "true");
            init()
        }

        // Create sprite
        star.ticksPerFrame = 0;

        // Load sprite sheet
        star.update();
        star.render();
    }

    function animate() {
        star.update();
        star.render();
        requestID = requestAnimationFrame(animate, starImage);
    }

    function stopAnimation() {
        if (requestID) {
            cancelAnimationFrame(requestID);
            requestID = undefined;
        }
        starImage.style.left = "0px";
        star.frameIndex = 0;
        star.tickCount = 0;
    }

    function sprite(options) {
        var that = {},
            frameIndex = 0,
            tickCount = 0,
            ticksPerFrame = options.ticksPerFrame || 0,
            numberOfFrames = options.numberOfFrames || 1;

        that.context = options.context;
        that.width = options.width;
        that.height = options.height;
        that.image = options.image;

        that.update = function () {

            tickCount += 1;

            if (tickCount > ticksPerFrame) {

                tickCount = 0;

                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };

        that.render = function () {

            // Clear the canvas
            that.context.clearRect(0, 0, that.width, that.height);

            // Draw the animation
            that.context.drawImage(
                that.image,
                frameIndex * that.width / numberOfFrames,
                0,
                that.width / numberOfFrames,
                that.height,
                0,
                0,
                that.width / numberOfFrames,
                that.height);
        };

        return that;
    }


    return {
        //public methods
        init: init,
        gameLoop: gameLoop,
        animate: animate,
        stopAnimation: stopAnimation,
        star: getStar
    };
}());




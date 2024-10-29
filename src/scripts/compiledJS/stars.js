"use strict";
//* Fetch canvas and set up the init sizes
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//! Arbitruary variables instead of repeating canvas.height or .width when needed
const ch = canvas.height;
const cv = canvas.width;
//* we create a star class, which includes all the information and functions needed for the stars to be created and move around.
class Star {
    constructor() {
        this.x = Math.random() * cv;
        this.y = Math.random() * ch;
        this.size = Math.random() * 1.5 + 0.5;
        this.speed = Math.random() * 0.5 + 0.2;
        this.direction = Math.random() * Math.PI * 2;
        //* Assign colors
        this.color = this.getRanCol();
        this.currentCol = "white";
        this.targetCol = this.color;
        this.fadeAmt = 0.02; // * The speed for the fading
    }
    getRanCol() {
        const colors = ["pink", "purple", "white"];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    //* this will reset the star to have random properties
    //* This may also seem counter intuitive but we have a reset method so we can reset when stars go to the edge. 
    //* Else the the canvas will just be blank at some point.
    reset() {
        this.x = Math.random() * cv;
        this.y = Math.random() * ch;
        this.size = Math.random() * 1.5 + 0.5;
        this.speed = Math.random() * 0.5 + 0.2;
        this.direction = Math.random() * Math.PI * 2;
        this.color = this.getRanCol();
        this.currentCol = "white";
        this.targetCol = this.color;
    }
    //* This will update the stars, yippee
    update() {
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;
        if (this.x < 0 || this.x > cv || this.y < 0 || this.y > ch) {
            this.reset();
        }
        if (Math.random() < 0.05) { //! COOLDOWN SO PERFORMANCE DOESNT DIE
            this.fadeColor();
        }
    }
    fadeColor() {
        let targetRBG;
        if (this.targetCol === "pink") {
            targetRBG = [245, 126, 182];
        }
        else if (this.targetCol === "purple") {
            targetRBG = [128, 0, 128];
        }
        else {
            targetRBG = [255, 255, 255]; //* Stars selected as white will just not change color.
        }
        const currentRGB = this.getRGBCode(this.currentCol);
        const newColor = currentRGB.map((c, i) => {
            return Math.min(c + (targetRBG[i] - c) * this.fadeAmt, 255);
        });
        this.currentCol = `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`;
    }
    getRGBCode(color) {
        const tempCan = document.createElement("canvas");
        const tempCTX = tempCan.getContext("2d");
        tempCTX.fillStyle = color;
        tempCTX.fillRect(0, 0, 1, 1);
        const data = tempCTX.getImageData(0, 0, 1, 1).data;
        return [data[0], data[1], data[2]];
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.currentCol;
        ctx.fill();
    }
}
const stars = Array.from({ length: 350 }, () => new Star()); // * Create the instance of stars inside a star var.
function animate() {
    ctx.clearRect(0, 0, cv, ch);
    stars.forEach((star) => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}
//* Make sure canvas is resized when the window is.
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
//* Animate the damn thing
animate();
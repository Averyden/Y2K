//* Fetch canvas and set up the init sizes
const canvas = document.getElementById("starfield") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

canvas.width = window.innerWidth
canvas.height = window.innerHeight

//! Arbitruary variables instead of repeating canvas.height or .width when needed
const ch = canvas.height
const cv = canvas.width

//* We define the interface which includes the properties for a singular star element.


//* we now implement said interface

class Star {
    //* Define vars
    x: number;
    y: number;
    size: number;
    speed: number;
    direction: number;


    constructor() {
        this.x = Math.random() * cv
        this.y = Math.random() * ch

        this.size = Math.random() * 1.5+0.5
        this.speed = Math.random() * 0.5+0.2

        this.direction = Math.random() * Math.PI * 2
    }


    //* this will reset the star to have random properties
    //* This may also seem counter intuitive but we have a reset method so we can reset when stars go to the edge. 
    //* Else the the canvas will just be blank at some point.
    reset(): void {
        this.x = Math.random() * cv
        this.y = Math.random() * ch

        this.size = Math.random() * 1.5+0.5
        this.speed = Math.random() * 0.5+0.2

        this.direction = Math.random() * Math.PI * 2
    }

    //* This will update the stars, yippee
    update(): void {
        this.x += Math.cos(this.direction) * this.speed
        this.y += Math.sin(this.direction) * this.speed

        if (this.x < 0 || this.x > cv || this.y < 0 || this.y > ch) {
            this.reset()
        }

    }

    draw(): void {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = "white";
        ctx.fill()
    }
}

const stars: Star[] = Array.from({length: 100}, () => new Star()) // * Create the instance of stars inside a star var.

function animate(): void {
    ctx.clearRect(0,0, cv, ch)

    stars.forEach((star) => {
        star.update()
        star.draw()
    })

    requestAnimationFrame(animate)
}

//* Make sure canvas is resized when the window is.
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

//* Animate the damn thing
animate()
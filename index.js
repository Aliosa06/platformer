const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
const gravity = 0.5;

class Sprite {
    constructor({position,imageSrc}){
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
    }

    draw(){
        if(!this.image) return
        c.drawImage(this.image,this.position.x,this.position.y)
    }
    update(){
        this.draw()
    }
}

class Player {
    constructor(position) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 1
        }
        this.height = 100
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x,this.position.y,100,this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if(this.position.y + this.height + this.velocity.y < canvas.height){
            this.velocity.y += gravity
        }else{
            this.velocity.y = 0
        } 
        
    }
}

const player = new Player ({
    x: 0,
    y: 0,
})

const player2 = new Player({
    x: 300,
    y: 50,
})

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "./img/bg.png"
})

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0,0,canvas.width,canvas.height);

    background.update()
    player.update()
    player2.update()

    player.velocity.x = 0
    player2.velocity.x = 0
    if (keys.d.pressed) player.velocity.x = 5
    else if (keys.a.pressed) player.velocity.x = -5
    if (keys.ArrowRight.pressed) player2.velocity.x = 5
    else if (keys.ArrowLeft.pressed) player2.velocity.x = -5
}

const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    }
}

animate()

window.addEventListener('keydown', () =>{
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
        break
        case 'a':
            keys.a.pressed = true
        break
        case 'w':
            player.velocity.y = -20
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
        break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
        break
        case 'ArrowUp':
            player2.velocity.y = -20
        break
    }
})

window.addEventListener('keyup', () =>{
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
        break
        case 'a':
            keys.a.pressed = false
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
        break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
        break
    }
})

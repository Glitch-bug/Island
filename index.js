// todo transform the walk feauture into a sprite method with some variance for mobs
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
var frameCount = 0;
canvas.width =1024;
canvas.height = 576;

var collisionsMap = [];
for (let i=0; i< collisions.length; i+=70){
    collisionsMap.push(collisions.slice(i, i+70));
    
}

const image = new Image()
image.src = './img/Demo Town.png'

const foregroundImage = new Image()
foregroundImage.src = './img/foreGroundObjects.png'

const playerDownImage = new Image();
playerDownImage.src = './img/playerDown.png'

const playerUpImage = new Image();
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image();
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image();
playerRightImage.src = './img/playerRight.png'


const wolfDownImage = new Image();
wolfDownImage.src = './img/wolf/wolfWalkDown.png'

const wolfUpImage = new Image();
wolfUpImage.src = './img/wolf/wolfWalkUp.png';

const wolfLeftImage = new Image();
wolfLeftImage.src = './img/wolf/wolfWalkLeft.png'

const wolfRightImage = new Image();
wolfRightImage.src = './img/wolf/wolfWalkRight.png'

const boundary_ids = [2466, 2470, 2468, 2476, 2486, 2478, 2480];
const boundaries = [];

const offset = {
    x:-975,
    y:-670,
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol !== 0){
            boundaries.push(
                new Boundary ({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    nature: {
                        type: symbol
                    }
                })
            )
        }

    })
})



const player = new Sprite({
    position:{
        x:canvas.width/2 - (192/8), 
        y:canvas.height/2-(68/2),
    },
    image: playerDownImage,
    frames: {
        max:4,
        rate:10
    },
    sprites:{
        up:playerUpImage,
        left:playerLeftImage,
        down:playerDownImage,
        right:playerRightImage,
    }
})

const wolf = new Sprite({
    position:{
        x:canvas.width/2 - (200/8), 
        y:canvas.height/2-(68/2),
    },
    image: wolfUpImage,
    frames: {
        max:3,
        rate:20
    },
    sprites:{
        up:wolfUpImage,
        left:wolfLeftImage,
        down:wolfDownImage,
        right:wolfRightImage,
    }
})

const wolf_mob = new Mob({
    sprite:wolf
})
const background = new Sprite({
    position: {
        x:offset.x,
        y:offset.y,
    },
    image: image
})

const foreground = new Sprite({
    position: {
        x:offset.x,
        y:offset.y,
    },
    image: foregroundImage
})

const keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    s: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
}

const immovables = [background, ...boundaries, foreground, wolf]
function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x +   rectangle1.width >= rectangle2.position.x  && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y +   rectangle1.height >= rectangle2.position.y
    )
}

function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach(boundary => {
        boundary.draw()
        
    })
    player.draw();
    wolf.draw();
    
    foreground.draw();
     
    let moving = true;
    player.moving = false;
    if (keys.w.pressed && lastKey === 'w') {
        player.moving = true;
        player.image =player.sprites.up;
        for (let i =0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1:player, 
                    rectangle2:{
                        ...boundary, 
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    }
                })
            ){
                moving = false;
                break
            }
        }

        if (moving){
            immovables.forEach((movable) => {
                movable.position.y += 3;
            })
        }
    }

    else if (keys.s.pressed && lastKey === 's') {
        player.moving = true;
        player.image =player.sprites.down;
        for (let i =0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1:player, 
                    rectangle2:{
                        ...boundary, 
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 3
                        }
                    }
                })
            ){
                moving = false;
                break
            }
        }

        if (moving){
            immovables.forEach((movable)=> {
                movable.position.y -= 3;
            })
        }
    }

    else if (keys.a.pressed && lastKey === 'a') {
        player.moving = true;
        player.image =player.sprites.left;
        for (let i =0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1:player, 
                    rectangle2:{
                        ...boundary, 
                        position: {
                            x: boundary.position.x+3,
                            y: boundary.position.y 
                        }
                    }
                })
            ){
                moving = false;
                break
            }
        }

        if(moving){
            immovables.forEach((movable)=> {
                movable.position.x += 3;
            })
        }
    }

    else if (keys.d.pressed && lastKey === 'd'){ 
        player.moving = true;
        player.image = player.sprites.right;
        for (let i =0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1:player, 
                    rectangle2:{
                        ...boundary, 
                        position:{
                            x: boundary.position.x - 3,
                            y: boundary.position.y 
                        }
                    }
                })
            ){
                moving = false;
                break
            }
        }

        if(moving){
            immovables.forEach((movable)=> {
            movable.position.x -= 3;
            })
        }
    }
   // Wolf wandering code 
    if (frameCount % 35 == 0){
        wolf_mob.direction = Math.floor(Math.random() * 5);
        console.log(wolf_mob.direction)
    }
    if (wolf_mob.direction == 0){
        for (let i =0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1:wolf_mob.sprite, 
                    rectangle2:{
                        ...boundary, 
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 2
                        }
                    }
                })
            ){break}
        }
        wolf_mob.sprite.image = wolf_mob.sprite.sprites.up;
        wolf_mob.walk(wolf_mob.direction);
    } 
    else if (wolf_mob.direction == 1){
        for (let i =0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1:wolf_mob.sprite, 
                    rectangle2:{
                        ...boundary, 
                        position: {
                            x: boundary.position.x + 2,
                            y: boundary.position.y 
                        }
                    }
                })
            ){break}
        }
        wolf_mob.sprite.image = wolf_mob.sprite.sprites.left;
        wolf_mob.walk(wolf_mob.direction);
        
    }
    else if (wolf_mob.direction == 2){
        for (let i =0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1:wolf_mob.sprite, 
                    rectangle2:{
                        ...boundary, 
                        position: {
                            x: boundary.position.x ,
                            y: boundary.position.y - 2
                        }
                    }
                })
            ){break}
        }
        wolf_mob.sprite.image = wolf_mob.sprite.sprites.down;
        wolf_mob.walk(wolf_mob.direction);
    }
    else if (wolf_mob.direction == 3 ) {
        for (let i =0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1:wolf_mob.sprite, 
                    rectangle2:{
                        ...boundary, 
                        position: {
                            x: boundary.position.x - 2,
                            y: boundary.position.y 
                        }
                    }
                })
            ){break}
        }
        wolf_mob.sprite.image = wolf_mob.sprite.sprites.right;
        wolf_mob.walk(wolf_mob.direction);
    }else {
        wolf_mob.sprite.moving = false;
    }
frameCount++;
}
animate();

let lastKey = '';
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true;
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false;
            break
        case 'a':
            keys.a.pressed = false;
            break
        case 's':
            keys.s.pressed = false;
            break
        case 'd':
            keys.d.pressed = false;
            break
    }
})
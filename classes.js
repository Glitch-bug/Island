function rectangularCollisions({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x +   rectangle1.width >= rectangle2.position.x  && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y +   rectangle1.height >= rectangle2.position.y
    )
}

function checkCollision(char, direction, speed, objects){
    if (direction == 0){
        for (let i =0; i < objects.length; i++) {
            const object = objects[i];
            if (
                rectangularCollisions({
                    rectangle1:char, 
                    rectangle2:{
                        ...object, 
                        position: {
                            x: object.position.x,
                            y: object.position.y + speed
                        }
                    }
                })
            ){
                return false;
            }
        }
    }
    else if (direction == 1){
        for (let i =0; i < objects.length; i++) {
            const object = objects[i];
            if (
                rectangularCollisions({
                    rectangle1:char, 
                    rectangle2:{
                        ...object, 
                        position: {
                            x: object.position.x + speed,
                            y: object.position.y 
                        }
                    }
                })
            ){
                return false;
            }
        }
    }
    else if (direction == 2){
        for (let i =0; i < objects.length; i++) {
            const object = objects[i];
            if (
                rectangularCollisions({
                    rectangle1:char, 
                    rectangle2:{
                        ...object, 
                        position: {
                            x: object.position.x,
                            y: object.position.y - speed 
                        }
                    }
                })
            ){
                return false;
            }
        }
    }
    if (direction == 3){
        for (let i =0; i < objects.length; i++) {
            const object = objects[i];
            if (
                rectangularCollisions({
                    rectangle1:char, 
                    rectangle2:{
                        ...object, 
                        position: {
                            x: object.position.x - speed,
                            y: object.position.y 
                        }
                    }
                })
            ){
                return false;
            }
        }
    }
    
    return true;
}


class Sprite {
    constructor({position, velocity, image, frames={max:1, rate:10}, sprites=[]}) {
        this.position = position
        this.image = image
        this.frames = {...frames, val:0, elapse:0}

        this.image.onload = () => {
            this.width = this.image.width/this.frames.max;
            this.height = this.image.height
        }
        this.moving = false
        this.sprites = sprites
    }

    draw() {
        this.width = this.image.width/this.frames.max;
        this.height = this.image.height;
        c.drawImage(
            this.image, 
            this.frames.val * this.width,
            0,
            this.image.width/this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width/this.frames.max,
            this.image.height,
            
        );
        
        if (!this.moving) return
        if (this.frames.max > 1) {
            this.frames.elapse++
        }

        if (this.frames.elapse % this.frames.rate == 0){
            if (this.frames.val < this.frames.max-1) this.frames.val++
            else this.frames.val = 0;
        }

    }
}

class Boundary{
    static width = 48;
    static height = 48;
    constructor({position, nature, bool}) {
        this.position = position;
        this.nature = nature;
        this.bool = bool;
        if (this.bool){
            this.ids = [2466, 2470, 2468, 2476, 2486, 2478, 2480];
        }
        else {
            this.ids = [1026, 1030, 1028, 1036, 1046, 1038, 1040]
        }
        switch(this.nature.type) {
            case this.ids[0]:
                this.width = 48;
                this.height = 48;
                break;
            case this.ids[1]:
                this.width = 48;
                this.height = 16;
                break;
            case this.ids[2]:
                this.width = 48;
                this.height = 16;
                this.position.y += 16;
                break
            case this.ids[3]:
                this.width = 48;
                this.height = 16;
                this.position.y += 32;
                break
            case this.ids[4]:
                this.width = 16;
                this.height = 48;
                break
            case this.ids[5]:
                this.width = 16;
                this.height = 48;
                this.position.x += 16;
                break
            case this.ids[6]:
                this.width = 16;
                this.height = 48;
                this.position.x += 32;
                break
            default:
                this.width = 48;
                this.height = 48;
          } 
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0.0)' 
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Mob{
    constructor({sprite}){
        this.sprite = sprite;
        this.health = 100;
        this.direction = 0;
        this.speed = 2;
    };
    
    walk(direction, objects) {
        this.sprite.moving = true;
        var moving = true;
        direction = direction;
        // c.fillStyle = 'rgba(255, 210, 0, 0.0)' ;
        // c.fillRect(this.sprite.position.x, this.sprite.position.y, this.sprite.width, this.sprite.height);
        switch(direction) {
            case 0:
                moving = checkCollision(this.sprite, direction, this.speed, objects);
                if (moving){
                    this.sprite.position.y -= this.speed;
                    break;
                }
            case 1:
                moving = checkCollision(this.sprite, direction, this.speed, objects);
                if (moving){
                    this.sprite.position.x -= this.speed;
                    break;
                }
            case 2:
                moving = checkCollision(this.sprite, direction, this.speed, objects);
                if (moving){
                    this.sprite.position.y += this.speed;
                    break;
                }
            case 3:
                moving = checkCollision(this.sprite, direction, this.speed, objects);
                if (moving){
                    this.sprite.position.x += this.speed;
                    break;
                }
        }
    }
    
}
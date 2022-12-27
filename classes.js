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
    constructor({position, nature}) {
        this.position = position
        this.nature = nature
        switch(this.nature.type) {
            case 2466:
                this.width = 48;
                this.height = 48;
                break;
            case 2470:
                this.width = 48;
                this.height = 16;
                break;
            case 2468:
                this.width = 48;
                this.height = 16;
                this.position.y += 16;
                break
            case 2476:
                this.width = 48;
                this.height = 16;
                this.position.y += 32;
                break
            case 2486:
                this.width = 16;
                this.height = 48;
                break
            case 2478:
                this.width = 16;
                this.height = 48;
                this.position.x += 16;
                break
            case 2480:
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
        c.fillStyle = 'rgba(255, 0, 0, 0)' 
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Mob{
    constructor({sprite}){
        this.sprite = sprite;
        this.health = 100;
        this.direction = 0;
    };
    
    walk(direction) {
        this.sprite.moving = true;
        direction = direction;
        switch(direction) {
            case 0:
                this.sprite.position.y -= 2;
                break;
            case 1:
                this.sprite.position.x -= 2;
                break;
            case 2:
                this.sprite.position.y += 2;
                break;
            case 3:
                this.sprite.position.x += 2;
                break;

        }
        // c.fillStyle = 'rgba(255, 210, 0, 0.6)' ;
        // c.fillRect(this.sprite.position.x, this.sprite.position.y, this.sprite.width, this.sprite.height);
    }
    
}
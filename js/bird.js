class Bird {
    constructor(){
        this.x = 150;
        this.y = 200;
        this.vy = 0;
        this.width = 20;
        this.height = 20;
        this.weight = 1;
        
        this.up_down_offset = 2;
    }
    
    update() 
    {
        this.IsOnGround();
        this.IsAtCeilling();
        this.flap();
    }

    draw(){

        ctx.drawImage(player, this.x - 15, this.y- 15, 35, 35);

        ctx.fillStyle = 'red';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    flap(){
        if(space_pressed == true && this.y > this.height * this.up_down_offset)
            this.vy -= 2;
    }

    IsOnGround()
    {
        let curve = Math.sin(angle) * 20;

        if(this.y > canvas.height - (this.height * this.up_down_offset) + curve) // If a bird is on ground
        {
            this.y = canvas.height - (this.height * this.up_down_offset) + curve;
            this.vy = 0;
        }

        else // If a bird is not on ground
        {
            this.vy += this.weight;
            this.vy *= 0.9;
            this.y += this.vy;
        }
    }

    IsAtCeilling()
    {
        if(this.y < 0 + this.height) // If a bird is at the ceil
        {
            this.y = 0 + this.height;
            this.vy = 0;
        }
    }

}

let bird = new Bird();
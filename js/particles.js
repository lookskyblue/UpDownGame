const particles_array = [];

class Particle
{
    constructor(){
        this.x = bird.x;
        this.y = bird.y;
        this.size = Math.random() * 8 + 2;
        this.speed_y = (Math.random() * 1) - 0.5;
        this.color = 'hsla(' + hue + ', 100%, 80%, 0.7)';
    }

    update(){
        this.x -= game_speed;
        this.y += this.speed_y;
    }

    draw() {
        ctx.fillStyle = this.color;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
    function handleParticles()
    {
        particles_array.unshift(new Particle); // 배열의 맨 앞에 값을 추가한다. <-> push

        for(let i = 0; i < particles_array.length; i++)
        {
            particles_array[i].update();
            particles_array[i].draw();
        }

        if(particles_array.length > 200)
        {
            for(let i = 0; i < 20; i++)
            {
                particles_array.pop(particles_array[i]); // <-> shift 
            }
        }
    }

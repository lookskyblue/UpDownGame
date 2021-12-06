
const obstacles_distance = 200;
const obstacles_array = [];

class Obstacle {
    constructor() {
        this.top = (Math.random() * canvas.height / 3.5) + 10;
        this.bottom = (Math.random() * canvas.width / 3.5) + 10;
        this.x = canvas.width;
        this.width = 20;
        this.color = 'hsla(' + hue + ', 100%, 80%, 1';
        this.counted = false;
    }

    draw()
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
    }

    update()
    {
        this.x -=game_speed;

        if(this.counted == false && this.x < bird.x) // Check Through Obstacles
        {
            score++;
            this.counted = true;
            
            if(game_speed < MAX_GAME_SPEED && score % 2 == 0)
            game_speed += 0.5;
        }
    }
}

function handleObstacles()
{
    // if(frame % 60 === 0) { // 프레임이 아닌 일정 간격 마다 할 것.
    //     obstacles_array.unshift(new Obstacle);
    // }

    if(obstacles_array.length == 0) {
        obstacles_array.unshift(new Obstacle);
    }

    else
    {
        if((canvas.width - obstacles_array[0].x + obstacles_array[0].width) >= obstacles_distance)
        {
            obstacles_array.unshift(new Obstacle);
        }
    }

    for(let i = 0; i < obstacles_array.length; i++)
    {
        obstacles_array[i].update();
        obstacles_array[i].draw();
    }

    if(obstacles_array.length > 20) {
        obstacles_array.pop(obstacles_array[0]);
    }
}
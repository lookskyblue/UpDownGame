const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width=800;
canvas.height=400;

let space_pressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let game_speed = 2;
const MAX_GAME_SPEED = 15;

function animate()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
    //ctx.fillRect(10, tmp, 50, 50);

    handleObstacles();
    bird.update();
    bird.draw();

    drawScore();

    if(handleCollisions() == true) 
    { 
        return;
    }
    
    handleParticles();

    requestAnimationFrame(animate);
    angle+=0.12;
    hue++;
    frame++;
}
animate();

window.addEventListener('keydown', function(e){
    if(e.code === 'Space') space_pressed = true;
})

window.addEventListener('keyup', function(e){
    if(e.code === 'Space') space_pressed =false;
})

const bang = new Image();
bang.src = "C:/Users/Xrisp/Desktop/Xrisp/WooSung/WooSungPersonal/웹게임테스트/updown_game/js/bang.png";
//bang.src = "bang.png";

function handleCollisions(){
    for(let i = 0; i < obstacles_array.length; i++) {
        if((bird.x < obstacles_array[i].x + obstacles_array[i].width &&
            bird.x + bird.width > obstacles_array[i].x) &&
            ((bird.y < 0 + obstacles_array[i].top && bird.y + bird.height > 0) ||
            (bird.y > canvas.height - obstacles_array[i].bottom && 
                bird.y + bird.height < canvas.height)))
                {
                    ctx.drawImage(bang, bird.x - 15, bird.y- 15, 70, 70);
                    
                    ctx.font = "25px Verdana";
                    ctx.fillStyle = 'black';
                    ctx.fillText('Game Over!', canvas.width/2, canvas.height/2 - 10);
                    
                    ctx.font = "25px Verdana";
                    ctx.fillStyle = 'black';
                    ctx.fillText('Your Score: ' + score, canvas.width/2, canvas.height/2 + 20);
                    
                    
                    return true;
                }
    }
}

function drawScore()
{
    ctx.fillStyle = 'black';
    ctx.textAlign = "center";
    ctx.font = '25px Verdana';
    //ctx.strokeText(score, canvas.width/2, canvas.height-10);
    ctx.fillText(score, canvas.width/2, canvas.height-10);
}

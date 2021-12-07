const bang = new Image();
bang.src = "C:/Users/Xrisp/Desktop/Xrisp/WooSung/WooSungPersonal/웹게임테스트/updown_game/image_sources/bang.png";

const player = new Image();
player.src = "C:/Users/Xrisp/Desktop/Xrisp/WooSung/WooSungPersonal/웹게임테스트/updown_game/image_sources/player2.png"

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width=800;
canvas.height=400;

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
canvas2.width = 400;
canvas2.height = 50;

let is_player_dead = false;
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
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    handleObstacles();

    bird.update();
    bird.draw();

    drawScore();
    drawBestScore();

    if(handleCollisions() == true) 
    { 
        is_player_dead = true;

        drawReplayText();
        saveScore(score);

        return;
    }

    handleParticles();

    requestAnimationFrame(animate);
    angle+=0.12;
    hue++;
    frame++;
}
animate();
drawBackground();

function drawBackground()
{
    document.body.style.backgroundColor = '#1b1b1b';

    const white_background = document.getElementById('white_background');
    const wb_ctx = white_background.getContext('2d');
    white_background.width = 800;
    white_background.height = 400;

    wb_ctx.clearRect(0, 0, white_background.width, white_background.height);
    
    wb_ctx.fillStyle = 'white';
    wb_ctx.fillRect(0, 0, white_background.width, white_background.height);
}

window.addEventListener('keydown', function(e){
    if(e.code == 'KeyR' && is_player_dead == true) 
    {
        restartGame();   
    }
})

window.addEventListener('keydown', function(e){
    if(e.code === 'Space') space_pressed = true;
})

window.addEventListener('keyup', function(e){
    if(e.code === 'Space') space_pressed =false;
})

function drawBestScore()
{
    ctx2.font = "25px Verdana";
    ctx2.fillStyle = 'white';
    ctx2.textAlign = 'center';
    ctx2.fillText('Best Score: ' + loadScore(), canvas2.width/2, canvas2.height-10);
}

function drawReplayText()
{
    ctx.font = "bold 100px Verdana";
    ctx.fillStyle = 'black';
    ctx.fillText('Again: R', canvas.width / 2, canvas.height / 2 - 30);
}

function restartGame()
{
    // Main Settings.
    is_player_dead = false;
    space_pressed = false;
    angle = 0;
    hue = 0;
    frame = 0;
    score = 0;
    game_speed = 2;

    // Bird Settings.
    bird = new Bird();

    // Obstacles Settings.
    obstacles_array.length = 0;
    // Particles Settings.
    particles_array.length = 0;


    requestAnimationFrame(animate);
}

function handleCollisions(){
    for(let i = 0; i < obstacles_array.length; i++) {
        if((bird.x < obstacles_array[i].x + obstacles_array[i].width &&
            bird.x + bird.width > obstacles_array[i].x) &&
            ((bird.y < 0 + obstacles_array[i].top && bird.y + bird.height > 0) ||
            (bird.y > canvas.height - obstacles_array[i].bottom && 
                bird.y + bird.height < canvas.height)))
                {
                    ctx.drawImage(bang, bird.x - 15, bird.y- 15, 70, 70);
                    
                    ctx.font = "20px Verdana";
                    ctx.fillStyle = 'black';
                    ctx.fillText('Game Over!', canvas.width/2, canvas.height/2 + 30);
                    
                    ctx.font = "20px Verdana";
                    ctx.fillStyle = 'black';
                    ctx.fillText('Your Score: ' + score, canvas.width/2, canvas.height/2 + 60);
                    
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

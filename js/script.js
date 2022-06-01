const menu = document.querySelector('.game-board');
var bestScore = "000000";
var nowScore = "000000";
const soundStart = new Audio('sounds/start.wav');

function start() {

    soundStart.play();

    menu.style.cursor = 'none'
    nowScore = "000000";

    menu.innerHTML = `<img src="images/clouds.png" class="clouds">     
                      <img src="images/pipe.png" class="pipe">
                      <img src="images/mario.gif" class="mario">
                      <p class="score">HI ${bestScore} - ${nowScore}</p>`;

    const mario = document.querySelector('img.mario');
    const pipe = document.querySelector('.pipe');
    const clods = document.querySelector('.clouds'); 
    const score = document.querySelector('.score'); 
    const soundJump = new Audio('sounds/jump.wav');
    const soundGameOver = new Audio('sounds/game-over.wav');
    const soundGame = new Audio('sounds/game-music.wav');
    
    const jump = () => {
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ''); 
                    
            if(marioPosition == 0) {
                soundJump.play();
                mario.classList.add('jump');
                    
                setTimeout(() => {
                     mario.classList.remove('jump');
                }, 500)
        }
                       
    }

    const loop = setInterval(() => {

        soundGame.play();
        score.innerHTML = `HI ${bestScore} - ${nowScore}`
        
        const pipePosition = pipe.offsetLeft;
        const clodsPosition = clods.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ''); 

        if (nowScore < 999999) {
            nowScore++;
        }
        
        if (bestScore < nowScore) {
            bestScore = nowScore;
            if (bestScore < 10) {
                bestScore = "00000" + nowScore;
            } else if (bestScore < 100) {
                bestScore = "0000" + nowScore;
            } else if (bestScore < 1000) {
                bestScore = "000" + nowScore;
            } else if (bestScore < 10000) {
                bestScore = "00" + nowScore;
            } else if (bestScore < 100000) {
                bestScore = "0" + nowScore;
            } else if (bestScore > 1000000) {
                bestScore = "999999";
            }
        }

        if (nowScore < 10) {
            nowScore = "00000" + nowScore;
        } else if (nowScore < 100) {
            nowScore = "0000" + nowScore;
        } else if (nowScore < 1000) {
            nowScore = "000" + nowScore;
        } else if (nowScore < 10000) {
            nowScore = "00" + nowScore;
        } else if (nowScore < 100000) {
            nowScore = "0" + nowScore;
        } else if (nowScore > 1000000) {
            nowScore = "999999";
        }

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    
            menu.style.cursor = 'default'

            soundGame.pause();
            soundGameOver.play();
    
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;
    
            mario.style.animation = 'none';
            mario.style.animation = 'game-over 5s';
            mario.style.bottom = `${marioPosition}px`;
            mario.style.position = `fixed`;
    
            clods.style.animation = 'none';
            clods.style.left = `${clodsPosition}px`;
    
            mario.src = 'images/game-over.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';
    
            window.document.removeEventListener('keydown', jump);
            window.document.removeEventListener('touchstart', jump);

            setTimeout(() => {
                menu.innerHTML = `<img src="images/clouds.png" class="clouds">     
                                  <img src="images/pipe.png" class="pipe">
                                  <p class="score">HI ${bestScore} - ${nowScore}</p>
                                  
                                  <div class="menu">
                                    <img src="images/logo.png" alt="">
                                    <div class="btn" onclick="start()"><h1>Start</h1></div>
                                    <a href="https://github.com/VillyRosa" target="_blank"><p>&copy;VillyRosa</p></a>
                                  </div>`          
           }, 3000)
            
           clearInterval(loop);
        }
    
    }, 10)

    window.document.addEventListener('keydown', jump);
    window.document.addEventListener('touchstart', jump);
}
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clods = document.querySelector('.clouds');
const soundJump = new Audio('sounds/jump.wav')
const soundGameOver = new Audio('sounds/game-over.wav')
const soundGame = new Audio('sounds/game-music.wav')

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
    
    const pipePosition = pipe.offsetLeft;
    const clodsPosition = clods.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ''); 

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

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

        clearInterval(loop);

    }

}, 10)

window.document.addEventListener('keydown', jump);
window.document.addEventListener('touchstart', jump);
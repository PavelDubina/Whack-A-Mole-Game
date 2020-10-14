const holes  = document.querySelectorAll('.hole'),
    scoreBoard = document.querySelector('.score'),
    moles = document.querySelectorAll('.mole'),
    rbtn = document.querySelector('.removeBtn'),
    btn = document.querySelector('.startBtn');
    let highScoreBoard = document.querySelector('.high-score');
    let lastHole;
    let timeUp = false;
    let score = 0,
        prevScore = 0;

    function randomTime(quickTime){
     quickTime = score>=18?[100, 400]:score>=15?[200, 400]:score>=12?[600, 800]:score>=8?[800, 100]:[100, 1300];
        return Math.round(Math.random() * (quickTime[1] - quickTime[0]) + quickTime[0]);
    }

    function randomHole(holes){
        const idx = Math.floor(Math.random() * holes.length),
            hole = holes[idx];
        if(lastHole === hole) return randomHole(holes);
        lastHole = hole;
        return hole;
    }
function peep(){
   const time = randomTime(),
   hole = randomHole(holes);
   hole.classList.add('up')
   setTimeout(() => {
       hole.classList.remove('up')
       if(score > prevScore){
        localStorage.setItem('score', score);
        prevScore = score;
        loadScore()
       }      
       if(!timeUp) peep();   
   }, time);
}
function startGame(){
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    prevScore = localStorage.getItem('score');
    peep();
    setTimeout(() => {
        timeUp = true;        
    }, 15000);
}

function scoreUp(e){
    if(!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}
function removeScore(){
    timeUp = true;
    localStorage.setItem('score', 0);
    highScoreBoard.textContent =  'High score: 0';
}
function loadScore() {
    highScoreBoard.textContent = `High score: ${localStorage.getItem('score')?localStorage.getItem('score'): 0}`
}
btn.addEventListener('click', startGame);
rbtn.addEventListener('click',removeScore)
moles.forEach(mole => mole.addEventListener('click', scoreUp));
loadScore();

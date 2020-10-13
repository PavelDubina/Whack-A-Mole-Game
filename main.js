const holes  = document.querySelectorAll('.hole'),
    scoreBoard = document.querySelector('.score'),
    moles = document.querySelectorAll('.moles');
    let lastHole;
    let timeUp = false;

    function randomTime(min, max){
        return Math.round(Math.random() * (max - min) + min);
    }

    function randomHole(holes){
        const idx = Math.floor(Math.random() * holes.length),
            hole = holes[idx];
        if(lastHole === hole) return randomHole(holes);
        lastHole = hole;
        return hole;
    }
function peep(){
   const time = randomTime(200, 1000),
   hole = randomHole(holes);
   hole.classList.add('up')
   setTimeout(() => {
       hole.classList.remove('up')
       peep()
   }, time);
}

//объявление переменных
const holes  = document.querySelectorAll('.hole'),
    scoreBoard = document.querySelector('.score'),
    moles = document.querySelectorAll('.mole'),
    rbtn = document.querySelector('.removeBtn'),
    btn = document.querySelector('.startBtn');
    let gameStop = 15000;  //время игры
    let highScoreBoard = document.querySelector('.high-score');
        levelBoard = document.querySelector('.speed');
    let lv;
    let lastHole,   //предыдущая яма
        timeUp = false, //закончено ли время
        score = 0,
        prevScore = 0,
        // уровни времени
        timeLv = {
            lv1: [800, 1000],
            lv2: [600, 800],
            lv3: [400, 600],
            lv4: [200, 400],
            lv5: [100,200]
        },
        //очки на уровне
        scoreLv = {
            lv1: 1,
            lv2: 5,
            lv3: 10,
            lv4: 15,
            lv5: 18
        };
        //случайное время из уровня времени
    function randomTime(quickTime){ 
        quickTime = score>=scoreLv.lv5?timeLv.lv5:score>=scoreLv.lv4?timeLv.lv4:score>=scoreLv.lv3?timeLv.lv3:score>=scoreLv.lv2?timeLv.lv2:timeLv.lv1;
        return Math.round(Math.random() * (quickTime[1] - quickTime[0]) + quickTime[0]);   
    } 
    //рассчёт случайной ямы
    function randomHole(holes){
        const idx = Math.floor(Math.random() * holes.length),
            hole = holes[idx];
        if(lastHole === hole) return randomHole(holes);         // проверка на равенство ямы предыдущей
        lastHole = hole;
        return hole;
    }
    //показ бобра
function peep(){  
   const time = randomTime(), //получение случайного времени
   hole = randomHole(holes);    // получение случайной ямы
   hole.classList.add('up');    //добавление класса бобру
   setTimeout(() => {
       hole.classList.remove('up')  
       if(score > prevScore){   //сравнение текущего количества очков с максимальным
        localStorage.setItem('score', score);   //запись текущих очков в localStorage
        prevScore = score;  //текущие очки -> предыдущие 
        loadScore(); // обновление high score
       }      
       if(!timeUp) peep();   //прекращение показа бобра
   }, time);
}
function startGame(){       //старт игры
    scoreBoard.textContent = 0;     
    timeUp = false; 
    score = 0;  
    prevScore = localStorage.getItem('score');  //получение максимального количества очков в предыдущие очки
    peep(); //запуск ф-ции показа бобра
    setTimeout(() => { 
        timeUp = true;  //через указанное время закончить игру
        levelBoard.style.opacity = '0';        
    }, gameStop);
}

function scoreUp(e){
    if(!e.isTrusted) return;    //если нажатие на обра не инициализированно пользователем, выход
    score++;     //увеличеие кол-ва очков
    if(score === scoreLv.lv5){
        levelBoard.textContent = 'Speed up to: 5x';
        levelBoard.style.opacity = '1';
    } else if (score === scoreLv.lv4){
        levelBoard.textContent = 'Speed up to: 4x';
        levelBoard.style.opacity = '1';
    } else if (score === scoreLv.lv3){                      //показ повышения уровня сложности                            
        levelBoard.textContent = 'Speed up to: 3x';
        levelBoard.style.opacity = '1';
    } else if (score === scoreLv.lv2){
        levelBoard.textContent = 'Speed up to: 2x';
        levelBoard.style.opacity = '1';
    } else {
        levelBoard.style.opacity = '0';
    }
    this.parentNode.classList.remove('up');             // после клика удаление класса у бобра
    scoreBoard.textContent = score;             //запись в текущие очки
}
function removeScore(){
    timeUp = true;
    localStorage.setItem('score', 0);      
    updateScore();                     //работа кнопки очистки макс-го результата
}
function updateScore(score = 0){
    highScoreBoard.textContent =  `High score: ${score}`;
}
function loadScore() {   
    const localScore = localStorage.getItem('score')?localStorage.getItem('score'): 0   //показ максимального результата
    updateScore(localScore);
}
btn.addEventListener('click', startGame);
rbtn.addEventListener('click',removeScore)
moles.forEach(mole => mole.addEventListener('click', scoreUp));
loadScore();
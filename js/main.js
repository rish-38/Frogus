//animation variables 
const frogStudy = "./media/frog-study.json";
const frogDying = "./media/frog-dying.json";
let title = document.querySelector('header');
let circle = document.querySelector('.circle');
let minute = document.querySelector('.min');
let second = document.querySelector('.sec');
let footer = document.querySelector('footer');
let allButton = document.querySelectorAll('button');
let frame = document.querySelector('.frame');

//svg animation
function loadSVG(path) {
    if (window.currentAnimation) {
        window.currentAnimation.destroy();
    }
    window.currentAnimation = lottie.loadAnimation({
        container: frame,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: path,
    })
}
//main transition
let tl = gsap.timeline()
tl.from(title, {
    y: 200,
    scale: 2,
    duration: 2,
    ease: 'power1.out'
}).from(circle, {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    // delay: 1,
    ease: 'power1.out'
},).from(minute, {
    x: -50,
    opacity: 0,
    duration: 1,
    ease: 'power1.out'
}, "<").from(second, {
    x: 50,
    opacity: 0,
    duration: 1,
    ease: 'power1.out'
}, "<").from(footer, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power1.out'
}, "<");

// button transition will happen when active class is add in the buttons
function setButtonActive(activeBtn) {
    allButton.forEach(buttons => {
        buttons.classList.remove('active');
    });
    activeBtn.classList.add('active');
}

//svg frog animation will happen here.
loadSVG(frogStudy);


//logical variables make it functional.
let finised = new Audio('./media/frog.mp3')
let warning = document.querySelector('.warning');
let play = document.querySelector('.playBtn');
let pause = document.querySelector('.stopBtn');
let restart = document.querySelector('.resetBtn');
let clock = document.querySelector('.clock');
let minVal, secVal, setTimer; // intializing before
let isClick = false;  //to check if the button is clicked or not

//start button working
play.addEventListener('click', () => {
    console.log('play is clicked');
    setButtonActive(play);
    if (isClick === false) {
        startTimer();
    }
})
//pause button working
pause.addEventListener('click', () => {
    console.log('play is clicked');
    setButtonActive(pause);
    pauseTimer();
})
//restrat button working
restart.addEventListener('click', () => {
    console.log('play is clicked');
    setButtonActive(restart);
    resetTimer();
})
//to display value in the counter
let formatTime = (min, sec) => {
    return min.toString().padStart(2, '0') + ":" + sec.toString().padStart(2, '0');
};
//function start
function startTimer() {

    const storedMin = parseInt(minute.value) || 0;
    const storedSec = parseInt(second.value) || 0;

    if (storedMin > 60 || storedSec > 60) {
        warning.innerHTML = '<strong> Warning: </strong>Minutes and seconds must be 60 or less.';
    }
    else if(storedMin < 0 || storedSec < 0){
        warning.innerHTML = '<strong> Warning: </strong>Minutes and seconds cannot be negative values.';
    }
    else if(storedMin == 0 & storedSec == 0){
        warning.innerHTML = '<strong> Warning: </strong>Time duration must be greater than zero.';
    }
    else {
        
        warning.innerHTML = ' ';
        if (setTimer === undefined) {
            minVal = storedMin;
            secVal = storedSec;
        }

        console.log(minVal, secVal);

        if (setTimer) {
            clearInterval(setTimer);
        }
        setTimer = setInterval(() => {
            if (minVal > 0 || secVal > 0) {
                if (secVal === 0) {
                    minVal--;
                    secVal = 59;
                } else {
                    secVal--;
                }
                clock.innerHTML = formatTime(minVal, secVal);
            }
            else {
                clearInterval(setTimer);
                clock.innerHTML = "finised";
                loadSVG(frogDying);
                finised.play();
            }
        }, 1000);
        isClick = true;
    }
}

// pause function
function pauseTimer() {
    clearInterval(setTimer);
    // setTimer = undefined;
    isClick = false;
}

//start function
function resetTimer() {
    clearInterval(setTimer);
    setTimer = undefined;
    minVal = parseInt(minute.value) || 0;
    secVal = parseInt(second.value) || 0;
    isClick = false;
    clock.innerHTML = formatTime(minVal, secVal);
    loadSVG(frogStudy);
}






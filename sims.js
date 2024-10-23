let gameseq=[];
let userseq=[];

let btns=["yellow","red","purple","green"];

let started=false;

let level=0;
let highscore=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress", function () {
    if(started==false) {
        console.log("game is started");
        started=true;

        levelup();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userseq=[];
    level++;
    h2.innerText=`level ${level}`;

    let ranidx= Math.floor(Math.random()*3);
    let rancol=btns[ranidx];
    let randbtn=document.querySelector(`.${rancol}`);
    gameseq.push(rancol);
    console.log(gameseq);
    gameflash(randbtn);
}

function checkans(idx) {
    if(userseq[idx]===gameseq[idx]) {
        if(userseq.length==gameseq.length) {
            setTimeout(() => {
                levelup();
            }, 250);

            if(level > highscore) {
                highscore=level;
                h3.innerHTML=(`High Score <br> ${highscore}`);
            }
        }
    }else {
        h2.innerHTML=`<b>Game over!</b> your score was <b>${level}</b><br>press any key to start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout( function () {
            document.querySelector("body").style.backgroundColor="white";
        }, 150);

        started=false;
        gameseq=[];
        userseq=[];
        level=0;
    }
}

function btnpress() {
    console.log(this);
    let btn=this;
    userflash(btn);

    usercolor=btn.getAttribute('id');
    userseq.push(usercolor);

    checkans(userseq.length-1);
}

let allbtns=document.querySelectorAll('.btn');
for(btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

let body=document.querySelector("body");
let h3=document.createElement("h3");
h3.classList.add("highscore");
body.append(h3);    
// h3.innerHTML=(`High Score <br> ${level}`);

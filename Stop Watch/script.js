document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("start").onclick = function() {
        document.getElementById("start").textContent = document.getElementById("start").textContent === "START" ? "STOP" : "START";
        document.getElementById("reset").textContent = document.getElementById("reset").textContent === "RESET" ? "LAP" : "RESET";

        if (document.getElementById("start").textContent === "STOP") {
            startTimer();
        }


    };
    document.getElementById("reset").onclick = function(){
        if(document.getElementById("reset").textContent === "RESET"){
            document.getElementById("hr").textContent = "00";
            document.getElementById("min").textContent = "00";
            document.getElementById("sec").textContent = "00";
            document.getElementById("ms").textContent = "00";
            ms = 0;
            sec = 0;
            min = 0;
            hr  = 0;
            phr = 0;
            pmin = 0;
            psec = 0;
            pms = 0;
            startTimer();
            document.getElementById("laps").innerHTML = ''; 
        }
        else{
            addLapTime();
        }

    }

});

let ms = 0;
let sec = 0;
let min = 0;
let hr  = 0;

function startTimer(){
    // document.getElementById("start").textContent;
    if (document.getElementById("start").textContent === "STOP") {
        ms += 1;
        if (ms >= 100) {
            ms = 0;
            sec += 1;
        }
        if (sec >= 60) {
            sec = 0;
            min += 1;
        }
        if (min >= 60) {
            min = 0;
            hr += 1;
        }
        
        document.getElementById("ms").textContent = ms.toString().padStart(2,'0');
        document.getElementById("sec").textContent = sec.toString().padStart(2,'0');
        document.getElementById("min").textContent = min.toString().padStart(2,'0');
        document.getElementById("hr").textContent = hr.toString().padStart(2,'0');

        setTimeout(startTimer, 9); // approximately 10 milliseconds for each update
    }
}

let phr = 0;
let pmin = 0;
let psec = 0;
let pms = 0;

function addLapTime() {
    const laps = document.getElementById("laps");
    const lapTime = document.createElement("div");

    let lapMs = ms - pms;
    let lapSec = sec - psec;
    let lapMin = min - pmin;
    let lapHr = hr - phr;

    if (lapMs < 0) {
        lapMs += 100;
        lapSec -= 1;
    }
    if (lapSec < 0) {
        lapSec += 60;
        lapMin -= 1;
    }
    if (lapMin < 0) {
        lapMin += 60;
        lapHr -= 1;
    }

    pms = ms;
    psec = sec;
    pmin = min;
    phr = hr;

    lapTime.textContent = `${lapHr.toString().padStart(2,'0')}:${lapMin.toString().padStart(2,'0')}:${lapSec.toString().padStart(2,'0')}:${lapMs.toString().padStart(2,'0')}`;
    laps.appendChild(lapTime);
}
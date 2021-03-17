var playing = false;
var score;
var setTimer;
var correctAns;
document.getElementById("startreset").onclick = function () {
   if (playing == true) {
      location.reload();
   } else {
      playing = true;
      score = 0;
      document.getElementById("scoreValue").innerHTML = score;
      document.getElementById("startreset").innerHTML = "Reset Game";
      document.querySelector(".time").style.visibility = "visible";

      // for counter timer

      setTimer = 60;
      document.getElementById("timer").innerHTML = setTimer;
      Hide(".gameOver");
      setCounter();
      generateQA();
   }
};


// for click result button to check answer

for (var i = 1; i < 5; i++) {
   document.getElementById("res" + i).onclick = function () {
      if (playing == true) {
         if (this.innerHTML == correctAns) {
            //  increase score by 1
            score++;
            document.getElementById("scoreValue").innerHTML = score;
            Hide("#wrong");
            Show("#correct");
            setTimeout(() => {
               Hide("#correct");
            }, 1000);

            // Generate a new question

            generateQA();
         } else {
            Hide("#correct");
            Show("#wrong");
            setTimeout(() => {
               Hide("#wrong");
            }, 1000);
         }
      }
   };
}

function setCounter() {
   var action = setInterval(() => {
      setTimer -= 1;
      document.getElementById("timer").innerHTML = setTimer;
      if (setTimer == 0) {
         document.getElementById("startreset").innerHTML = "Start Game";
         stopCounter(action);
         Show(".gameOver");
         document.getElementById("totalscoreValue").innerHTML = score;
         Hide(".time");
         Hide("correct");
         Hide("wrong");
         playing = false;
      }
   }, 1000);
}

function stopCounter(interval) {
   clearInterval(interval);
}
function Hide(Id) {
   document.querySelector(Id).style.display = "none";
}
function Show(Id) {
   document.querySelector(Id).style.display = "block";
}

function generateQA() {
   var x = 1 + Math.round(9 * Math.random());
   var y = 1 + Math.round(9 * Math.random());
   correctAns = x * y;
   document.querySelector(".question").innerHTML = x + "x" + y;
   var correctpostition = 1 + Math.round(3 * Math.random());
   document.querySelector("#res" + correctpostition).innerHTML = correctAns;

   var answers = [correctAns];
   for (i = 1; i < 5; i++) {
      if (correctpostition != i) {
         var wrongAns;
         do {
            wrongAns =
               (1 + Math.round(9 * Math.random())) *
               (1 + Math.round(9 * Math.random()));
         } while (answers.indexOf(wrongAns) > -1);

         document.querySelector("#res" + i).innerHTML = wrongAns;
         answers.push(wrongAns);
      }
   }
}

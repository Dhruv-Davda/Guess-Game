document.addEventListener("DOMContentLoaded", function () {
  let randnum = parseInt(Math.random() * 100 + 1);
console.log(randnum);
  const submit = document.querySelector(`#submit`);
  const userInput = document.querySelector("#guessField");
  const guessSlot = document.querySelector(".guesses");
  const remaining = document.querySelector(".lastresult");
  const lowOrHi = document.querySelector(".lowOrHi");
  const startOver = document.querySelector(".results");

  const p = document.createElement(`p`);

  let prevguess = [];
  let numguess = 1;

  let playgame = true;

  if (playgame) {
    submit.addEventListener("click", function (e) {
     e.preventDefault(); // so that page refresh hote hi auto submit na hojae as it is a form.
        // console.log("sdf")
        const guessinput = parseInt(userInput.value);
        console.log(guessinput)
        validateGuess(guessinput);
    });
   }

  function validateGuess(guessinput) {
    if (isNaN(guessinput)) {
      alert(`Please Enter a Valid Input !`);
    } else if (guessinput < 1) {
      alert(`Please Enter a Input greater than 1 !`);
    } else if (guessinput > 100) {
      alert(`Please Enter a input less than 100 !`);
    } else {
      prevguess.push(guessinput);
      
      checkguess(guessinput);
     
      


      if (numguess >= 10) {
        // checkguess(guessinput);
        displayGuess(guessinput);
        if (guessinput === randnum) {
        displaymsg(`You guessed it Right`);
        endGame(); }
        else if ( numguess==10 && guessinput!=randnum) {
        displaymsg(`Game Over ! The Random number was ${randnum}`);
        endGame(); }
        }
        else {
        checkguess(guessinput);
        displayGuess(guessinput);
      }
    }
  }

   function checkguess(guessinput) {
   if (guessinput === randnum) {
   displaymsg(`You guessed it Right`);
   endGame();
    } else if (guessinput < randnum) {
      displaymsg(`Number is too Low !`);
    } else if (guessinput > randnum) {
      displaymsg(`Number is too High !`);
    }
    return 0;
  }

  function displayGuess(guessinput) {
    userInput.value = "";
    guessSlot.innerHTML += `${guessinput}, `;
    numguess++;
    remaining.innerHTML = `${11 - numguess}`;
  }

  function displaymsg(message) {
    // all dom manipulation
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
  }

  function endGame() {
    userInput.value = "";
    userInput.setAttribute("disabled", "");
    p.classList.add("button");
    p.innerHTML = `<h2 id="newGame"> Start New Game</h2>`;
    startOver.appendChild(p);
    playgame = false;
    newGame();
  }

  function newGame() {
    const newGameButton = document.querySelector("#newGame");
    newGameButton.addEventListener("click", function (e) {
      randnum = parseInt(Math.random() * 100 + 1);
      prevguess = [];
      numguess = 1;
      guessSlot.innerHTML = "";
      remaining.innerHTML = `${11 - numguess} `;
      userInput.removeAttribute("disabled");
      startOver.removeChild(p);
      playgame = true;
    });
  }
});

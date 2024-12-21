let userScore=0;
let compScore=0;

let choices=document.querySelectorAll(".choice");
let msg=document.querySelector("#msg");
let yourScore=document.querySelector("#userScore");
let computerScore=document.querySelector("#computerScore");

let genCompChoice = () => {
    const options=["rock", "paper", "scissors"];
    const randIdx=Math.floor(Math.random()*3);
    return options[randIdx];
}

let drawGame = (userChoice) => {
    msg.innerText=`Game is draw by choosing ${userChoice}`;
    msg.style.backgroundColor="rgb(0, 0, 59)";
}

let showWinner = (userWin, userChoice, compChoice) => {
    if(userWin){
        userScore+=1;
        yourScore.innerText=userScore;
        msg.innerText=`You win!! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor="green";
    }
    else{
        compScore+=1;
        computerScore.innerText=compScore;
        msg.innerText=`You lose!! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor="red";
    }
}

let playGame = (userChoice) => {
    const compChoice=genCompChoice();

    if(userChoice === compChoice){
        drawGame(userChoice);
    }

    else{
        let userWin=true;
        if(userChoice==="rock"){

            userWin = compChoice==="paper" ? false : true ;

        }
        else if(userChoice==="paper"){

            userWin = compChoice==="scissors" ? false : true ;

        }
        else{

            userWin = compChoice==="rock" ? false : true;

        }
        showWinner(userWin, userChoice, compChoice);
    }

}

choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        let userChoice=choice.getAttribute("id");
        playGame(userChoice)
    })
})















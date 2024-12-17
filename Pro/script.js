let boxes=document.querySelectorAll(".box");
let resetButton=document.querySelector("#resetButton");
let newGameButton=document.querySelector("#newGameButton");
let msgDisplay=document.querySelector("#msgDisplay");
let msg=document.querySelector("#msg");
let container=document.querySelector(".container");

let turnO=true;
let cnt=0;

let winningCases=[[0,1,2],[0,4,8],[0,3,6],
[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];

for(box of boxes){
    box.addEventListener("click",(event)=>{
        if(turnO===true){
            event.target.innerText="O";//event.target is box only which we passed as paramenter in callback function
            turnO=false;
        }
        else{
            event.target.innerText="X";
            turnO=true;
        }

        event.target.disabled=true;
        cnt+=1;
        console.log(cnt);

        if(cnt===9 && !wonMatch()){
            newGameButton.classList.remove('hide');
            msgDisplay.classList.remove('hide');

            msg.innerHTML=`DRAW!!!`
            cnt=0;
            disableBoxes();
        }

        if(wonMatch()){
            newGameButton.classList.remove('hide');
            msgDisplay.classList.remove('hide');

            if(turnO==false){
                msg.innerText=`Winner of the game is O`;
            }

            else{
                msg.innerText=`Winner of the game is X`;
            }

            disableBoxes();

        }

    });
}

let disableBoxes = ()=>{
    boxes.forEach((box)=>{
        box.disabled=true;
    })    
}


let wonMatch = () => {
    
    for(win of winningCases){
        let pos1=boxes[win[0]].innerText;
        let pos2=boxes[win[1]].innerText;
        let pos3=boxes[win[2]].innerText;

        if(pos1===pos2 && pos2===pos3 && pos1!=""){
            return true;
        }
    }

    return false;

}


resetButton.addEventListener("click",()=>{
    boxes.forEach((box)=>{
        box.innerText="";
    })
    newGameButton.classList.add('hide');
    msgDisplay.classList.add('hide');
})

newGameButton.addEventListener("click",()=>{
    boxes.forEach((box)=>{
        box.innerText="";
        box.disabled=false;
    })
    newGameButton.classList.add('hide');
    msgDisplay.classList.add('hide');
})















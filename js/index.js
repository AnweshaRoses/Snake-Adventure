let inputDir={x:0,y:0};
let foodSound=new Audio('foodeat.wav');
let gameOver= new Audio('dead.wav');
let moveSound= new Audio('move.wav');
let speed =9;
let score=0;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
];
food={x:6,y:7};

//Game FUnction

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    // console.log(ctime);
    gameEngine();

}

function isCollide(snake){
    //If you bump into yourself
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y ){
            return true;
        }
    }
    //if you bumb into the wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0  ){
        return true;
    }

}

function gameEngine(){
    //Updating snake array and food
    if(isCollide(snakeArr)){
        gameOver.play();
        inputDir={x:0,y:0};
        alert("Game Over. Press any key to play again");
        snakeArr=[{x:13,y:15}];
        score=0;
        scoreBox.innerHTML="Score:"+score;

    }
    //If you have eaten the food increment the score and regenerate food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        score=score+1;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            HiscoreBox.innerHTML="High-Score: "+hiscoreval;
        }
        scoreBox.innerHTML="Score:"+score;
        foodSound.play();
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y });
        let a=3;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //Moving the snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }

    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

    //DIsplay snake array and food
    //display snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        snakeElement.classList.add('head');
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');

        }
        board.appendChild(snakeElement);

    })
    //Display food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}





//Main Logic Start here
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    HiscoreBox.innerHTML="High-Score: "+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}; //Start game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            inputDir.x= 0;
            inputDir.y= -1;
            break;
            
            case "ArrowDown":
            inputDir.x= 0;
            inputDir.y= 1;
            break;
            
            case "ArrowLeft":
                inputDir.x= -1;
                inputDir.y=0 ;
                break;
                
            case "ArrowRight":
                inputDir.x= 1;
                inputDir.y= 0;
                break;
            default:
                break;
    }
});
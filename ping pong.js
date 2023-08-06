const gameBoard=document.querySelector("#gameboard")
const ctx=gameBoard.getContext("2d")
const p1_score=document.querySelector("#player1")
const p2_score=document.querySelector("#player2")
const reset=document.getElementById("reset")
// console.log(ctx)
// console.log(p1_score)
// console.log(p2_score)
// console.log(reset)
// console.log(gameBoard)

const gameWidth=gameBoard.width, gameHeight=gameBoard.height;

const Board_Background="aqua";
const p2_color="darkBlue"
const p1_color="red"
const paddleBorder="black"
const ball_color="yellow"
const ball_border="black"
const ball_radius=15
const player_speed=50
let ball_speed=1
let interval_id;
let ball_X=gameWidth/2, ball_y=gameHeight/2
let ball_direction_x=0 , ball_direction_y=0
let p1_score_text=0 , p2_score_text=0;
let paddle1={
    width:25,
    height:100,
    x:0, 
    y:0
}
let paddle2={
    width:25,
    height:100,
    x:gameWidth-25, 
    y:gameHeight-100
}
window.addEventListener("keydown",change_direction)
reset.addEventListener("click",reset_function)
gameStart()


function gameStart(){
   display_ball();
   nextTick();

}

function nextTick()
{
    interval_id=setTimeout(()=>{
        clear_board();
        draw_paddles();
        move_ball();
        create_ball(ball_X,ball_y);
        checkCollsiion();
        nextTick();
        
            },10)
}

function clear_board(){
    ctx.fillStyle=Board_Background;
    ctx.fillRect(0,0,gameWidth,gameHeight);

}

function draw_paddles(){
    ctx.strokeStyle=paddleBorder;
out(paddle1,p1_color)
out(paddle2,p2_color)

    function out(paddle,color){
    
    ctx.fillStyle=color;
    ctx.fillRect(paddle.x,paddle.y,paddle.width,paddle.height)
    ctx.strokeRect(paddle.x,paddle.y,paddle.width,paddle.height)

    }
}
function change_direction(event){
    const key_pressed=event.keyCode;
   // console.log(key_pressed)
    let p2_up=87, p2_down=83;
    let p1_up=38,p1_down=40;

    switch(key_pressed){
        case (p1_up):
            if(paddle1.y>0){
                paddle1.y-=player_speed;
            }
            break;
        case (p1_down):
                if(paddle1.y<(gameHeight- paddle1.height)){
                paddle1.y+=player_speed
            }
            break;
        case(p2_up):
        if(paddle2.y>0){
            paddle2.y-=player_speed;
        }
        break;
        case (p2_down):
            if(paddle2.y<(gameHeight- paddle2.height)){
            paddle2.y+=player_speed
        }
        break;
    }

}

function create_ball(ball_x,ball_y){
ctx.fillStyle=ball_color;
ctx.strokeStyle=ball_border
ctx.lineWidth=2;
ctx.beginPath();
ctx.arc(ball_x,ball_y,ball_radius,0,2*Math.PI);
ctx.stroke();
ctx.fill()
}

function display_ball(){
ball_speed=2;
if(Math.round(Math.random())==1){
    ball_direction_x=1
}else{
    ball_direction_x=-1
}
if(Math.round(Math.random())==1){
    ball_direction_y=1
}else{
    ball_direction_y=-1
}

ball_X=gameWidth/2
ball_y=gameHeight/2
create_ball(ball_X,ball_y)
}

function move_ball(){
    ball_X+=(ball_speed*ball_direction_x)
    ball_y+=(ball_speed*ball_direction_y)
  //  console.log(ball_X,ball_y)

}

function checkCollsiion(){
    
    if(ball_y < 0 + ball_radius ){
      ball_direction_y*=-1
            }
    
    if(ball_y>500-ball_radius){
        ball_direction_y*=-1
    }
    if(ball_X <=0){
        p2_score_text++;
        update_score();
        display_ball();
        return
    }
    if(ball_X >800){
        p1_score_text++;
        update_score();
        display_ball();
        return
    }
    if(ball_X <=(paddle1.x + paddle1.width + ball_radius)){
        if(ball_y > paddle1.y && ball_y < paddle1.y + paddle1.height){
            ball_X=(paddle1.x+paddle1.width)+ball_radius
            ball_direction_x*=-1
            ball_speed+=1

        }
    }
    if(ball_X >=(paddle2.x-ball_radius)){
        if(ball_y>paddle2.y && ball_y < paddle2.y+paddle2.height){
            ball_X=paddle2.x-ball_radius
            ball_direction_x*=-1
            ball_speed+=1
            
        }
    }


}
function update_score(){
     p1_score.textContent=p1_score_text
p2_score.textContent=p2_score_text
}
function reset_function(){
    clear_board();
    p1_score_text=0;
    p2_score_text=0;
    update_score();
     ball_speed=1
 interval_id;
 ball_X=0, ball_y=0
 ball_direction_x=0 , ball_direction_y=0
 paddle1={
    width:25,
    height:100,
    x:0, 
    y:0
}
paddle2={
    width:25,
    height:100,
    x:gameWidth-25, 
    y:gameHeight-100
}
    clearInterval(interval_id)
   
gameStart()
}




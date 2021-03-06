const myCanvas = document.querySelector('#canvas');
const canvas_width = parseInt(myCanvas.width,10);
const canvas_height = parseInt(myCanvas.height,10);
const ctx = myCanvas.getContext("2d");
const direction = ['left','right','up','down'];

let food = [];
let score = 0;
let game_start = 0 ;

class Snake {

    constructor(snake_skeleton){
        this.snake_skeleton = snake_skeleton;
    }

    static randomPosition(){
        let x_position = Math.floor(Math.random()*(canvas_width-11)+10);
        x_position -= x_position % 5;
        let y_position = Math.floor(Math.random()*(canvas_height-11)+10);
        y_position -= y_position % 5;

        return [x_position,y_position];

    }
    
    static drawSnakeUnit (ctx,x,y,head){
        
        ctx.fillStyle = head === true ? "red" : "gray";
        ctx.fillRect(x,y,5,5);

    }

    static moveSnake(snake_skeleton,direction = snake_skeleton[0][2]){

        // pop last element,add new head as per new calculations

        snake_skeleton.pop();
        snake_skeleton[0][3] = false;

        let x = snake_skeleton[0][0];
        let y = snake_skeleton[0][1];

        x -= direction == 'left' ? 5 : 0;
        x += direction =='right' ? 5 : 0;
        y -= direction == "up" ? 5 : 0 ;
        y += direction == "down" ? 5 : 0 ;

        x = x <= 0 ? x+canvas_width : x;
        x = x >= canvas_width ? 0 : x;
        y = y <= 0 ? y+canvas_height : y ;
        y = y >= canvas_height ? 0 : y ;

        let new_head = [x,y,direction, true]
        snake_skeleton.unshift(new_head);

        return snake_skeleton;

    }

    static startSnake(length){
        
        let [x_position,y_position] = this.randomPosition();
        let init_direction = direction[Math.floor(Math.random()*4)];
        let snake_skeleton = [[x_position,y_position,init_direction,true]]; 

        for (let i = 0 ; i < length-1 ; i++){
            x_position += init_direction == 'left' ? 5 : 0;
            x_position -= init_direction =='right' ? 5 : 0;
            y_position += init_direction == "up" ? 5 : 0 ;
            y_position -= init_direction == "down" ? 5:0;

            snake_skeleton.push([x_position,y_position,init_direction,false]);
        }

        return snake_skeleton;
    }

    static drawSnake(snake_skeleton){

        for(let i = 0; i< snake_skeleton.length;i++){

            this.drawSnakeUnit(ctx,snake_skeleton[i][0],snake_skeleton[i][1],snake_skeleton[i][3]);
        }

    }

    static createFood(ctx,snake_skeleton){

        let [x,y] = this.randomPosition();
        // need to check for snake body

        for (let i of snake_skeleton){
             if (x == i[0] && y == i[1]){
                this.createFood(ctx,snake_skeleton);
            } 
        }
        console.log('food created');
        return [x,y];

    }

}

function drawBackground(){
    ctx.fillStyle = 'tan';
    ctx.fillRect(0,0,myCanvas.width,myCanvas.height);
}

function drawFood(){

    let [x,y] = food;
    ctx.fillStyle = 'green';
    ctx.fillRect(x,y,5,5);

}

function collision (food,snake_skeleton){

    if (food[0] === snake_skeleton[0][0] && food[1] === snake_skeleton[0][1]){
        return true;
    }


}

function selfKill(snake_skeleton){

    let head_x = snake_skeleton[0][0];
    let head_y = snake_skeleton[0][1];
    for (let i =1;i < snake_skeleton.length; i++) {

        if (head_x === snake_skeleton[i][0] && head_y === snake_skeleton[i][1]){
            return true;
        }  
    }

}

function playGame(){
    
    drawBackground();
    drawFood();
    Snake.drawSnake(snake);
    snake = Snake.moveSnake(snake); 
    if (collision(food,snake)){
        console.log('food eaten');
        let last_piece = snake[snake.length -1 ];
        snake.push(last_piece); 
        food =[];
        score += 1;
        console.log(score);
        food = Snake.createFood(ctx,snake);
        document.querySelector('#score').innerHTML = 'Score: ' + score;
    }

    if(selfKill(snake)){
        score =0 ;
        clearInterval(game_start);
        document.querySelector('#game-over').innerHTML = 'Game Over';
    }

}

snake = Snake.startSnake(18);

function startGame(){
    score = 0;
    document.querySelector('#score').innerHTML = 'Score: ' + score;
    game_start = setInterval(playGame,50);
    food = Snake.createFood(ctx,snake);
}



document.addEventListener('keydown',(event) =>{
    const keyName = event.key;
    if(keyName == 'f'){
       food = Snake.createFood(ctx,snake);
       console.log(food);
    }
})



document.addEventListener('DOMContentLoaded',() =>{

    document.addEventListener('keydown',(event) => {
    
        const keyName = event.keyCode;
        if (keyName === 32){
            snake = Snake.startSnake(18);
            clearInterval(game_start);
            startGame ();
        }
    
    } )

    document.addEventListener('keydown',(event) =>{
        const keyName = event.key;
    
        if ((snake[0][2] == 'left' || snake[0][2] == 'right') && (keyName == 'ArrowUp' || keyName == 'ArrowDown')){
            snake[0][2] = keyName == 'ArrowUp' ? 'up': snake[0][2];
            snake[0][2] = keyName == 'ArrowDown' ? 'down': snake[0][2];
        }
    
        if ((snake[0][2] == 'up' || snake[0][2] == 'down') && (keyName == 'ArrowRight' || keyName == 'ArrowLeft')){
            snake[0][2] = keyName == 'ArrowLeft' ? 'left': snake[0][2];
            snake[0][2] = keyName == 'ArrowRight' ? 'right': snake[0][2];
        }
    
    })
})
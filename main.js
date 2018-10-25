const myCanvas = document.querySelector('#canvas');
const canvas_width = parseInt(myCanvas.width,10);
const canvas_height = parseInt(myCanvas.height,10);
const ctx = myCanvas.getContext("2d");
const direction = ['left','right','up','down'];

class Snake {

    constructor(snake_body){
        this.snake_body = snake_body;
    }
    
    static drawSnakeUnit (ctx,x,y,head){
        
        ctx.fillStyle = head === 'Yes' ? "red" : "gray";
        ctx.fillRect(x,y,5,5);

    }

    static moveSnake(snake_skeleton){

        for(let i = 0;i<snake_skeleton.length;i++){
            //if head, keep direction, else copy direction from previous body part, apply calculcation as per direction
         let [x,y,direction, head] = snake_skeleton[i];
           x -= direction == 'left' ? 5 : 0;
           x += direction =='right' ? 5 : 0;
           y -= direction == "up" ? 5 : 0 ;
           y += direction == "down" ? 5 : 0 ;

           direction =  head ? snake_skeleton[i][2]: snake_skeleton[i-1][2]; 

           //manage boundaries;

           x = x <= 0 ? x+canvas_width : x;
           x = x >= canvas_width ? 0 : x;
           y = y <= 0 ? y+canvas_height : y ;
           y = y >= canvas_height ? 0 : y ;

           snake_skeleton[i] = [x,y,direction,head] ;

        }
        return snake_skeleton;

    }

    static startSnake(length){
        
        let x_position = Math.floor(Math.random()*(canvas_width/2-101)+100);
        let y_position = Math.floor(Math.random()*(canvas_height/2-81)+80);
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

}


function drawBackground(){
    ctx.fillStyle = 'tan';
    ctx.fillRect(0,0,myCanvas.width,myCanvas.height)
}

snake = Snake.startSnake(4);
document.addEventListener('click',function(){


    snake = Snake.moveSnake(snake);
    drawBackground();
    Snake.drawSnake(snake);
    console.log(snake[0]);

});

// Snake.moveSnake(snake);

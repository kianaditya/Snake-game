const myCanvas = document.querySelector('#canvas');
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

    static navigate(){

    }

    static startSnake(length){
        
        let x_position = Math.floor(Math.random()*(parseInt(myCanvas.width,10)/2-101)+100);
        let y_position = Math.floor(Math.random()*(parseInt(myCanvas.height,10)/2-81)+80);
        let init_direction = direction[Math.floor(Math.random()*4)];
        let snake_skeleton = [{x: x_position,y: y_position,direction:init_direction,head:'Yes'}];

        for (let i = 0 ; i < length-1 ; i++){
            x_position += init_direction == 'left' ? 5 : 0;
            x_position -= init_direction =='right' ? 5 : 0;
            y_position += init_direction == "up" ? 5 : 0 ;
            y_position -= init_direction == "down" ? 5:0;

            snake_skeleton.push({x: x_position,y: y_position,direction:init_direction,head:'No'});

        }

        return snake_skeleton;
    }

    static drawSnake(snake_skeleton){

        for(let i = 0; i< snake_skeleton.length;i++){

            this.drawSnakeUnit(ctx,Object.values(snake_skeleton[i])[0],Object.values(snake_skeleton[i])[1],Object.values(snake_skeleton[i])[3]);
        }

    }

}

function food(){


}

function navigate (){


}

function drawBackground(){
    ctx.fillStyle = 'tan';
    ctx.fillRect(0,0,myCanvas.width,myCanvas.height)
}

Snake.drawSnake(Snake.startSnake(4));
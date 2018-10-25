const myCanvas = document.querySelector('#canvas');
const ctx = myCanvas.getContext("2d");

class Snake {

    constructor(length,direction){
        this.length = length ;
        this.direction = direction;
    }
    
    static drawSnake (){

    }

    static navigate(){

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


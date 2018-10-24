const myCanvas = document.querySelector('.canvas');
const ctx = myCanvas.getContext('2d');

function drawSnake(ctx,x,y,head = false){

    ctx.fillStyle = head ? "brown" :"black";
    ctx.fillRect(x,y,10,10);;

}


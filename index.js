const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

let circle = function (x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
};
let Ball = function () {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.speed = 0;
    this.size = 10;
};

Ball.prototype.move = function(){
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    //check borders
    if(this.x < 5){
        this.xSpeed += this.speed;
    } else if(this.x > width - 5){
        this.xSpeed -= this.speed;
    }
    if(this.y < 5){
        this.ySpeed += this.speed;
    } else if (this.y > height - 5){
        this.ySpeed -= this.speed;
    }
}
Ball.prototype.draw = function(size){
    circle(this.x, this.y, size, true);
}
Ball.prototype.setDirection = function (speed,direction) {
    if (direction === "up") {
    this.xSpeed = 0;
    this.ySpeed = -speed;
    } else if (direction === "down") {
    this.xSpeed = 0;
    this.ySpeed = speed;
    } else if (direction === "left") {
    this.xSpeed = -speed;
    this.ySpeed = 0;
    } else if (direction === "right") {
    this.xSpeed = speed;
    this.ySpeed = 0;
    } else if (direction === "stop") {
    this.xSpeed = 0;
    this.ySpeed = 0;
    }
};

let ball = new Ball();

let keyActions = {
    32: "stop",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    speeds : {
        49: "1",
        50: "2",
        51: "3",
        52: "4",
        53: "5",
        54: "6",
        55: "7",
        56: "8",
        57: "9",
    },
    changeSpeed :{
        90 : "z",
        88 : "x"
    },
    scale : {
        67 : "c",
        86 : "v"
    }
}


$("body").keydown(event => {
    console.log(event.keyCode);
    const direction = keyActions[event.keyCode];
    const speed = keyActions.speeds[event.keyCode];
    ball.setDirection(ball.speed,direction);
    //set speed
    if(+speed){
        ball.speed = +speed;
    }
    //change speed if need
    if(keyActions.changeSpeed[event.keyCode] == "z"){
        ball.speed -= (ball.speed <= 0 ? 0 : 1);
    } else if (keyActions.changeSpeed[event.keyCode] == "x"){
        ball.speed += (ball.speed < 10 ? 1 : 0);
    }
    //change round's size if need
    if(keyActions.scale[event.keyCode] == "c"){
        ball.size -= (ball.size > 2 ? 2 : 0);
    } else if(keyActions.scale[event.keyCode] == "v"){
        ball.size += (ball.size < 30 ? 2 : 0);
    }
});

setInterval(function () {
    ctx.clearRect(0, 0, width, height);
    ball.draw(ball.size);
    ball.move();
    ctx.strokeRect(0, 0, width, height);
}, 1);
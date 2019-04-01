const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Ball {
  constructor(x,y,r,color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.v_y = 2;
    this.color = color;
  }

  draw(context){
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = "3";
    context.fillStyle = this.color;
    context.arc(this.x,this.y,this.r,0,Math.PI*2);
    context.closePath();
    context.stroke();
    context.fill();
  }
}

let balls = [];

function animate()
{
  if(Math.random()<0.1)
  {
    let myBall = new Ball(getRandomNumber(canvas.width),getRandomNumber(canvas.height),15,"red");
    balls.push(myBall);
    myBall.draw(context);
  }
  requestAnimationFrame(animate);
  context.clearRect(0,0,canvas.width,canvas.height);

  for(let i=0; i<balls.length; i++)
    {
      let myBall = balls[i];
      myBall.y += myBall.v_y;
      if(myBall.y > canvas.height)
      {
        balls.splice(i, 1);
      }
    myBall.draw(context);
  }
}
animate();

function getRandomNumber(max){
  return Math.floor(Math.random()*max);
}

addEventListener('mousedown',mouseHandler);

function mouseHandler(evt){
  for(let i = 0; i<balls.length;i++){
    let a = balls[i].x - evt.clientX;
    let b = balls[i].y - evt.clientY;
    let distance = Math.sqrt(a*a+b*b);
    if(distance<30){
      balls[i].color = "red";
    }

  }
}

class Player{
  constructor(src, x, y, h, w, xSpeed, ySpeed){
    this.src = src;
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
  }

  draw(){
      canvasContext.drawImage(this.src, this.x, this.y, this.w, this.h);
  }

  move(){
    if (leftKeyPressed && this.x > 0) {
      this.x -= this.xSpeed;
    }
    if (rightKeyPressed && this.x + this.w < canvas.width) {
      this.x += this.xSpeed;
    }
  }
}

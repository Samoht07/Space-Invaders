class EnemyBullet{
  constructor(x, y, h, w, c, ySpeed){
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.c = c;
    this.ySpeed = ySpeed;
  }

  draw(){
      canvasContext.fillStyle = this.c;
      canvasContext.fillRect(this.x, this.y, this.w, this.h);
  }

  move(){
    this.y += this.ySpeed;
  }

  outOfBounds2(){
    return this.y > canvas.height;
  }

  hasHitItemW2(item){
    return ((this.x + this.w) >= item.x && this.x < (item.x + item.w)) && ((this.y + this.h) >= item.y
    && this.y <= (item.y + item.h));
  }

  hasHitWall2(wall){
    return this.hasHitItemW2(wall);
  }

  hasCollidedWall2(){
    var self = this;
    var collidedW2 = false;
    walls.forEach(function(wall,i){
      if (self.hasHitWall2(wall)) {
        delete walls[i];
        collidedW2 = true;
      }
    });
    walls = walls.filter(item => item !== undefined);
    return collidedW2;
  }


  hasHitItemP(item){
    return ((this.x + this.w) >= item.x && this.x < (item.x + item.w)) && ((this.y + this.h) >= item.y
    && this.y <= (item.y + item.h));
  }

  hasHitPlayer(player){
    return this.hasHitItemP(player);
  }

  hasCollidedPlayer(){
    var self = this;
    var collidedP = false;

      if (self.hasHitPlayer(player)) {
        console.log('hit2');
        collidedP = true;
      }
    return collidedP;
  }

}
